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
        if (window.celestialBusy) return;
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

        const REST    = 58 * Math.PI / 180;
        const HORIZON = 22 * Math.PI / 180; // ângulo onde o astro toca o mar
        const SIZE    = 72;
        const PHASE1  = 2200;
        const PHASE2  = 900;

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
            day:    ['#FFE55C','#FFD000','#FFA800'],
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
        const WAVE_DAY   = ['#1a5580','#1a86bc','#009ACD','#00BFFF'].map(hx);
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
            sunEl.style.background = `radial-gradient(circle,${toHex(c[0])},${toHex(c[1])} 55%,${toHex(c[2])} 100%)`;
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

        window.celestialBusy = false;

        window.animateCelestial = function(toNight) {
            window.celestialBusy = true;
            const o = orb();

            if (toNight) {
                // Dia → Noite: para as nuvens e esconde overlay pra JS controlar o céu
                if (window.stopClouds) window.stopClouds();
                applyWaveColors(0); // trava cores de dia antes da transição CSS disparar
                overlay.style.transition = 'none';
                overlay.style.opacity    = '0';

                sweep(sunEl, REST, Math.PI - HORIZON, PHASE1, sunsetSkyAt, sunColorAt, function() {
                    place(sunEl, REST-Math.PI, o, false);
                    resetSunStyle();
                    place(moonEl, HORIZON, o, true);
                    sweep(moonEl, HORIZON, REST, PHASE2, null, null, function() {
                        headerEl.style.background = '';
                        resetWaveColors();
                        handoffOverlay(true);
                        window.celestialBusy = false;
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
                sweep(moonEl, REST, Math.PI - HORIZON, PHASE1, null, null, function() {
                    place(moonEl, REST-Math.PI, o, false);
                    place(sunEl, HORIZON, o, true);

                    // FASE 2: Sol nasce — céu e ondas amanhecem
                    sweep(sunEl, HORIZON, REST, PHASE2, sunriseSkyAt, null, function() {
                        headerEl.style.background = '';
                        resetSunStyle();
                        resetWaveColors();
                        handoffOverlay(false);
                        if (window.startClouds) window.startClouds();
                        window.celestialBusy = false;
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

    // Silhuetas SVG de nuvens (viewBox 200×70)
    const CLOUD_SHAPES = [
        // A – clássica com 2 cúmulos
        { vb: '0 0 200 70', d: 'M18 68 Q16 45 36 42 Q35 22 58 20 Q72 5 98 12 Q122 2 148 16 Q168 12 172 35 Q190 38 188 68 Z' },
        // B – fina e esticada (cirro)
        { vb: '0 0 200 55', d: 'M5 54 Q4 40 20 38 Q24 26 52 26 Q75 14 110 22 Q140 14 170 24 Q188 28 187 42 Q196 42 195 54 Z' },
        // C – cúmulo alto e rechonchudo
        { vb: '0 0 200 80', d: 'M8 78 Q6 50 28 46 Q25 20 52 18 Q65 2 92 10 Q116 0 142 12 Q164 4 172 26 Q190 30 188 52 Q198 52 195 78 Z' },
        // D – compacta e arredondada
        { vb: '0 0 160 65', d: 'M15 63 Q13 42 34 38 Q32 16 58 14 Q74 2 96 10 Q118 2 136 16 Q152 14 154 38 Q166 42 164 63 Z' },
        // E – estratocúmulo largo e baixo
        { vb: '0 0 220 55', d: 'M6 54 Q4 40 22 38 Q25 26 55 26 Q72 14 100 20 Q128 12 158 22 Q182 20 192 34 Q208 36 206 54 Z' },
    ];

    function launchCloud() {
        if (!cloudsActive) return;
        const container = document.getElementById('clouds-container');

        const shape  = CLOUD_SHAPES[Math.floor(Math.random() * CLOUD_SHAPES.length)];
        const width  = Math.random() * 180 + 60;     // 60–240px

        // Paralax: menor = mais longe = mais lento e mais alto
        const t        = (width - 60) / 180;         // 0 (pequena) → 1 (grande)
        const duration = 110 - t * 65 + Math.random() * 10; // 55–120s
        const top      = 2 + (1 - t) * 10 + Math.random() * 6; // pequenas mais altas
        const opacity  = 0.45 + t * 0.40 + Math.random() * 0.1; // pequenas mais transparentes

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', shape.vb);
        svg.classList.add('cloud');
        svg.style.width    = `${width}px`;
        svg.style.height   = 'auto';
        svg.style.top      = `${top}%`;
        svg.style.left     = `-${width + 20}px`;
        svg.style.opacity  = opacity;
        svg.style.animationDuration = `${duration}s`;
        if (Math.random() < 0.5) svg.style.transform = 'scaleX(-1)';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', shape.d);
        path.setAttribute('fill', 'rgba(255,255,255,0.92)');
        svg.appendChild(path);

        container.appendChild(svg);
        setTimeout(() => svg.remove(), (duration + 1) * 1000);
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
            const size = Math.random() * 12 + 4;
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
    createBubbles('bubbles-tech',      4);
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

    // ── Timings individuais de cada água-viva (dur em s, delay em s, y em px, r em deg)
    const JF_TIMINGS = [
        { dur: 4.8, delay: 0.0, y: -14, r:  2 },
        { dur: 5.5, delay: 0.7, y: -10, r: -3 },
        { dur: 4.3, delay: 1.2, y: -16, r:  1 },
        { dur: 6.0, delay: 0.4, y: -11, r: -2 },
        { dur: 5.1, delay: 1.6, y: -13, r:  3 },
        { dur: 4.6, delay: 0.9, y: -15, r: -1 },
        { dur: 5.8, delay: 0.2, y: -10, r:  2 },
        { dur: 4.1, delay: 1.9, y: -17, r: -3 },
        { dur: 5.4, delay: 0.6, y: -12, r:  1 },
        { dur: 4.9, delay: 1.4, y: -14, r: -2 },
        { dur: 5.2, delay: 0.3, y: -11, r:  3 },
        { dur: 4.4, delay: 2.1, y: -16, r: -1 },
        { dur: 6.1, delay: 0.8, y: -10, r:  2 },
        { dur: 4.7, delay: 1.7, y: -13, r: -3 },
        { dur: 5.6, delay: 0.5, y: -15, r:  1 },
    ];

    // ── Injeta SVG individual em cada água-viva (animações dessincronizadas)
    function buildJfLabel(label) {
        const words = label.split(' ');
        if (words.length === 1) {
            return `<text class="jf-text" x="100" y="88" text-anchor="middle">${label}</text>`;
        }
        const mid   = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(' ');
        const line2 = words.slice(mid).join(' ');
        const y0    = words.length === 2 ? 76 : 70;
        return (
            `<text class="jf-text" text-anchor="middle">` +
            `<tspan x="100" y="${y0}">${line1}</tspan>` +
            `<tspan x="100" dy="20">${line2}</tspan>` +
            `</text>`
        );
    }

    function buildJfSVG(begin, dur, label) {
        const b = begin.toFixed(2) + 's';
        const d = dur.toFixed(2)   + 's';
        const timing =
            `dur="${d}" begin="${b}" repeatCount="indefinite" ` +
            `keyTimes="0;0.4;1" keySplines="0.4 0 0.2 1; 0.2 0 0.2 1" calcMode="spline"`;
        const a = (vals) =>
            `<animate attributeName="d" ${timing} values="${vals}"/>`;
        const bob =
            `<animateTransform attributeName="transform" type="translate" ` +
            `${timing} values="0,10; 0,-9; 0,10" additive="sum"/>`;
        return (
            `<g>` +
            `${bob}` +
            `<g class="jf-tentacles" fill="none" stroke-width="8" stroke-linecap="round">` +
            `<path>${a('M70 120 C40 140,40 160,70 185;M70 120 C20 150,110 150,60 185;M70 120 C40 140,40 160,70 185')}</path>` +
            `<path>${a('M90 120 C60 140,60 160,90 185;M90 120 C40 150,130 150,80 185;M90 120 C60 140,60 160,90 185')}</path>` +
            `<path>${a('M110 120 C140 140,140 160,110 185;M110 120 C180 150,70 150,120 185;M110 120 C140 140,140 160,110 185')}</path>` +
            `<path>${a('M130 120 C160 140,160 160,130 185;M130 120 C200 150,90 150,140 185;M130 120 C160 140,160 160,130 185')}</path>` +
            `</g>` +
            `<ellipse class="jf-body" cx="100" cy="80" rx="60" ry="50"/>` +
            `<ellipse class="jf-skirt" cx="100" cy="120" rx="52" ry="10"/>` +
            buildJfLabel(label) +
            `</g>`
        );
    }

    document.querySelectorAll('.jf-svg').forEach((svg, i) => {
        const begin    = (i * 0.23) % 1.6;
        const dur      = 1.3 + (i % 5) * 0.12;
        const labelEl  = svg.closest('.jf-wrap').querySelector('.jf-label');
        const label    = labelEl ? labelEl.textContent.trim() : '';
        if (labelEl) labelEl.style.display = 'none';
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.innerHTML = buildJfSVG(begin, dur, label);

        const t = JF_TIMINGS[i % JF_TIMINGS.length];
        const jf = svg.closest('.jellyfish');
        jf.style.animationDuration = `${t.dur}s`;
        jf.style.animationDelay    = `${t.delay}s`;
        jf.style.setProperty('--jf-y', `${t.y}px`);
        jf.style.setProperty('--jf-r', `${t.r}deg`);
    });

    // ── Layout Phyllotaxis (espiral de girassol) das águas-vivas
    function layoutJellyfish() {
        const tank = document.querySelector('.jellyfish-tank');
        if (!tank) return;
        const orbits = tank.querySelectorAll('.jf-orbit');
        const n      = orbits.length;
        const maxR   = Math.min(tank.offsetWidth * 0.44, 380);
        tank.style.height = (maxR * 2 + 260) + 'px';

        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ≈ 137.5°
        orbits.forEach((el, i) => {
            const angle = i * goldenAngle;
            const dist  = Math.sqrt((i + 0.5) / n) * maxR;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }
    layoutJellyfish();
    window.addEventListener('resize', layoutJellyfish);

    // ── Formulário de contato ─────────────────────────────────
    const form       = document.getElementById('contact-form');
    const submitBtn  = document.getElementById('form-submit');
    const statusEl   = document.getElementById('form-status');

    function setFormState(state, message) {
        statusEl.textContent  = message;
        statusEl.className    = state; // '', 'success' ou 'error'
        submitBtn.disabled    = state === 'loading';
        submitBtn.textContent = state === 'loading' ? 'Enviando...' : 'Enviar';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        setFormState('loading', '');

        // ── Integrar EmailJS aqui ─────────────────────────────
        // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form)
        //     .then(() => {
        //         setFormState('success', 'Mensagem enviada! Entrarei em contato em breve.');
        //         form.reset();
        //     })
        //     .catch(() => {
        //         setFormState('error', 'Erro ao enviar. Tente novamente ou use o e-mail direto.');
        //     });

        // Placeholder até integração com EmailJS
        setTimeout(() => {
            setFormState('success', 'Mensagem enviada! Entrarei em contato em breve.');
            form.reset();
        }, 800);
    });

});
