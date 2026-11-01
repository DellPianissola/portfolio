// ── UI: navbar, hamburger, trilho horizontal, seção ativa, entradas ─

export function initUI() {
    const navMenu = document.getElementById('nav-menu');
    const toggle  = document.getElementById('menu-toggle');
    const bar     = document.querySelector('.bar');
    const pan     = document.querySelector('.pan');
    const view    = document.querySelector('.pan-view');
    const track   = document.querySelector('.pan-track');
    const hint    = document.querySelector('.pan-hint');
    const navAnchors = document.querySelectorAll('#nav-menu a');
    const sectionIds = ['sobre', 'como-trabalho', 'projetos', 'experiencia', 'contato'];

    let panned = false;
    let tween = 0;

    const closeMenu = () => {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    const clamp = n => Math.min(1, Math.max(0, n));
    const panProgress = () => clamp((bar.offsetHeight - pan.getBoundingClientRect().top) / Math.max(1, pan.offsetHeight - (innerHeight - bar.offsetHeight)));

    function targetY(id) {
        if (id === 'home') return 0;
        if (id === 'sobre' && panned) return pan.getBoundingClientRect().bottom + scrollY - innerHeight;
        return document.getElementById(id).getBoundingClientRect().top + scrollY - bar.offsetHeight;
    }

    function scrollToY(to) {
        cancelAnimationFrame(tween);
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return scrollTo(0, to);

        const from = scrollY;
        const distance = to - from;
        const duration = Math.min(1500, Math.max(700, Math.abs(distance) * 0.35));
        const start = performance.now();
        const ease = t => t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;

        const step = now => {
            const t = Math.min(1, (now - start) / duration);
            scrollTo(0, from + distance * ease(t));
            if (t < 1) tween = requestAnimationFrame(step);
        };
        tween = requestAnimationFrame(step);
    }

    function update() {
        const progress = panned ? panProgress() : 0;
        track.style.transform = panned ? `translateX(${-progress * 50}%)` : '';

        let active = progress > 0.5 ? 'sobre' : 'home';
        let closest = -Infinity;
        for (const id of panned ? sectionIds.slice(1) : sectionIds) {
            const top = document.getElementById(id).getBoundingClientRect().top;
            if (top <= innerHeight * 0.45 && top > closest) {
                closest = top;
                active = id;
            }
        }
        navAnchors.forEach(a => a.classList.toggle('nav-active', a.getAttribute('href') === `#${active}`));

        const rect = pan.getBoundingClientRect();
        hint.classList.toggle('is-on', panned && progress < 0.9 && rect.top < innerHeight * 0.5 && rect.bottom > innerHeight * 0.8);
    }

    let queued = false;
    const queueUpdate = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            update();
        });
    };

    const measure = () => {
        panned = getComputedStyle(view).position === 'sticky';
        queueUpdate();
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            const id = this.getAttribute('href').substring(1);
            if (id === 'conteudo') return document.getElementById(id).focus();
            scrollToY(targetY(id));
        });
    });

    toggle.addEventListener('click', function() {
        toggle.setAttribute('aria-expanded', String(navMenu.classList.toggle('open')));
    });

    addEventListener('keydown', e => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMenu();
            toggle.focus();
        }
    });

    document.querySelectorAll('[data-spot]').forEach(area => {
        const spot = area.querySelector('.grid-spot');
        area.addEventListener('mousemove', e => {
            const rect = area.getBoundingClientRect();
            spot.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            spot.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    addEventListener('scroll', queueUpdate, { passive: true });
    addEventListener('resize', measure);
    addEventListener('wheel', () => cancelAnimationFrame(tween), { passive: true });
    addEventListener('touchstart', () => cancelAnimationFrame(tween), { passive: true });
    addEventListener('keydown', () => cancelAnimationFrame(tween));

    measure();
    if (location.hash === '#sobre' && panned) scrollTo(0, targetY('sobre'));

    const reveals = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));
}
