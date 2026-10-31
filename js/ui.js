// ── UI: navbar, hamburger, smooth scroll, seção ativa, entradas ─

export function initUI() {
    const navMenu  = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a, .foot a[href^="#"]');
    const toggle   = document.getElementById('menu-toggle');

    // Smooth scroll + fecha menu mobile ao clicar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.remove('open');
            const target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Hamburger menu (mobile)
    toggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    // Highlight da seção ativa na navbar
    const sections   = document.querySelectorAll('header[id], section[id]');
    const navAnchors = document.querySelectorAll('nav a[href^="#"]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.classList.toggle('nav-active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));

    const reveals = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));
}
