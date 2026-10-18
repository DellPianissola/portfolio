// ── Modo do céu (Auto / Dia / Noite) + localStorage ───────────

import { setSkyMode } from './celestial.js';

const STORAGE_KEY = 'theme-mode';
const MODES = ['auto', 'dia', 'noite'];

function savedMode() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (MODES.includes(stored)) return stored;
    return localStorage.getItem('dark-mode') === 'enabled' ? 'noite' : 'auto';
}

function markActive(mode) {
    document.querySelectorAll('#theme-switch .theme-opt').forEach(btn => {
        const active = btn.dataset.mode === mode;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

export function initTheme() {
    const mode = savedMode();

    document.body.classList.add('no-transition');
    setSkyMode(mode, { instant: true });
    markActive(mode);
    requestAnimationFrame(() => document.body.classList.remove('no-transition'));

    document.querySelectorAll('#theme-switch .theme-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const next = btn.dataset.mode;
            localStorage.setItem(STORAGE_KEY, next);
            localStorage.removeItem('dark-mode');
            markActive(next);
            setSkyMode(next);
        });
    });
}
