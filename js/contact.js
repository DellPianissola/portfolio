import { t } from './i18n.js';
import { initChat } from './chat.js';

function initEmail(email) {
    const link       = document.getElementById('email-link');
    const copyBtn    = document.getElementById('copy-email');
    const copyStatus = document.getElementById('copy-email-status');
    if (!link || !copyBtn) return;

    link.href = `mailto:${email}`;
    link.textContent = email;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            copyStatus.textContent = t('contact.emailCopied');
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyStatus.textContent = '';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            location.href = `mailto:${email}`;
        });
    });
}

export function initContact() {
    const config = window.APP_CONFIG || {};
    initEmail(config.EMAIL);
    initChat(config);
}
