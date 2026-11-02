import Anthropic from '@anthropic-ai/sdk';
import SYSTEM_PROMPT from './knowledge.md';
import { CHAT_CLOSED, MAX_CHARS, MAX_HISTORY } from '../js/chat-limits.js';

const MODEL = 'claude-haiku-5-5';
const MAX_TOKENS = 1024;
const PURPOSES = ['empresa', 'projeto', 'outro'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 8;
const MAX_MESSAGES_PER_DAY = 30;
const DAY_SECONDS = 86400;

const PREPARE_MESSAGE = {
    name: 'prepare_message',
    description: 'Mostra ao visitante um resumo para ele confirmar o envio ao Gabriel.',
    strict: true,
    input_schema: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Nome do visitante' },
            contact: { type: 'string', description: 'E-mail ou telefone do visitante' },
            purpose: { type: 'string', enum: PURPOSES },
            summary: { type: 'string', description: 'Resumo em primeira pessoa do que o visitante quer dizer ao Gabriel' },
        },
        required: ['name', 'contact', 'purpose', 'summary'],
        additionalProperties: false,
    },
};

const END_CONVERSATION = {
    name: 'end_conversation',
    description: 'Encerra a conversa e bloqueia o visitante por 24 horas.',
    strict: true,
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
};

const json = (body, status = 200) => Response.json(body, { status });

const isSameOrigin = (request, url) => {
    const origin = request.headers.get('Origin');
    return URL.canParse(origin ?? '') && new URL(origin).host === url.host;
};

const isValidHistory = messages =>
    Array.isArray(messages)
    && messages.length > 0
    && messages.length <= MAX_HISTORY
    && messages.every(message =>
        ['user', 'assistant'].includes(message?.role)
        && typeof message.content === 'string'
        && message.content.length > 0
        && message.content.length <= MAX_CHARS)
    && messages.at(-1).role === 'user';

const isContact = value =>
    EMAIL.test(value) || value.replace(/\D/g, '').length >= MIN_PHONE_DIGITS;

const toDraft = call => {
    if (call?.name !== PREPARE_MESSAGE.name) return null;
    const { name, contact, purpose, summary } = call.input;
    const complete = name && summary && isContact(contact) && PURPOSES.includes(purpose);
    return complete ? { name, contact, purpose, summary } : null;
};

const textOf = content => content
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('');

const visitorId = async (request, env) => {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', encoder.encode(env.VISITOR_SALT), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const digest = await crypto.subtle.sign('HMAC', key, encoder.encode(request.headers.get('CF-Connecting-IP') ?? 'local'));
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const isBlocked = async (env, visitor) => Boolean(await env.CHAT_GUARD.get(`block:${visitor}`));

const block = (env, visitor) =>
    env.CHAT_GUARD.put(`block:${visitor}`, '1', { expirationTtl: DAY_SECONDS });

async function takeDailyMessage(env, visitor) {
    const key = `count:${visitor}`;
    const used = Number(await env.CHAT_GUARD.get(key));
    if (used >= MAX_MESSAGES_PER_DAY) return false;
    await env.CHAT_GUARD.put(key, String(used + 1), { expirationTtl: DAY_SECONDS });
    return true;
}

async function chat(request, env, visitor) {
    const { messages } = await request.json().catch(() => ({}));
    if (!isValidHistory(messages)) return json({ error: 'invalid' }, 400);
    if (!await takeDailyMessage(env, visitor)) return json({ error: CHAT_CLOSED.quota }, 429);

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        cache_control: { type: 'ephemeral' },
        output_config: { effort: 'low' },
        system: SYSTEM_PROMPT,
        tools: [PREPARE_MESSAGE, END_CONVERSATION],
        messages: messages
            .slice(messages.findIndex(({ role }) => role === 'user'))
            .map(({ role, content }) => ({ role, content })),
    });

    const call = response.content.find(({ type }) => type === 'tool_use');
    if (call?.name === END_CONVERSATION.name) {
        await block(env, visitor);
        return json({ error: CHAT_CLOSED.blocked }, 403);
    }

    const draft = toDraft(call);
    const reply = draft ? '' : textOf(response.content);
    if (!reply && !draft) return json({ error: 'empty' }, 503);
    return json({ reply, draft });
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname !== '/api/chat') return env.ASSETS.fetch(request);
        if (!['GET', 'POST'].includes(request.method)) return json({ error: 'method' }, 405);
        if (!isSameOrigin(request, url) && request.method === 'POST') return json({ error: 'origin' }, 403);

        const visitor = await visitorId(request, env);
        const blocked = await isBlocked(env, visitor);
        if (request.method === 'GET') return json({ blocked });
        if (blocked) return json({ error: CHAT_CLOSED.blocked }, 403);

        const { success } = await env.CHAT_LIMIT.limit({ key: visitor });
        if (!success) return json({ error: 'rate' }, 429);

        return chat(request, env, visitor).catch(error => {
            console.error(error);
            return json({ error: 'model' }, 503);
        });
    },
};
