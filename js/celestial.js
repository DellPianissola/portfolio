// ── Céu pela hora: Sol / Lua, cores do céu, ondas e oceano ───

import { startClouds, stopClouds } from './clouds.js';
import { debounce } from './utils.js';

// ── Paletas ───────────────────────────────────────────────────
function hx(h) {
    return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
}

// [hora, topo, meio, base]
const SKY_KEYS = [
    [0,    '#020810','#041428','#062038'],
    [4.6,  '#050c22','#0e1a3c','#1c2a52'],
    [5.7,  '#2a2f62','#7a5c8a','#e39a86'],
    [6.7,  '#6f8fc8','#f2c3a0','#ffd9a8'],
    [8,    '#c9e8f5','#87CEEB','#00BFFF'],
    [16.2, '#c9e8f5','#87CEEB','#00BFFF'],
    [17.4, '#7d9bd0','#f2bf86','#ffcf8a'],
    [18.4, '#2f2a5e','#d8664a','#ff9a5a'],
    [19.3, '#0d1530','#2a2d5a','#5a3d6a'],
    [20.4, '#020810','#041428','#062038'],
    [24,   '#020810','#041428','#062038'],
].map(([h, ...c]) => [h, ...c.map(hx)]);

const SUN_DAY    = ['#FFE55C','#FFD000','#FFA800'].map(hx);
const SUN_SUNSET = ['#ffe0b2','#FF8C00','#FF5000'].map(hx);

const WAVE_DAY   = ['#1a5580','#1a86bc','#009ACD','#00BFFF'].map(hx);
const WAVE_NIGHT = ['#010c18','#011a2c','#022440','#03305a'].map(hx);
const MAIN_DAY   = ['#00BFFF','#0074A8','#004f7a','#010d1a','#000508'].map(hx);
const MAIN_NIGHT = ['#03305a','#021830','#010d20','#010810','#000305'].map(hx);
const MAIN_POS   = [0, .2, .5, .8, 1];

const TARGET = { dia: 12, noite: 23 };

// ── Estado ────────────────────────────────────────────────────
let headerEl, sunEl, moonEl, mainEl, waveEls, daySky, nightSky;
let headerW = 0, headerH = 0;
let mode = 'auto';
let hour = nowHour();
let dayLevel = 1;
let isDark = null;
let tweenId = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function getDayLevel() { return dayLevel; }

export function waterColorAt(depth) {
    const d = Math.max(0, Math.min(1, depth));
    let i = 0;
    while (i < MAIN_POS.length - 2 && d > MAIN_POS[i+1]) i++;
    const k = (d - MAIN_POS[i]) / (MAIN_POS[i+1] - MAIN_POS[i]);
    const day   = lerp(MAIN_DAY[i],   MAIN_DAY[i+1],   k);
    const night = lerp(MAIN_NIGHT[i], MAIN_NIGHT[i+1], k);
    return lerp(night, day, dayLevel);
}

// ── Utilitários ───────────────────────────────────────────────
function nowHour() {
    const d = new Date();
    return d.getHours() + d.getMinutes()/60;
}

function clamp01(v) { return Math.max(0, Math.min(1, v)); }

function lerp(a, b, k) {
    return [a[0]+(b[0]-a[0])*k, a[1]+(b[1]-a[1])*k, a[2]+(b[2]-a[2])*k];
}

function rgb(c) { return `rgb(${c.map(Math.round).join(',')})`; }

// ── Render ────────────────────────────────────────────────────
function render() {
    let k = 0;
    while (k < SKY_KEYS.length - 2 && hour >= SKY_KEYS[k+1][0]) k++;
    const A = SKY_KEYS[k], B = SKY_KEYS[k+1];
    const tt = clamp01((hour - A[0]) / (B[0] - A[0] || 1));
    headerEl.style.background =
        `linear-gradient(to bottom,${rgb(lerp(A[1],B[1],tt))} 0%,${rgb(lerp(A[2],B[2],tt))} 45%,${rgb(lerp(A[3],B[3],tt))} 100%)`;

    const ang  = (hour - 6) / 12 * Math.PI;
    const elev = Math.sin(ang);
    dayLevel = clamp01((elev + .12) / .35);

    const cx = headerW/2, cy = headerH*.72, rx = headerW*.42, ry = headerH*.56;
    sunEl.style.left  = `${cx - Math.cos(ang)*rx}px`;
    sunEl.style.top   = `${cy - elev*ry}px`;
    moonEl.style.left = `${cx + Math.cos(ang)*rx}px`;
    moonEl.style.top  = `${cy + elev*ry}px`;

    const sunset = clamp01(1 - elev/.4);
    const sc = SUN_DAY.map((c, i) => lerp(c, SUN_SUNSET[i], sunset));
    sunEl.style.background = `radial-gradient(circle,${rgb(sc[0])},${rgb(sc[1])} 55%,${rgb(sc[2])} 100%)`;

    waveEls.forEach((el, i) => el.style.fill = rgb(lerp(WAVE_NIGHT[i], WAVE_DAY[i], dayLevel)));
    mainEl.style.background = `linear-gradient(to bottom,${
        MAIN_DAY.map((c, i) => `${rgb(lerp(MAIN_NIGHT[i], c, dayLevel))} ${MAIN_POS[i]*100}%`).join(',')})`;

    daySky.style.opacity   = dayLevel;
    nightSky.style.opacity = 1 - dayLevel;

    const dark = dayLevel < .5;
    if (dark !== isDark) {
        isDark = dark;
        document.body.classList.toggle('dark-mode', dark);
        dark ? stopClouds() : startClouds();
    }

    document.dispatchEvent(new Event('skychange'));
}

function tweenTo(target) {
    const from  = hour;
    const delta = ((target - from) % 24 + 24) % 24;
    const id    = ++tweenId;
    if (delta < .01) { render(); return; }
    const dur = 700 + delta/24 * 2600, t0 = performance.now();
    (function tick(now) {
        if (id !== tweenId) return;
        const k = Math.min(1, (now - t0) / dur);
        const e = k < .5 ? 2*k*k : 1 - Math.pow(-2*k + 2, 2)/2;
        hour = (from + delta*e) % 24;
        render();
        if (k < 1) requestAnimationFrame(tick);
        else tweenId = 0;
    })(t0);
}

function measureHeader() {
    headerW = headerEl.offsetWidth;
    headerH = headerEl.offsetHeight;
}

// ── API pública ───────────────────────────────────────────────
export function setSkyMode(next, { instant = false } = {}) {
    mode = next;
    const target = TARGET[mode] ?? nowHour();
    if (instant || reducedMotion.matches) { tweenId = 0; hour = target; render(); }
    else tweenTo(target);
}

export function initCelestial() {
    headerEl = document.querySelector('header');
    sunEl    = document.querySelector('.sun');
    moonEl   = document.querySelector('.moon');
    mainEl   = document.querySelector('main');
    daySky   = document.getElementById('day-sky');
    nightSky = document.getElementById('night-sky');
    waveEls  = [0,1,2,3].map(i => document.querySelector(`.wave-${i}`));
    measureHeader();

    setInterval(() => {
        if (mode === 'auto' && !tweenId) { hour = nowHour(); render(); }
    }, 30000);
    window.addEventListener('resize', debounce(() => { measureHeader(); render(); }, 120));
}
