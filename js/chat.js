import { t } from './i18n.js';
import { createDelivery } from './delivery.js';
import { CHAT_CLOSED, MAX_CHARS, MAX_HISTORY } from './chat-limits.js';

export function initChat(config) {
    const form     = document.getElementById('contact-form');
    const logEl    = document.getElementById('chat-log');
    const input    = document.getElementById('chat-input');
    const quick    = document.getElementById('chat-quick');
    const confirm  = document.getElementById('chat-confirm');
    const preview  = document.getElementById('chat-preview');
    const done     = document.getElementById('chat-done');
    const restart  = document.getElementById('chat-restart');
    if (!form) return;

    let log = [];
    let draft = null;
    let finished = false;
    let closed = false;
    let typing = false;
    let typingEl = null;

    const bubbleText = entry => entry.text ?? t(entry.key);
    const isVisitor = entry => entry.role === 'user';
    const scrollToEnd = () => { logEl.scrollTop = logEl.scrollHeight; };

    function bubble(entry, animate) {
        const row = document.createElement('div');
        row.className = isVisitor(entry) ? 'chat-row is-me' : 'chat-row';
        const text = document.createElement('p');
        text.textContent = bubbleText(entry);
        text.classList.toggle('is-new', animate);
        row.append(text);
        return row;
    }

    function renderLog() {
        logEl.replaceChildren(...log.map(entry => bubble(entry, false)));
        if (typing) showTyping();
    }

    function add(entry) {
        log.push(entry);
        logEl.append(bubble(entry, true));
        scrollToEnd();
    }

    function showTyping() {
        typingEl = document.createElement('div');
        typingEl.className = 'chat-typing';
        typingEl.setAttribute('aria-hidden', 'true');
        typingEl.innerHTML = '<i></i><i></i><i></i>';
        logEl.append(typingEl);
        scrollToEnd();
    }

    function setTyping(on) {
        typing = on;
        typingEl?.remove();
        typingEl = null;
        if (on) showTyping();
        syncControls();
    }

    const purposeLabel = () => t(`contact.purpose.${draft.purpose}`);

    function syncControls() {
        const placeholder = t('contact.chatPlaceholder');

        form.hidden = finished || closed || Boolean(draft);
        confirm.hidden = !draft || typing;
        done.hidden = !finished || typing;
        quick.hidden = closed || log.some(isVisitor);

        if (draft) preview.textContent = `${purposeLabel()}: ${draft.summary} (${draft.name}, ${draft.contact})`;

        input.placeholder = placeholder;
        input.setAttribute('aria-label', placeholder);
    }

    function notify(key) {
        setTyping(false);
        add({ key });
        syncControls();
    }

    function finishWith(key) {
        finished = true;
        draft = null;
        notify(key);
    }

    function closeChat() {
        closed = true;
        draft = null;
        notify('contact.chatClosed');
    }

    function start() {
        log = [];
        logEl.replaceChildren();
        draft = null;
        finished = false;
        input.value = '';
        add({ key: 'contact.chatHello' });
        syncControls();
    }

    const history = () => log
        .filter(entry => entry.text)
        .slice(-MAX_HISTORY)
        .map(({ role, text }) => ({ role, content: text }));

    async function ask() {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: history() }),
        });
        const body = await response.json();
        if (!response.ok && !Object.values(CHAT_CLOSED).includes(body.error)) throw new Error(String(response.status));
        return body;
    }

    async function say(text) {
        add({ role: 'user', text });
        setTyping(true);
        const result = await ask().catch(() => null);
        if (!result) return notify('contact.chatOffline');
        if (result.error) return closeChat();

        setTyping(false);
        const { reply, draft: nextDraft } = result;
        if (reply) add({ role: 'assistant', text: reply });
        draft = nextDraft;
        if (draft && !reply) add({ key: 'contact.chatConfirm' });
        syncControls();
    }

    const deliver = createDelivery(config, form, {
        sending: () => setTyping(true),
        finish: finishWith,
        fail: notify,
    });

    const draftFields = ({ name, contact, summary }) => ({
        name,
        email: contact.includes('@') ? contact : '',
        message: `[${purposeLabel()}] ${summary}\n\n${t('contact.chatContact')}: ${contact}`,
    });

    input.maxLength = MAX_CHARS;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = input.value.trim().slice(0, MAX_CHARS);
        if (!value || typing) return;
        input.value = '';
        say(value);
    });

    quick.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (!typing) say(button.textContent);
        });
    });

    document.getElementById('chat-send-draft').addEventListener('click', () => deliver(draftFields(draft)));

    document.getElementById('chat-edit-draft').addEventListener('click', () => {
        draft = null;
        syncControls();
        input.focus();
    });

    restart.addEventListener('click', start);

    fetch('/api/chat')
        .then(response => response.json())
        .then(({ blocked }) => { if (blocked) closeChat(); })
        .catch(() => {});

    document.addEventListener('langchange', () => {
        renderLog();
        syncControls();
    });

    start();
}
