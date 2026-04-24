// ── UI: navbar, hamburger, smooth scroll, seção ativa ────────

export function initUI() {
    const navMenu  = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a');

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
    document.getElementById('menu-toggle').addEventListener('click', function() {
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
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
}
