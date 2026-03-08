document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for nav links
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

    // Hamburger menu toggle (mobile)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    // Dark mode toggle with localStorage persistence
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

    // Typing effect
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

    // Contact form handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        alert(`Obrigado, ${name}! Sua mensagem foi recebida. Entrarei em contato pelo e-mail ${email} em breve.`);
        form.reset();
    });
});
