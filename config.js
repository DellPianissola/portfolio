/**
 * CONFIG.JS — variáveis de configuração do portfólio.
 * Edite aqui ao trocar de domínio, serviço de e-mail ou chaves de API.
 *
 * ⚠️  Estas chaves são públicas por design (client-side only).
 *     Nunca coloque chaves secretas aqui.
 */
window.APP_CONFIG = {

    // ── Contato ───────────────────────────────────────────────
    EMAIL: 'dell.pianissola@outlook.com',

    // ── EmailJS ───────────────────────────────────────────────
    EMAILJS_PUBLIC_KEY:  'pXZvi8C6J8LISowM6',
    EMAILJS_SERVICE_ID:  'service_gz5rcy7',
    EMAILJS_TEMPLATE_ID: 'template_3rz9m2p',

    // ── Google reCAPTCHA v2 Invisible ─────────────────────────
    RECAPTCHA_SITE_KEY: '6LcLX8UsAAAAACWBoRg9RKpkY5n0EzG17ba7W1Tb',

    // ── Domínio ───────────────────────────────────────────────
    // Ao trocar de domínio, atualize também:
    //   index.html  → canonical, og:url, og:image, twitter:image
    //   sitemap.xml → <loc>
    //   robots.txt  → Sitemap:
    SITE_URL: 'https://portfolio.dell-pianissola.workers.dev',

};
