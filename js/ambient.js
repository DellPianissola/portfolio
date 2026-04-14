// ── Elementos de ambiente: estrelas, bolhas, partículas ───────

export function initStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 90; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2.5 + 0.8;
        star.style.width             = `${size}px`;
        star.style.height            = `${size}px`;
        star.style.left              = `${Math.random() * 100}%`;
        star.style.top               = `${Math.random() * 62}%`;
        star.style.animationDuration = `${Math.random() * 2.5 + 1.5}s`;
        star.style.animationDelay    = `${Math.random() * 4}s`;
        container.appendChild(star);
    }
}

export function initBubbles() {
    function createBubbles(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            const size = Math.random() * 12 + 4;
            bubble.style.width             = `${size}px`;
            bubble.style.height            = `${size}px`;
            bubble.style.left              = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 10 + 6}s`;
            bubble.style.animationDelay    = `${Math.random() * 8}s`;
            container.appendChild(bubble);
        }
    }

    createBubbles('bubbles-sobre',   18);
    createBubbles('bubbles-jornada', 12);
    createBubbles('bubbles-tech',     4);
    createBubbles('bubbles-projetos', 3);
}

export function initParticles() {
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
}
