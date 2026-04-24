// ── Águas-vivas: SVG builder + layout phyllotaxis + clustering ─

import { debounce } from './utils.js';

// Timings individuais (dur em s, delay em s, y em px, r em deg)
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

function buildJellyfishSVGs() {
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
}

// Layout: phyllotaxis + clustering por cor + 2-opt + relaxamento
function layoutJellyfish() {
    const tank = document.querySelector('.jellyfish-tank');
    if (!tank) return;
    const orbits = tank.querySelectorAll('.jf-orbit');
    const n = orbits.length;
    if (n === 0) return;

    const tankW   = tank.offsetWidth;
    const sidePad = 12;
    const halfW   = tankW / 2 - sidePad;

    const SIZE_W = { 'jf--sm': 118, 'jf--md': 145, 'jf--lg': 175, 'jf--xl': 230 };
    const headRadii = Array.from(orbits).map(orb => {
        const jf = orb.querySelector('.jellyfish');
        for (const cls in SIZE_W) {
            if (jf && jf.classList.contains(cls)) {
                return (SIZE_W[cls] * 60 / 200) + 6;
            }
        }
        return 50;
    });

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const baseR       = Math.min(halfW, 320);
    const slots = [];
    for (let i = 0; i < n; i++) {
        const a = i * goldenAngle;
        const t = Math.sqrt((i + 0.5) / n);
        slots.push({ x: Math.cos(a) * t * baseR, y: Math.sin(a) * t * baseR });
    }

    const COLOR_CLASSES = ['jf--js', 'jf--py', 'jf--jvm', 'jf--web', 'jf--ops'];
    const groupOf = Array.from(orbits).map(orb => {
        const jf = orb.querySelector('.jellyfish');
        const idx = COLOR_CLASSES.findIndex(c => jf && jf.classList.contains(c));
        return idx < 0 ? COLOR_CLASSES.length : idx;
    });
    const groupSizes = {};
    groupOf.forEach(g => { groupSizes[g] = (groupSizes[g] || 0) + 1; });
    const order = Array.from({ length: n }, (_, i) => i)
        .sort((a, b) => (groupSizes[groupOf[b]] - groupSizes[groupOf[a]]) || (groupOf[a] - groupOf[b]) || (a - b));

    const slotTaken = new Array(n).fill(false);
    const itemSlot  = new Array(n).fill(-1);
    const centroids = {};

    for (const i of order) {
        const g = groupOf[i];
        let bestSlot = -1;
        if (centroids[g]) {
            const cx = centroids[g].x / centroids[g].count;
            const cy = centroids[g].y / centroids[g].count;
            let bestD = Infinity;
            for (let s = 0; s < n; s++) {
                if (slotTaken[s]) continue;
                const dx = slots[s].x - cx, dy = slots[s].y - cy;
                const d2 = dx * dx + dy * dy;
                if (d2 < bestD) { bestD = d2; bestSlot = s; }
            }
        } else {
            let bestD = Infinity;
            for (let s = 0; s < n; s++) {
                if (slotTaken[s]) continue;
                const d2 = slots[s].x * slots[s].x + slots[s].y * slots[s].y;
                if (d2 < bestD) { bestD = d2; bestSlot = s; }
            }
        }
        slotTaken[bestSlot] = true;
        itemSlot[i] = bestSlot;
        const c = centroids[g] || (centroids[g] = { x: 0, y: 0, count: 0 });
        c.x += slots[bestSlot].x;
        c.y += slots[bestSlot].y;
        c.count++;
    }

    function recomputeCentroids() {
        const c = {};
        for (let i = 0; i < n; i++) {
            const g = groupOf[i], s = slots[itemSlot[i]];
            const e = c[g] || (c[g] = { x: 0, y: 0, count: 0 });
            e.x += s.x; e.y += s.y; e.count++;
        }
        for (const g in c) { c[g].x /= c[g].count; c[g].y /= c[g].count; }
        return c;
    }

    for (let pass = 0; pass < 6; pass++) {
        let swapped = false;
        const cent = recomputeCentroids();
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (groupOf[i] === groupOf[j]) continue;
                const ci = cent[groupOf[i]], cj = cent[groupOf[j]];
                const si = slots[itemSlot[i]], sj = slots[itemSlot[j]];
                const before = (si.x-ci.x)**2 + (si.y-ci.y)**2 + (sj.x-cj.x)**2 + (sj.y-cj.y)**2;
                const after  = (sj.x-ci.x)**2 + (sj.y-ci.y)**2 + (si.x-cj.x)**2 + (si.y-cj.y)**2;
                if (after < before - 1) {
                    [itemSlot[i], itemSlot[j]] = [itemSlot[j], itemSlot[i]];
                    swapped = true;
                }
            }
        }
        if (!swapped) break;
    }

    // Troca explícita das regiões rosa (py) e verde (ops)
    const PY  = COLOR_CLASSES.indexOf('jf--py');
    const OPS = COLOR_CLASSES.indexOf('jf--ops');
    const currentCent = recomputeCentroids();
    if (currentCent[PY] && currentCent[OPS]) {
        const targetCent = {};
        for (const g in currentCent) targetCent[g] = currentCent[g];
        targetCent[PY]  = currentCent[OPS];
        targetCent[OPS] = currentCent[PY];
        for (let pass = 0; pass < 10; pass++) {
            let swapped = false;
            for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                    if (groupOf[i] === groupOf[j]) continue;
                    const ti = targetCent[groupOf[i]], tj = targetCent[groupOf[j]];
                    if (!ti || !tj) continue;
                    const si = slots[itemSlot[i]], sj = slots[itemSlot[j]];
                    const before = (si.x-ti.x)**2 + (si.y-ti.y)**2 + (sj.x-tj.x)**2 + (sj.y-tj.y)**2;
                    const after  = (sj.x-ti.x)**2 + (sj.y-ti.y)**2 + (si.x-tj.x)**2 + (si.y-tj.y)**2;
                    if (after < before - 1) {
                        [itemSlot[i], itemSlot[j]] = [itemSlot[j], itemSlot[i]];
                        swapped = true;
                    }
                }
            }
            if (!swapped) break;
        }
    }

    const positions = itemSlot.map(s => ({ x: slots[s].x, y: slots[s].y }));

    // Relaxamento: repulsão de sobreposição
    const ITERS = 160;
    for (let iter = 0; iter < ITERS; iter++) {
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const dx = positions[j].x - positions[i].x;
                const dy = positions[j].y - positions[i].y;
                const minD = headRadii[i] + headRadii[j];
                const d2 = dx * dx + dy * dy;
                if (d2 < minD * minD) {
                    const d = Math.sqrt(d2) || 0.01;
                    const overlap = (minD - d) / 2;
                    const ux = dx / d;
                    const uy = dy / d;
                    positions[i].x -= ux * overlap;
                    positions[i].y -= uy * overlap;
                    positions[j].x += ux * overlap;
                    positions[j].y += uy * overlap;
                }
            }
        }
        for (let i = 0; i < n; i++) {
            const r = headRadii[i];
            if (positions[i].x - r < -halfW) positions[i].x = -halfW + r;
            if (positions[i].x + r >  halfW) positions[i].x =  halfW - r;
        }
    }

    // Recentra o cluster no (0,0)
    let mx = 0, my = 0;
    for (let i = 0; i < n; i++) { mx += positions[i].x; my += positions[i].y; }
    mx /= n; my /= n;
    for (let i = 0; i < n; i++) { positions[i].x -= mx; positions[i].y -= my; }

    // Limites verticais do tank
    let headMinY = 0, tentMaxY = 0;
    for (let i = 0; i < n; i++) {
        const r = headRadii[i];
        headMinY = Math.min(headMinY, positions[i].y - r);
        tentMaxY = Math.max(tentMaxY, positions[i].y + r * 2.4);
    }
    const halfTank = Math.max(-headMinY, tentMaxY) + 40;
    const tankH    = Math.max(halfTank * 2, 380);

    const section = tank.closest('section');
    if (section) {
        const needed = tankH + 80;
        section.style.minHeight = Math.max(needed, window.innerHeight) + 'px';
    }
    const sectionH = section ? section.offsetHeight : tankH;
    tank.style.height = tankH + 'px';
    tank.style.top    = Math.max(0, (sectionH - tankH) / 2) + 'px';

    orbits.forEach((el, i) => {
        const x = positions[i].x;
        const y = positions[i].y;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

export function initJellyfish() {
    buildJellyfishSVGs();
    layoutJellyfish();
    window.addEventListener('resize', debounce(layoutJellyfish, 120));
}
