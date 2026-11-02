import { t } from './i18n.js';

export function createDelivery(config, form, { sending, finish, fail }) {
    const { EMAIL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID, RECAPTCHA_SITE_KEY } = config;

    const honeypot = document.getElementById('contact-website');
    const canSend = typeof emailjs !== 'undefined';
    let recaptchaWidgetId = null;

    const resetRecaptcha = () => grecaptcha.reset(recaptchaWidgetId);

    function sendMailto({ name, email, message }) {
        const subject = encodeURIComponent(`${t('contact.mailtoSubject')}${name || t('contact.mailtoNoName')}`);
        const body    = encodeURIComponent(`${message}\n\n${name} <${email}>`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }

    function sendEmail() {
        sending();
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(() => finish('contact.success'))
            .catch(() => fail('contact.error'))
            .finally(resetRecaptcha);
    }

    function renderRecaptcha() {
        const container = document.getElementById('recaptcha-container');
        if (!container || recaptchaWidgetId !== null || typeof grecaptcha === 'undefined') return;
        recaptchaWidgetId = grecaptcha.render(container, {
            sitekey: RECAPTCHA_SITE_KEY,
            size: 'invisible',
            callback: sendEmail,
            'error-callback': function() {
                fail('contact.recaptchaFail');
                resetRecaptcha();
            },
            'expired-callback': resetRecaptcha,
        });
    }

    function deliver(fields) {
        if (honeypot.value) return finish('contact.success');

        if (!canSend) {
            sendMailto(fields);
            return finish('contact.chatMailto');
        }

        if (recaptchaWidgetId === null) return fail('contact.recaptchaNotLoaded');

        Object.entries(fields).forEach(([name, value]) => {
            form.elements[name].value = value;
        });
        grecaptcha.execute(recaptchaWidgetId);
    }

    if (canSend) {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        // O script do reCAPTCHA carrega com ?onload=onRecaptchaLoad.
        // Se já carregou antes deste módulo rodar, renderiza direto.
        // Caso contrário, expõe o callback global que o script invocará.
        window.onRecaptchaLoad = renderRecaptcha;
        if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
            renderRecaptcha();
        }
    }

    return deliver;
}
