import { t } from './i18n.js';

const MAX_HISTORY = 10;
const MAX_CHARS = 1000;
const CLOSED_ERRORS = ['blocked', 'quota'];

export function initContact() {
    const cfg = window.APP_CONFIG || {};
    const { EMAIL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID, RECAPTCHA_SITE_KEY } = cfg;

    const copyBtn   = document.getElementById('copy-email');
    const copyStatus = document.getElementById('copy-email-status');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(EMAIL).then(() => {
                copyStatus.textContent = t('contact.emailCopied');
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyStatus.textContent = '';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                location.href = `mailto:${EMAIL}`;
            });
        });
    }

    const form     = document.getElementById('contact-form');
    const logEl    = document.getElementById('chat-log');
    const input    = document.getElementById('chat-input');
    const quick    = document.getElementById('chat-quick');
    const confirm  = document.getElementById('chat-confirm');
    const preview  = document.getElementById('chat-preview');
    const done     = document.getElementById('chat-done');
    const restart  = document.getElementById('chat-restart');
    const honeypot = document.getElementById('contact-website');
    if (!form) return;

    const canSend = typeof emailjs !== 'undefined';
    let log = [];
    let draft = null;
    let finished = false;
    let closed = false;
    let typing = false;
    let typingEl = null;

    const bubbleText = entry => entry.text ?? t(entry.key);
    const isVisitor = entry => entry.role === 'user';

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
        logEl.scrollTop = logEl.scrollHeight;
    }

    function showTyping() {
        typingEl = document.createElement('div');
        typingEl.className = 'chat-typing';
        typingEl.setAttribute('aria-hidden', 'true');
        typingEl.innerHTML = '<i></i><i></i><i></i>';
        logEl.append(typingEl);
        logEl.scrollTop = logEl.scrollHeight;
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

    function finishWith(key) {
        setTyping(false);
        add({ key });
        finished = true;
        draft = null;
        syncControls();
    }

    function failWith(key) {
        setTyping(false);
        add({ key });
        syncControls();
    }

    function closeChat() {
        add({ key: 'contact.chatClosed' });
        closed = true;
        draft = null;
        syncControls();
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
        if (!response.ok && !CLOSED_ERRORS.includes(body.error)) throw new Error(String(response.status));
        return body;
    }

    async function say(text) {
        add({ role: 'user', text });
        setTyping(true);
        try {
            const { reply, draft: nextDraft, error } = await ask();
            setTyping(false);
            if (error) return closeChat();
            if (reply) add({ role: 'assistant', text: reply });
            draft = nextDraft;
            if (draft && !reply) add({ key: 'contact.chatConfirm' });
        } catch {
            setTyping(false);
            add({ key: 'contact.chatOffline' });
        }
        syncControls();
    }

    function sendMailto() {
        const name = form.elements['name'].value;
        const from = form.elements['email'].value;
        const msg  = form.elements['message'].value;
        const subject = encodeURIComponent(`${t('contact.mailtoSubject')}${name || t('contact.mailtoNoName')}`);
        const body    = encodeURIComponent(`${msg}\n\n${name} <${from}>`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }

    let recaptchaWidgetId = null;

    function renderRecaptcha() {
        const container = document.getElementById('recaptcha-container');
        if (!container || recaptchaWidgetId !== null || typeof grecaptcha === 'undefined') return;
        recaptchaWidgetId = grecaptcha.render(container, {
            sitekey: RECAPTCHA_SITE_KEY,
            size: 'invisible',
            callback: function() {
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                    .then(() => finishWith('contact.success'))
                    .catch(() => failWith('contact.error'))
                    .finally(() => {
                        grecaptcha.reset(recaptchaWidgetId);
                    });
            },
            'error-callback': function() {
                failWith('contact.recaptchaFail');
                grecaptcha.reset(recaptchaWidgetId);
            },
            'expired-callback': function() {
                grecaptcha.reset(recaptchaWidgetId);
            },
        });
    }

    function deliver() {
        if (honeypot && honeypot.value) return finishWith('contact.success');

        if (!canSend) {
            sendMailto();
            return finishWith('contact.chatMailto');
        }

        if (recaptchaWidgetId === null || typeof grecaptcha === 'undefined') {
            return failWith('contact.recaptchaNotLoaded');
        }

        grecaptcha.execute(recaptchaWidgetId);
    }

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

    document.getElementById('chat-send-draft').addEventListener('click', () => {
        form.elements['name'].value = draft.name;
        form.elements['email'].value = draft.contact.includes('@') ? draft.contact : '';
        form.elements['message'].value = `[${purposeLabel()}] ${draft.summary}\n\n${t('contact.chatContact')}: ${draft.contact}`;
        setTyping(true);
        deliver();
    });

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

    if (!canSend) return;

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    // O script do reCAPTCHA carrega com ?onload=onRecaptchaLoad.
    // Se já carregou antes deste módulo rodar, renderiza direto.
    // Caso contrário, expõe o callback global que o script invocará.
    window.onRecaptchaLoad = renderRecaptcha;
    if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
        renderRecaptcha();
    }
}
