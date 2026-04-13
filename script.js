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

    // Aplica modo escuro salvo sem disparar as transições CSS
    document.body.classList.add('no-transition');
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    requestAnimationFrame(() => document.body.classList.remove('no-transition'));

    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
        if (window.animateCelestial) window.animateCelestial(isDark);
    });

    // ── Sistema orbital Sol / Lua + Cores do Céu ─────────────
    (function() {
        const sunEl    = document.querySelector('.sun');
        const moonEl   = document.querySelector('.moon');
        const headerEl = document.querySelector('header');
        const overlay  = document.getElementById('sky-overlay');

        const REST   = 58 * Math.PI / 180;
        const SIZE   = 72;
        const PHASE1 = 2200;
        const PHASE2 = 900;

        // ── Gradientes do céu (4 stops: 0%, 35%, 65%, 100%) ──
        const SKY = {
            day:     ['#c9e8f5','#87CEEB','#4ab8d8','#00BFFF'],
            sunset1: ['#a8c0d8','#7090b8','#d88040','#e86020'],
            sunset2: ['#4a5888','#6c3828','#c84010','#d02800'],
            dusk:    ['#181c30','#301008','#780808','#940000'],
            night:   ['#020810','#041428','#062038','#062038'],
            predawn: ['#050d20','#0c1830','#a83818','#c05020'],
            dawn:    ['#183468','#4070a8','#c07028','#e09040'],
        };
        const POS = [0, 35, 65, 100];

        function hx(h) {
            return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
        }
        const parsedSky = {};
        Object.keys(SKY).forEach(k => parsedSky[k] = SKY[k].map(hx));

        function applySky(k1, k2, t) {
            const s1 = parsedSky[k1], s2 = parsedSky[k2];
            const stops = s1.map((c, i) => {
                const r = Math.round(c[0] + (s2[i][0]-c[0])*t);
                const g = Math.round(c[1] + (s2[i][1]-c[1])*t);
                const b = Math.round(c[2] + (s2[i][2]-c[2])*t);
                return `rgb(${r},${g},${b}) ${POS[i]}%`;
            });
            headerEl.style.background = `linear-gradient(to bottom,${stops.join(',')})`;
        }

        function sunsetSkyAt(t) {
            applyWaveColors(t);
            if      (t < 0.28) applySky('day',     'sunset1', t/0.28);
            else if (t < 0.58) applySky('sunset1', 'sunset2', (t-0.28)/0.30);
            else if (t < 0.80) applySky('sunset2', 'dusk',    (t-0.58)/0.22);
            else               applySky('dusk',    'night',   (t-0.80)/0.20);
        }

        function sunriseSkyAt(t) {
            applyWaveColors(1 - t);
            if      (t < 0.42) applySky('predawn', 'dawn', t/0.42);
            else               applySky('dawn',    'day',  (t-0.42)/0.58);
        }

        // ── Cor do Sol ────────────────────────────────────────
        const SUN_G = {
            day:    ['#fffde7','#FFE033','#FFB700'],
            sunset: ['#ffe0b2','#FF8C00','#FF5000'],
            dusk:   ['#ffccaa','#FF5520','#CC1800'],
        };
        const parsedSun = {};
        Object.keys(SUN_G).forEach(k => parsedSun[k] = SUN_G[k].map(hx));

        // ── Cores das ondas + mar ─────────────────────────────
        const mainEl = document.querySelector('main');
        const waveEls = [
            document.querySelector('.wave-0'),
            document.querySelector('.wave-1'),
            document.querySelector('.wave-2'),
            document.querySelector('.wave-3'),
        ];
        const WAVE_DAY   = ['#003f6b','#0074A8','#009ACD','#00BFFF'].map(hx);
        const WAVE_NIGHT = ['#010c18','#011a2c','#022440','#03305a'].map(hx);

        // Gradiente do main: 5 stops em [0%, 20%, 50%, 80%, 100%]
        const MAIN_DAY   = ['#00BFFF','#0074A8','#004f7a','#010d1a','#000508'].map(hx);
        const MAIN_NIGHT = ['#03305a','#021830','#010d20','#010810','#000305'].map(hx);
        const MAIN_POS   = [0, 20, 50, 80, 100];

        function lerpColor(a, b, t) {
            return [
                Math.round(a[0] + (b[0]-a[0])*t),
                Math.round(a[1] + (b[1]-a[1])*t),
                Math.round(a[2] + (b[2]-a[2])*t),
            ];
        }

        function applyWaveColors(t) { // t=0 → dia, t=1 → noite
            waveEls.forEach((el, i) => {
                const [r,g,b] = lerpColor(WAVE_DAY[i], WAVE_NIGHT[i], t);
                el.style.fill = `rgb(${r},${g},${b})`;
            });
            const stops = MAIN_DAY.map((c, i) => {
                const [r,g,b] = lerpColor(c, MAIN_NIGHT[i], t);
                return `rgb(${r},${g},${b}) ${MAIN_POS[i]}%`;
            });
            mainEl.style.background = `linear-gradient(to bottom,${stops.join(',')})`;
        }

        function resetWaveColors() {
            waveEls.forEach(el => el.style.fill = '');
            mainEl.style.background = '';
        }

        function toHex([r,g,b]) {
            return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
        }

        function applySunColor(k1, k2, t) {
            const s1 = parsedSun[k1], s2 = parsedSun[k2];
            const c  = s1.map((v,i) => v.map((n,j) => Math.round(n+(s2[i][j]-n)*t)));
            sunEl.style.background = `radial-gradient(circle at 38% 38%,${toHex(c[0])},${toHex(c[1])} 45%,${toHex(c[2])} 100%)`;
            const glow = c[1].join(',');
            sunEl.style.boxShadow  = `0 0 24px 8px rgba(${glow},.65),0 0 72px 26px rgba(${glow},.32),0 0 130px 55px rgba(${glow},.15)`;
        }

        function sunColorAt(t) {
            if (t < 0.52) applySunColor('day',    'sunset', t/0.52);
            else          applySunColor('sunset',  'dusk',  (t-0.52)/0.48);
        }

        function resetSunStyle() {
            sunEl.style.background = '';
            sunEl.style.boxShadow  = '';
        }

        // ── Órbita ────────────────────────────────────────────
        function orb() {
            const W = headerEl.offsetWidth, H = headerEl.offsetHeight;
            return { cx: W/2, cy: H*1.05, R: H*1.07 };
        }

        function place(el, angle, o, show) {
            el.style.left    = `${o.cx + o.R*Math.cos(angle) - SIZE/2}px`;
            el.style.top     = `${o.cy - o.R*Math.sin(angle) - SIZE/2}px`;
            el.style.opacity = show ? '1' : '0';
        }

        function eio(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

        function sweep(el, from, to, dur, skyFn, colorFn, done) {
            const t0 = performance.now();
            (function frame(now) {
                const raw   = Math.min((now-t0)/dur, 1);
                const angle = from + (to-from)*eio(raw);
                place(el, angle, orb(), true);
                if (skyFn)   skyFn(raw);
                if (colorFn) colorFn(raw);
                if (raw < 1) requestAnimationFrame(frame);
                else if (done) done();
            })(t0);
        }

        function handoffOverlay(toNight) {
            overlay.style.transition = 'none';
            overlay.style.opacity    = toNight ? '1' : '0';
            requestAnimationFrame(() => {
                overlay.style.transition = '';
                overlay.style.opacity    = '';
            });
        }

        function init() {
            const o = orb(), dark = document.body.classList.contains('dark-mode');
            if (!dark) {
                place(sunEl,  REST,          o, true);
                place(moonEl, REST-Math.PI,  o, false);
                headerEl.style.background = '';
                resetSunStyle();
            } else {
                place(moonEl, REST,          o, true);
                place(sunEl,  REST-Math.PI,  o, false);
                applySky('night','night', 0);
            }
        }

        window.animateCelestial = function(toNight) {
            const o = orb();

            if (toNight) {
                // Dia → Noite: para as nuvens e esconde overlay pra JS controlar o céu
                if (window.stopClouds) window.stopClouds();
                applyWaveColors(0); // trava cores de dia antes da transição CSS disparar
                overlay.style.transition = 'none';
                overlay.style.opacity    = '0';

                sweep(sunEl, REST, Math.PI, PHASE1, sunsetSkyAt, sunColorAt, function() {
                    place(sunEl, REST-Math.PI, o, false);
                    resetSunStyle();
                    place(moonEl, 0.01, o, true);
                    sweep(moonEl, 0.01, REST, PHASE2, null, null, function() {
                        headerEl.style.background = '';
                        resetWaveColors(); // entrega ao CSS (.dark-mode .wave-X)
                        handoffOverlay(true);
                    });
                });
            } else {
                // Noite → Dia: primeiro aplica céu noturno no header,
                // só então esconde o overlay — sem flash do gradiente de dia
                applySky('night', 'night', 0);
                applyWaveColors(1); // trava cores de noite antes da transição CSS disparar
                overlay.style.transition = 'none';
                overlay.style.opacity    = '0';

                // FASE 1: Lua se põe — céu e ondas permanecem noite
                sweep(moonEl, REST, Math.PI, PHASE1, null, null, function() {
                    place(moonEl, REST-Math.PI, o, false);
                    place(sunEl, 0.01, o, true);

                    // FASE 2: Sol nasce — céu e ondas amanhecem
                    sweep(sunEl, 0.01, REST, PHASE2, sunriseSkyAt, null, function() {
                        headerEl.style.background = '';
                        resetSunStyle();
                        resetWaveColors(); // entrega ao CSS (sem .dark-mode)
                        handoffOverlay(false);
                        if (window.startClouds) window.startClouds();
                    });
                });
            }
        };

        init();
        window.addEventListener('resize', init);
    })();

    // ── Nuvens (céu diurno) ───────────────────────────────────
    let cloudsActive = false;
    let cloudSchedulerTimeout = null;

    function launchCloud() {
        if (!cloudsActive) return;
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
        if (!cloudsActive) return;
        launchCloud();
        cloudSchedulerTimeout = setTimeout(scheduleClouds, Math.random() * 14000 + 10000);
    }

    window.startClouds = function() {
        if (cloudsActive) return;
        cloudsActive = true;
        launchCloud();
        setTimeout(launchCloud, 6000);
        cloudSchedulerTimeout = setTimeout(scheduleClouds, 12000);
    };

    window.stopClouds = function() {
        cloudsActive = false;
        clearTimeout(cloudSchedulerTimeout);
        cloudSchedulerTimeout = null;
        const container = document.getElementById('clouds-container');
        Array.from(container.children).forEach(cloud => {
            cloud.style.transition = 'opacity 1.5s ease';
            cloud.style.opacity = '0';
            setTimeout(() => cloud.remove(), 1500);
        });
    };

    if (!document.body.classList.contains('dark-mode')) {
        window.startClouds();
    }

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
    createBubbles('bubbles-jornada',  12);
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
