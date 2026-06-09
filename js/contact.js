// ── Formulário de contato: copiar e-mail + EmailJS + reCAPTCHA ─

import { t } from './i18n.js';

export function initContact() {
    const cfg = window.APP_CONFIG || {};
    const { EMAIL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID, RECAPTCHA_SITE_KEY } = cfg;

    // ── Copiar e-mail ─────────────────────────────────────────
    const copyBtn   = document.getElementById('copy-email');
    const copyLabel = document.getElementById('copy-email-label');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(EMAIL).then(() => {
                copyLabel.textContent = t('contact.emailCopied');
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyLabel.textContent = t('contact.emailLabel');
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');
    const statusEl  = document.getElementById('form-status');
    const honeypot  = document.getElementById('contact-website');
    if (!form) return;

    let baseSendLabel = t('contact.send');

    function setFormState(state, message) {
        statusEl.textContent  = message;
        statusEl.className    = state;
        submitBtn.disabled    = state === 'loading';
        submitBtn.textContent = state === 'loading' ? t('contact.sending') : baseSendLabel;
    }

    document.addEventListener('langchange', () => {
        baseSendLabel = (typeof emailjs === 'undefined') ? t('contact.mailtoOpen') : t('contact.send');
        if (submitBtn && !submitBtn.disabled) submitBtn.textContent = baseSendLabel;
    });

    // CDN bloqueado / offline: degrada pra mailto pré-preenchido
    if (typeof emailjs === 'undefined') {
        baseSendLabel = t('contact.mailtoOpen');
        submitBtn.textContent = baseSendLabel;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.elements['name'].value.trim();
            const from = form.elements['email'].value.trim();
            const msg  = form.elements['message'].value.trim();
            const subject = encodeURIComponent(`${t('contact.mailtoSubject')}${name || t('contact.mailtoNoName')}`);
            const body    = encodeURIComponent(`${msg}\n\n— ${name} <${from}>`);
            window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        });
        return;
    }

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    // reCAPTCHA v2 Invisible
    let recaptchaWidgetId = null;

    function renderRecaptcha() {
        const container = document.getElementById('recaptcha-container');
        if (!container || recaptchaWidgetId !== null || typeof grecaptcha === 'undefined') return;
        recaptchaWidgetId = grecaptcha.render(container, {
            sitekey: RECAPTCHA_SITE_KEY,
            size: 'invisible',
            callback: function() {
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                    .then(() => {
                        setFormState('success', t('contact.success'));
                        form.reset();
                    })
                    .catch(() => {
                        setFormState('error', t('contact.error'));
                    })
                    .finally(() => {
                        grecaptcha.reset(recaptchaWidgetId);
                    });
            },
            'error-callback': function() {
                setFormState('error', t('contact.recaptchaFail'));
                grecaptcha.reset(recaptchaWidgetId);
            },
            'expired-callback': function() {
                grecaptcha.reset(recaptchaWidgetId);
            },
        });
    }

    // O script do reCAPTCHA carrega com ?onload=onRecaptchaLoad.
    // Se já carregou antes deste módulo rodar, renderiza direto.
    // Caso contrário, expõe o callback global que o script invocará.
    window.onRecaptchaLoad = renderRecaptcha;
    if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
        renderRecaptcha();
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (honeypot && honeypot.value) {
            setFormState('success', t('contact.success'));
            form.reset();
            return;
        }

        if (recaptchaWidgetId === null || typeof grecaptcha === 'undefined') {
            setFormState('error', t('contact.recaptchaNotLoaded'));
            return;
        }

        setFormState('loading', '');
        grecaptcha.execute(recaptchaWidgetId);
    });
}
