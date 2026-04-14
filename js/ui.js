// ── UI: navegação, hambúrguer, dark mode ──────────────────────

import { animateCelestial, celestialBusy } from './celestial.js';

export function initUI() {
    const navMenu    = document.getElementById('nav-menu');
    const menuToggle = document.getElementById('menu-toggle');

    // ── Smooth scrolling ──────────────────────────────────────
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.remove('open');
            const target = document.getElementById(this.getAttribute('href').substring(1));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Hambúrguer (mobile) ───────────────────────────────────
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    // ── Dark mode + localStorage ──────────────────────────────
    const toggleButton = document.getElementById('dark-mode-toggle');

    // Aplica modo escuro salvo sem disparar as transições CSS
    document.body.classList.add('no-transition');
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    requestAnimationFrame(() => document.body.classList.remove('no-transition'));

    toggleButton.addEventListener('click', function() {
        if (celestialBusy) return;
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
        animateCelestial(isDark);
    });

    // ── Formulário de contato ─────────────────────────────────
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name  = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        alert(`Obrigado, ${name}! Sua mensagem foi recebida. Entrarei em contato pelo e-mail ${email} em breve.`);
        form.reset();
    });
}
