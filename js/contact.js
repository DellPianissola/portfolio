import { t } from './i18n.js';

const REPLY_DELAY = 1100;
const FIELDS = ['name', 'email', 'message'];
const REPLIES = ['contact.chatAskEmail', 'contact.chatAskMessage'];

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
    const stepEl   = document.getElementById('chat-step');
    const quick    = document.getElementById('chat-quick');
    const done     = document.getElementById('chat-done');
    const restart  = document.getElementById('chat-restart');
    const honeypot = document.getElementById('contact-website');
    if (!form) return;

    const canSend = typeof emailjs !== 'undefined';
    let log = [];
    let step = 0;
    let typing = false;
    let typingEl = null;

    const bubbleText = entry => entry.text ?? t(entry.key).replace('{name}', entry.name ?? '');

    function bubble(entry, animate) {
        const row = document.createElement('div');
        row.className = entry.key ? 'chat-row' : 'chat-row is-me';
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

    function syncControls() {
        const finished = step >= FIELDS.length;
        const placeholder = finished ? '' : t(`contact.chatPh${step}`);

        stepEl.textContent = t('contact.chatStep').replace('{n}', Math.min(step, FIELDS.length));
        form.hidden = finished;
        done.hidden = !finished || typing;
        quick.hidden = step !== 2 || typing;

        input.type = step === 1 ? 'email' : 'text';
        input.autocomplete = ['name', 'email', 'off'][step] ?? 'off';
        input.placeholder = placeholder;
        input.setAttribute('aria-label', placeholder);
    }

    function reply(key, extra = {}) {
        setTyping(false);
        add({ key, ...extra });
    }

    function finishWith(key) {
        reply(key);
        syncControls();
    }

    function failWith(key) {
        step = FIELDS.length - 1;
        input.value = form.elements['message'].value;
        finishWith(key);
    }

    function start() {
        log = [];
        logEl.replaceChildren();
        step = 0;
        input.value = '';
        add({ key: 'contact.chatHello' });
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
        const value = input.value.trim();
        if (!value || typing) return;

        const current = step;
        const name = (current === 0 ? value : form.elements['name'].value).split(' ')[0];
        form.elements[FIELDS[current]].value = value;
        add({ text: value });
        input.value = '';
        step += 1;
        setTyping(true);

        if (step === FIELDS.length) return deliver();

        setTimeout(() => {
            reply(REPLIES[current], { name });
            syncControls();
        }, REPLY_DELAY);
    });

    quick.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            input.value = button.textContent;
            input.focus();
        });
    });

    restart.addEventListener('click', start);

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
