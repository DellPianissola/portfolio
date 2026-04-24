// ── Formulário de contato: copiar e-mail + EmailJS + reCAPTCHA ─

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
                copyLabel.textContent = 'Copiado!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyLabel.textContent = 'Email';
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

    function setFormState(state, message) {
        statusEl.textContent  = message;
        statusEl.className    = state;
        submitBtn.disabled    = state === 'loading';
        submitBtn.textContent = state === 'loading' ? 'Enviando...' : 'Enviar';
    }

    // CDN bloqueado / offline: degrada pra mailto pré-preenchido
    if (typeof emailjs === 'undefined') {
        submitBtn.textContent = 'Abrir no e-mail';
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.elements['name'].value.trim();
            const from = form.elements['email'].value.trim();
            const msg  = form.elements['message'].value.trim();
            const subject = encodeURIComponent(`Contato do portfólio — ${name || 'sem nome'}`);
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
                        setFormState('success', 'Mensagem enviada! Entrarei em contato em breve.');
                        form.reset();
                    })
                    .catch(() => {
                        setFormState('error', 'Erro ao enviar. Tente novamente ou use o e-mail direto.');
                    })
                    .finally(() => {
                        grecaptcha.reset(recaptchaWidgetId);
                    });
            },
            'error-callback': function() {
                setFormState('error', 'Falha na verificação anti-spam. Tente novamente.');
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
            setFormState('success', 'Mensagem enviada! Entrarei em contato em breve.');
            form.reset();
            return;
        }

        if (recaptchaWidgetId === null || typeof grecaptcha === 'undefined') {
            setFormState('error', 'Verificação anti-spam não carregou. Recarregue a página.');
            return;
        }

        setFormState('loading', '');
        grecaptcha.execute(recaptchaWidgetId);
    });
}
