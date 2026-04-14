// ── Sistema orbital Sol / Lua + Cores do Céu ─────────────────

import { startClouds, stopClouds } from './clouds.js';

// ── DOM refs (inicializados em initCelestial) ─────────────────
let sunEl, moonEl, headerEl, overlay, mainEl, waveEls;

// ── Constantes orbitais ───────────────────────────────────────
const REST    = 58 * Math.PI / 180;
const HORIZON = 22 * Math.PI / 180; // ângulo onde o astro toca o mar
const SIZE    = 72;
const PHASE1  = 2200;
const PHASE2  = 900;

// ── Paletas de gradiente do céu (4 stops: 0%, 35%, 65%, 100%) ─
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

// ── Paleta de cor do Sol ──────────────────────────────────────
const SUN_G = {
    day:    ['#FFE55C','#FFD000','#FFA800'],
    sunset: ['#ffe0b2','#FF8C00','#FF5000'],
    dusk:   ['#ffccaa','#FF5520','#CC1800'],
};

// ── Paletas das ondas e do main (mapeadas para RGB) ───────────
function hx(h) {
    return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
}

const WAVE_DAY   = ['#1a5580','#1a86bc','#009ACD','#00BFFF'].map(hx);
const WAVE_NIGHT = ['#010c18','#011a2c','#022440','#03305a'].map(hx);
const MAIN_DAY   = ['#00BFFF','#0074A8','#004f7a','#010d1a','#000508'].map(hx);
const MAIN_NIGHT = ['#03305a','#021830','#010d20','#010810','#000305'].map(hx);
const MAIN_POS   = [0, 20, 50, 80, 100];

const parsedSky = {};
Object.keys(SKY).forEach(k => parsedSky[k] = SKY[k].map(hx));

const parsedSun = {};
Object.keys(SUN_G).forEach(k => parsedSun[k] = SUN_G[k].map(hx));

// ── Estado de animação (live binding para importadores) ───────
export let celestialBusy = false;

// ── Utilitários de cor ────────────────────────────────────────
function lerpColor(a, b, t) {
    return [
        Math.round(a[0] + (b[0]-a[0])*t),
        Math.round(a[1] + (b[1]-a[1])*t),
        Math.round(a[2] + (b[2]-a[2])*t),
    ];
}

function toHex([r,g,b]) {
    return '#'+[r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// ── Aplicadores de céu e ondas ────────────────────────────────
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

function applySunColor(k1, k2, t) {
    const s1 = parsedSun[k1], s2 = parsedSun[k2];
    const c  = s1.map((v,i) => v.map((n,j) => Math.round(n+(s2[i][j]-n)*t)));
    sunEl.style.background = `radial-gradient(circle,${toHex(c[0])},${toHex(c[1])} 55%,${toHex(c[2])} 100%)`;
    const glow = c[1].join(',');
    sunEl.style.boxShadow  = `0 0 24px 8px rgba(${glow},.65),0 0 72px 26px rgba(${glow},.32),0 0 130px 55px rgba(${glow},.15)`;
}

function resetSunStyle() {
    sunEl.style.background = '';
    sunEl.style.boxShadow  = '';
}

// ── Progressões de céu ao longo da transição ─────────────────
function sunsetSkyAt(t) {
    applyWaveColors(t);
    if      (t < 0.28) applySky('day',     'sunset1', t/0.28);
    else if (t < 0.58) applySky('sunset1', 'sunset2', (t-0.28)/0.30);
    else if (t < 0.80) applySky('sunset2', 'dusk',    (t-0.58)/0.22);
    else               applySky('dusk',    'night',   (t-0.80)/0.20);
}

function sunriseSkyAt(t) {
    applyWaveColors(1 - t);
    if (t < 0.42) applySky('predawn', 'dawn', t/0.42);
    else          applySky('dawn',    'day',  (t-0.42)/0.58);
}

function sunColorAt(t) {
    if (t < 0.52) applySunColor('day',    'sunset', t/0.52);
    else          applySunColor('sunset',  'dusk',  (t-0.52)/0.48);
}

// ── Mecânica orbital ──────────────────────────────────────────
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
        place(sunEl,  REST,         o, true);
        place(moonEl, REST-Math.PI, o, false);
        headerEl.style.background = '';
        resetSunStyle();
    } else {
        place(moonEl, REST,         o, true);
        place(sunEl,  REST-Math.PI, o, false);
        applySky('night','night', 0);
    }
}

// ── API pública ───────────────────────────────────────────────
export function animateCelestial(toNight) {
    celestialBusy = true;
    const o = orb();

    if (toNight) {
        // Dia → Noite: para as nuvens e deixa JS controlar o céu
        stopClouds();
        applyWaveColors(0);
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
                celestialBusy = false;
            });
        });
    } else {
        // Noite → Dia: aplica céu noturno antes de esconder o overlay (sem flash)
        applySky('night', 'night', 0);
        applyWaveColors(1);
        overlay.style.transition = 'none';
        overlay.style.opacity    = '0';

        // Fase 1: Lua se põe
        sweep(moonEl, REST, Math.PI - HORIZON, PHASE1, null, null, function() {
            place(moonEl, REST-Math.PI, o, false);
            place(sunEl, HORIZON, o, true);

            // Fase 2: Sol nasce
            sweep(sunEl, HORIZON, REST, PHASE2, sunriseSkyAt, null, function() {
                headerEl.style.background = '';
                resetSunStyle();
                resetWaveColors();
                handoffOverlay(false);
                startClouds();
                celestialBusy = false;
            });
        });
    }
}

export function initCelestial() {
    sunEl    = document.querySelector('.sun');
    moonEl   = document.querySelector('.moon');
    headerEl = document.querySelector('header');
    overlay  = document.getElementById('sky-overlay');
    mainEl   = document.querySelector('main');
    waveEls  = [
        document.querySelector('.wave-0'),
        document.querySelector('.wave-1'),
        document.querySelector('.wave-2'),
        document.querySelector('.wave-3'),
    ];

    celestialBusy = false;
    init();
    window.addEventListener('resize', init);
}
