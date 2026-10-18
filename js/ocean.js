// ── Oceano vivo: peixes, cardume e leito desenhados em canvas ─

import { getDayLevel, waterColorAt } from './celestial.js';

const TAU = Math.PI * 2;

// ── Cor ───────────────────────────────────────────────────────
const hexCache = new Map();

function hexToRgb(hex) {
    let rgb = hexCache.get(hex);
    if (!rgb) {
        rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
        hexCache.set(hex, rgb);
    }
    return rgb;
}

function mix(a, b, k) {
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

function rgba(c, alpha = 1) {
    return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${alpha})`;
}

// ── Aleatório com semente (cada zona nasce sempre igual) ──────
let seed = 11;

function random() {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
}

function randomBetween(min, max) { return min + random() * (max - min); }

function randomItem(list) { return list[Math.floor(random() * list.length)]; }

// ── Desenho ───────────────────────────────────────────────────
const TROPICAL = {
    clown: { body: '#ff8a3d', fin: '#ff6a2b', stripe: '#fff4e6', stripes: [[.42, .08], [-.18, .08]] },
    tang:  { body: '#ffd23f', fin: '#f2b300', stripe: '#fff1a8', stripes: [] },
    blue:  { body: '#3b7bf0', fin: '#ffd23f', stripe: '#16357f', stripes: [[-.05, .16]] },
    royal: { body: '#9b5de5', fin: '#ffd23f', stripe: '#ffd23f', stripes: [[-.55, .42]] },
    teal:  { body: '#2ec4b6', fin: '#ff9f1c', stripe: '#d7fff9', stripes: [[.3, .05]] },
    coral: { body: '#ff6f91', fin: '#ffc2d1', stripe: '#ffd6e0', stripes: [[.15, .06], [-.25, .05]] },
};

function drawEye(ctx, x, y, r) {
    ctx.fillStyle = '#0b1b2b';
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.beginPath(); ctx.arc(x + r * .3, y - r * .3, r * .35, 0, TAU); ctx.fill();
}

function drawTropical(ctx, color, look, phase) {
    ctx.fillStyle = color(look.fin);
    ctx.save();
    ctx.translate(-.6, 0);
    ctx.rotate(Math.sin(phase) * .22);
    ctx.beginPath();
    ctx.moveTo(.06, 0);
    ctx.quadraticCurveTo(-.28, -.18, -.5, -.48);
    ctx.quadraticCurveTo(-.36, 0, -.5, .48);
    ctx.quadraticCurveTo(-.28, .18, .06, 0);
    ctx.fill();
    ctx.restore();

    ctx.beginPath(); ctx.moveTo(.4, -.4); ctx.quadraticCurveTo(0, -.88, -.5, -.28); ctx.lineTo(.2, -.3); ctx.fill();
    ctx.beginPath(); ctx.moveTo(.15, .38); ctx.quadraticCurveTo(-.15, .78, -.42, .28); ctx.fill();

    const body = new Path2D();
    body.moveTo(1, .02);
    body.bezierCurveTo(.82, -.56, -.2, -.62, -.66, -.08);
    body.lineTo(-.66, .08);
    body.bezierCurveTo(-.2, .62, .82, .56, 1, .02);
    ctx.fillStyle = color(look.body);
    ctx.fill(body);

    ctx.save();
    ctx.clip(body);
    ctx.fillStyle = color(look.stripe);
    look.stripes.forEach(([x, w]) => { ctx.beginPath(); ctx.ellipse(x, 0, w, .8, 0, 0, TAU); ctx.fill(); });
    ctx.fillStyle = 'rgba(0,20,40,.12)';
    ctx.fillRect(-1, .16, 2.2, 1);
    ctx.fillStyle = 'rgba(255,255,255,.16)';
    ctx.beginPath(); ctx.ellipse(.25, -.3, .5, .1, -.08, 0, TAU); ctx.fill();
    ctx.restore();

    ctx.fillStyle = color(look.fin);
    ctx.save();
    ctx.translate(.3, .12);
    ctx.rotate(.5 + Math.sin(phase * 1.3) * .3);
    ctx.beginPath(); ctx.ellipse(-.12, 0, .16, .06, 0, 0, TAU); ctx.fill();
    ctx.restore();

    drawEye(ctx, .62, -.08, .085);
}

function drawSardine(ctx, color, phase) {
    ctx.fillStyle = color('#5f8fbf');
    ctx.save();
    ctx.translate(-.85, 0);
    ctx.rotate(Math.sin(phase) * .3);
    ctx.beginPath(); ctx.moveTo(.1, 0); ctx.lineTo(-.4, -.32); ctx.lineTo(-.25, 0); ctx.lineTo(-.4, .32); ctx.fill();
    ctx.restore();

    const body = new Path2D();
    body.ellipse(0, 0, 1, .24, 0, 0, TAU);
    ctx.fillStyle = color('#d6ecff');
    ctx.fill(body);
    ctx.save();
    ctx.clip(body);
    ctx.fillStyle = color('#3d6f9e');
    ctx.fillRect(-1.1, -.4, 2.2, .38);
    ctx.restore();

    ctx.fillStyle = '#0b1b2b';
    ctx.beginPath(); ctx.arc(.7, -.03, .07, 0, TAU); ctx.fill();
}

function drawWreck(ctx, color, t) {
    ctx.strokeStyle = color('#4a3828');
    ctx.lineCap = 'round';
    ctx.lineWidth = .035;
    ctx.beginPath(); ctx.moveTo(.22, -.12); ctx.lineTo(.04, -.92); ctx.stroke();
    ctx.lineWidth = .022;
    ctx.beginPath(); ctx.moveTo(-.16, -.7); ctx.lineTo(.3, -.8); ctx.stroke();

    const sway = Math.sin(t * .8) * .03;
    ctx.fillStyle = color('#cbb894', .5);
    ctx.beginPath();
    ctx.moveTo(-.12, -.7); ctx.lineTo(.26, -.78); ctx.lineTo(.22 + sway, -.5); ctx.lineTo(.12 + sway, -.56);
    ctx.lineTo(.06 + sway, -.42); ctx.lineTo(-.04 + sway, -.5); ctx.lineTo(-.1 + sway, -.46);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = color('#5c4532');
    ctx.beginPath();
    ctx.moveTo(-.6, -.12); ctx.lineTo(-.6, -.36); ctx.lineTo(-.42, -.38); ctx.lineTo(-.36, -.3);
    ctx.lineTo(-.26, -.4); ctx.lineTo(-.12, -.34); ctx.lineTo(-.12, -.12);
    ctx.fill();
    ctx.fillStyle = color('#0e2236');
    [-.52, -.34].forEach(x => ctx.fillRect(x, -.28, .1, .09));

    const hull = new Path2D();
    hull.moveTo(-.95, -.12); hull.lineTo(.8, -.12); hull.lineTo(1.06, -.34);
    hull.quadraticCurveTo(.98, .14, .6, .32); hull.lineTo(-.82, .32); hull.quadraticCurveTo(-1.02, .1, -.95, -.12);
    ctx.fillStyle = color('#6b4f3a');
    ctx.fill(hull);

    ctx.save();
    ctx.clip(hull);
    ctx.strokeStyle = color('#87664b');
    ctx.lineWidth = .012;
    [-.02, .08, .18, .26].forEach(y => { ctx.beginPath(); ctx.moveTo(-1.1, y); ctx.lineTo(1.1, y - .06); ctx.stroke(); });
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fillRect(-1.1, .16, 2.3, .3);
    ctx.fillStyle = '#04101c';
    ctx.beginPath();
    ctx.moveTo(.28, .04); ctx.lineTo(.42, 0); ctx.lineTo(.5, .08); ctx.lineTo(.46, .2); ctx.lineTo(.36, .24); ctx.lineTo(.26, .16);
    ctx.closePath(); ctx.fill();
    ctx.restore();

    ctx.fillStyle = color('#4a3828');
    ctx.fillRect(-.95, -.15, 1.78, .04);
    for (let x = -.9; x < .8; x += .12) ctx.fillRect(x, -.22, .018, .08);
    [-.7, -.48, -.26, -.04, .66].forEach(x => {
        ctx.fillStyle = color('#6b5a3a');
        ctx.beginPath(); ctx.arc(x, .04, .05, 0, TAU); ctx.fill();
        ctx.fillStyle = '#02060c';
        ctx.beginPath(); ctx.arc(x, .04, .032, 0, TAU); ctx.fill();
    });
}

// ── Movimento ─────────────────────────────────────────────────
function swimmer(options) {
    return {
        offsetY: 0, phase: random() * TAU, wavePhase: random() * TAU, boost: 0, vy: 0,
        flee: 90, margin: 120, amp: 14, freq: .4, flap: 6,
        ...options,
    };
}

function moveSwimmer(f, dt, t, W, mouse) {
    f.x += f.dir * f.speed * (1 + f.boost) * dt;
    const baseY = f.y0 + Math.sin(t * f.freq + f.wavePhase) * f.amp;

    if (mouse) {
        const dx = f.x - mouse.x, dy = baseY + f.offsetY - mouse.y, dist = Math.hypot(dx, dy) || 1;
        if (dist < f.flee) {
            const k = (1 - dist / f.flee) ** 2;
            f.offsetY += dy / dist * 55 * k * dt;
            f.boost = Math.min(.5, f.boost + dt * 1.2 * k);
        }
    }
    f.offsetY *= Math.pow(.8, dt);
    f.boost *= Math.pow(.5, dt);

    const y = baseY + f.offsetY;
    f.vy = f.vy * .85 + ((y - (f.y ?? y)) / Math.max(dt, 1e-3)) * .15;
    f.y = y;
    f.phase += dt * f.flap * (1 + f.boost);

    const wrapped = f.dir > 0 ? f.x > W + f.margin : f.x < -f.margin;
    if (wrapped) {
        f.x = f.dir > 0 ? -f.margin : W + f.margin;
        if (f.yMin != null) f.y0 = randomBetween(f.yMin, f.yMax);
    }
}

function placeSwimmer(ctx, f, draw) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.scale(f.dir, 1);
    const tilt = Math.atan2(f.vy, f.speed * (1 + f.boost)) * .6;
    ctx.rotate(Math.max(-.45, Math.min(.45, tilt)));
    ctx.scale(f.size, f.size);
    draw();
    ctx.restore();
}

const SCHOOL_SPEED = 42;
const SCHOOL_MAX_SPEED = 140;

function moveSchool(z, dt, t, W, H, mouse) {
    const anchor = z.anchor, span = W + 70;
    anchor.x -= SCHOOL_SPEED * dt;
    if (anchor.x < -35) anchor.x += span;
    anchor.y = H * .72 + Math.sin(t * .25) * H * .06;

    z.sardines.forEach(f => {
        let alignX = 0, alignY = 0, centerX = 0, centerY = 0, sepX = 0, sepY = 0, n = 0;
        z.sardines.forEach(o => {
            if (o === f) return;
            const dx = o.x - f.x, dy = o.y - f.y, dist = Math.hypot(dx, dy);
            if (dist >= 55) return;
            alignX += o.vx; alignY += o.vy; centerX += o.x; centerY += o.y; n++;
            if (dist < f.size * 2.6) { sepX -= dx / (dist || 1); sepY -= dy / (dist || 1); }
        });
        if (n) {
            f.vx += (alignX / n - f.vx) * 2.4 * dt;
            f.vy += (alignY / n - f.vy) * 2.4 * dt;
            f.vx += (centerX / n - f.x) * .8 * dt;
            f.vy += (centerY / n - f.y) * .8 * dt;
        }
        f.vx += sepX * 90 * dt;
        f.vy += sepY * 90 * dt;
        f.vx += (-SCHOOL_SPEED - f.vx) * .9 * dt;

        let toAnchorX = anchor.x - f.x;
        toAnchorX -= Math.round(toAnchorX / span) * span;
        const toAnchorY = anchor.y - f.y, toAnchor = Math.hypot(toAnchorX, toAnchorY);
        if (toAnchor > 45) {
            const k = Math.min(1, (toAnchor - 45) / 200);
            f.vx += toAnchorX / toAnchor * 70 * k * dt;
            f.vy += toAnchorY / toAnchor * 70 * k * dt;
        }

        if (mouse) {
            const dx = f.x - mouse.x, dy = f.y - mouse.y, dist = Math.hypot(dx, dy) || 1;
            if (dist < 110) {
                const k = (1 - dist / 110) ** 2;
                f.vx += dx / dist * 260 * dt * k;
                f.vy += dy / dist * 260 * dt * k;
            }
        }

        if (f.y < H * .45) f.vy += 40 * dt;
        if (f.y > H * .92) f.vy -= 40 * dt;
        f.vy *= Math.pow(.4, dt);

        const speed = Math.hypot(f.vx, f.vy);
        if (speed > SCHOOL_MAX_SPEED) { f.vx *= SCHOOL_MAX_SPEED / speed; f.vy *= SCHOOL_MAX_SPEED / speed; }
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.phase += dt * (8 + speed * .05);
        if (f.x < -40) f.x = W + 30;
        if (f.x > W + 40) f.x = -30;
    });
}

// ── Zonas ─────────────────────────────────────────────────────
function buildZone(zone, W, H) {
    seed = zone * 977 + 5;
    const z = {};
    const kinds = Object.keys(TROPICAL);

    if (zone === 1) {
        z.fish = Array.from({ length: 9 }, (_, i) => swimmer({
            kind: kinds[i % kinds.length], x: randomBetween(0, W), y0: randomBetween(H * .15, H * .9),
            yMin: H * .15, yMax: H * .9, dir: random() < .5 ? 1 : -1,
            speed: randomBetween(26, 48), size: randomBetween(11, 17), fog: randomBetween(.04, .2),
        }));
        const shoalY = H * .7;
        for (let i = 0; i < 7; i++) {
            z.fish.push(swimmer({
                kind: 'tang', x: W * .7 + (i % 4) * 34 + (i > 3 ? 17 : 0), y0: shoalY + (i > 3 ? 26 : 0) + (i % 2) * 8,
                dir: -1, speed: 34, size: 12, fog: .12, wavePhase: 1, amp: 18, freq: .35,
            }));
        }
        z.far = Array.from({ length: 6 }, () => swimmer({
            kind: randomItem(kinds), x: randomBetween(0, W), y0: randomBetween(H * .1, H * .95),
            yMin: H * .1, yMax: H * .95, dir: random() < .5 ? 1 : -1,
            speed: randomBetween(14, 22), size: randomBetween(6, 8), fog: .55,
        }));
    }

    if (zone === 2) {
        z.anchor = { x: W * .55, y: H * .72 };
        z.sardines = Array.from({ length: 48 }, () => ({
            x: W * .55 + randomBetween(-90, 90), y: H * .72 + randomBetween(-50, 50),
            vx: -40, vy: 0, phase: random() * TAU, size: randomBetween(6, 8.5),
        }));
    }

    if (zone === 3) {
        z.plankton = Array.from({ length: 70 }, () => ({
            x: randomBetween(0, W), y: randomBetween(0, H), r: randomBetween(.6, 1.8), phase: random() * TAU, v: randomBetween(2, 8),
        }));
    }

    if (zone === 4) {
        z.bed = x => H - 130 + Math.sin(x * .006) * 16 + Math.sin(x * .017 + 1) * 8;
        z.snow = Array.from({ length: 40 }, () => ({
            x: randomBetween(0, W), y: randomBetween(0, H * .8), r: randomBetween(.6, 1.6), v: randomBetween(1, 5),
        }));
    }

    return z;
}

function fillGround(ctx, W, H, groundY) {
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 12) ctx.lineTo(x, groundY(x));
    ctx.lineTo(W, H);
    ctx.fill();
}

function drawZone(ctx, zone, z, { W, H, dt, t, mouse, tint, night }) {
    if (zone === 1) {
        z.far.forEach(f => {
            moveSwimmer(f, dt, t, W, null);
            placeSwimmer(ctx, f, () => drawTropical(ctx, tint(f.y, f.fog), TROPICAL[f.kind], f.phase));
        });
        z.fish.forEach(f => {
            moveSwimmer(f, dt, t, W, mouse);
            placeSwimmer(ctx, f, () => drawTropical(ctx, tint(f.y, f.fog), TROPICAL[f.kind], f.phase));
        });
    }

    if (zone === 2) {
        moveSchool(z, dt, t, W, H, mouse);
        const color = tint(H * .7, .12);
        z.sardines.forEach(f => {
            ctx.save();
            ctx.translate(f.x, f.y);
            ctx.rotate(Math.atan2(f.vy, f.vx));
            ctx.scale(f.size, f.size);
            drawSardine(ctx, color, f.phase);
            ctx.restore();
        });
    }

    if (zone === 3) {
        const glow = 1 + night * .35;
        z.plankton.forEach(p => {
            p.y -= p.v * dt;
            if (p.y < 0) p.y = H;
            const alpha = Math.max(0, (.25 + .35 * Math.sin(t * 1.5 + p.phase)) * glow);
            ctx.fillStyle = `rgba(120,240,255,${alpha})`;
            ctx.beginPath(); ctx.arc(p.x + Math.sin(t * .3 + p.phase) * 6, p.y, p.r, 0, TAU); ctx.fill();
        });
    }

    if (zone === 4) {
        const bed = z.bed;
        z.snow.forEach(p => {
            p.y += p.v * dt;
            if (p.y > H * .85) p.y = 0;
            ctx.fillStyle = 'rgba(200,240,255,.12)';
            ctx.fillRect(p.x, p.y, p.r, p.r);
        });

        ctx.fillStyle = tint(H * .6, .75, .45)('#2a3540');
        fillGround(ctx, W, H, x => bed(x) - 46 + Math.sin(x * .011 + 2) * 18);

        const wreckSize = Math.min(W * .24, 300), wreckX = W * .76;
        ctx.save();
        ctx.translate(wreckX, bed(wreckX) - wreckSize * .12);
        ctx.rotate(-.1);
        ctx.scale(wreckSize, wreckSize);
        drawWreck(ctx, tint(H * .75, .7, .4), t);
        ctx.restore();

        ctx.fillStyle = tint(H * .85, .7, .35)('#3a3528');
        fillGround(ctx, W, H, bed);

        const shade = ctx.createLinearGradient(0, H - 150, 0, H);
        shade.addColorStop(0, 'rgba(0,4,10,0)');
        shade.addColorStop(1, 'rgba(0,4,10,.6)');
        ctx.fillStyle = shade;
        ctx.fillRect(0, H - 150, W, 150);
    }
}

// ── Montagem ──────────────────────────────────────────────────
function mount(section, canvas, zone, animate) {
    const ctx  = canvas.getContext('2d');
    const main = section.closest('main');
    let W = 0, H = 0, top = 0, depthH = 1, z = null, mouse = null, t = 0;
    let dirty = true;

    const resizeObserver = new ResizeObserver(() => { dirty = true; });
    resizeObserver.observe(canvas);
    resizeObserver.observe(main);

    function resize() {
        if (!dirty) return;
        dirty = false;
        top = section.offsetTop - main.offsetTop;
        depthH = main.offsetHeight || 1;
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (w === W && h === H) return;
        const rebuild = !z || w !== W || Math.abs(h - H) > H * .25;
        W = canvas.width = w;
        H = canvas.height = h;
        if (rebuild) z = buildZone(zone, W, H);
    }

    function draw(dt) {
        ctx.clearRect(0, 0, W, H);
        const night = 1 - getDayLevel();
        const tint = (y, fog, light = 1) => {
            const water = waterColorAt((top + y) / depthH);
            const f = fog + (1 - fog) * night * .6, l = light * (1 - night * .45);
            return (hex, alpha = 1) => {
                const c = mix(hexToRgb(hex), water, f);
                return rgba([c[0] * l, c[1] * l, c[2] * l], alpha);
            };
        };
        drawZone(ctx, zone, z, { W, H, dt, t, mouse, tint, night });
    }

    section.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = canvas.getBoundingClientRect();
        mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    section.addEventListener('pointerleave', () => { mouse = null; });

    if (!animate) {
        const still = () => { resize(); draw(0); };
        new ResizeObserver(still).observe(canvas);
        document.addEventListener('skychange', still);
        return;
    }

    let last = 0, rafId = 0;
    function frame(now) {
        const dt = Math.min(.05, (now - last) / 1000);
        last = now;
        t += dt;
        resize();
        draw(dt);
        rafId = requestAnimationFrame(frame);
    }

    new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !rafId) {
            last = performance.now();
            rafId = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }).observe(section);
}

const ZONES = [['sobre', 1], ['jornada', 2], ['projetos', 3], ['contato', 4]];

export function initOcean() {
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ZONES.forEach(([id, zone]) => {
        const section = document.getElementById(id);
        const canvas = section?.querySelector('.ocean-life');
        if (canvas) mount(section, canvas, zone, animate);
    });
}
