document.addEventListener("DOMContentLoaded", function() {

    // ── Smooth scrolling ──────────────────────────────────────
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.remove('open');
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Hamburger menu (mobile) ───────────────────────────────
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    // ── Dark mode + localStorage ──────────────────────────────
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
    }
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggleButton.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
    });

    // ── Nuvens (céu diurno) ───────────────────────────────────
    function launchCloud() {
        const container = document.getElementById('clouds-container');
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        const width    = Math.random() * 140 + 80;   // 80–220px
        const top      = Math.random() * 32 + 5;     // 5–37% do topo
        const duration = Math.random() * 40 + 55;    // 55–95s
        const opacity  = Math.random() * 0.25 + 0.65;

        cloud.style.width    = `${width}px`;
        cloud.style.height   = `${width * 0.38}px`;
        cloud.style.top      = `${top}%`;
        cloud.style.left     = `-${width + 20}px`;
        cloud.style.opacity  = opacity;
        cloud.style.animationDuration = `${duration}s`;

        container.appendChild(cloud);
        setTimeout(() => cloud.remove(), (duration + 1) * 1000);
    }

    function scheduleClouds() {
        launchCloud();
        setTimeout(scheduleClouds, Math.random() * 14000 + 10000); // a cada 10–24s
    }

    launchCloud();
    setTimeout(launchCloud, 6000);
    setTimeout(scheduleClouds, 12000);

    // ── Estrelas (céu noturno) ────────────────────────────────
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 90; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2.5 + 0.8;
        star.style.width            = `${size}px`;
        star.style.height           = `${size}px`;
        star.style.left             = `${Math.random() * 100}%`;
        star.style.top              = `${Math.random() * 62}%`;
        star.style.animationDuration = `${Math.random() * 2.5 + 1.5}s`;
        star.style.animationDelay   = `${Math.random() * 4}s`;
        starsContainer.appendChild(star);
    }

    // ── Typing effect ─────────────────────────────────────────
    const typingText = document.querySelector('.typing');
    const text = "Especialista em criar soluções incríveis!";
    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 2000);

    // ── Gerador de bolhas ─────────────────────────────────────
    function createBubbles(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            const size = Math.random() * 28 + 8;
            bubble.style.width  = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left   = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 10 + 6}s`;
            bubble.style.animationDelay    = `${Math.random() * 8}s`;
            container.appendChild(bubble);
        }
    }

    createBubbles('bubbles-sobre',    18);
    createBubbles('bubbles-tech',      9);
    createBubbles('bubbles-projetos',  3);

    // ── Partículas bioluminescentes (Contato) ─────────────────
    function createParticles(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left             = `${Math.random() * 100}%`;
            p.style.top              = `${Math.random() * 100}%`;
            p.style.animationDelay   = `${Math.random() * 3}s`;
            p.style.animationDuration = `${Math.random() * 3 + 2}s`;
            container.appendChild(p);
        }
    }

    createParticles('particles-contato', 40);

    // ── Formulário de contato ─────────────────────────────────
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name  = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        alert(`Obrigado, ${name}! Sua mensagem foi recebida. Entrarei em contato pelo e-mail ${email} em breve.`);
        form.reset();
    });

});
