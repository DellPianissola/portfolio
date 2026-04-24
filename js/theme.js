// ── Dark mode + localStorage ──────────────────────────────────

import { animateCelestial, isCelestialBusy } from './celestial.js';

export function initTheme() {
    const toggleButton = document.getElementById('dark-mode-toggle');

    // Aplica modo escuro salvo sem disparar transições CSS
    document.body.classList.add('no-transition');
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    requestAnimationFrame(() => document.body.classList.remove('no-transition'));

    toggleButton.addEventListener('click', function() {
        if (isCelestialBusy()) return;
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
        animateCelestial(isDark);
    });
}
