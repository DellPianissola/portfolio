// ── Projetos: sonar que troca o projeto quando o feixe passa ──

import { t } from './i18n.js';

const SWEEP_MS = 10000;

const formatBearing = deg => `${String(deg).padStart(3, '0')}°`;

export function initSonar() {
    const section = document.getElementById('projetos');
    const radar   = section?.querySelector('.sonar-radar');
    if (!radar) return;

    const sweepEl  = radar.querySelector('.sonar-sweep');
    const pingEl   = radar.querySelector('.sonar-ping');
    const panel    = section.querySelector('.sonar-panel');
    const rows     = [...section.querySelectorAll('.sonar-row')];
    const cards    = rows.map(row => document.getElementById(row.getAttribute('aria-controls')));
    const bearings = rows.map(row => Number(row.dataset.bearing));
    const modeBtn  = document.getElementById('sonar-mode');
    const modeText = document.getElementById('sonar-mode-label');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let selected = 0;
    let manual = reduced;
    let pointerInside = false;
    let focusInside = false;

    rows.forEach((row, i) => {
        const label = formatBearing(bearings[i]);
        row.querySelector('.sonar-bearing').textContent = label;
        cards[i].querySelector('.projeto-bearing').textContent = label;
    });

    const blips = rows.map((row, i) => {
        const a = bearings[i] * Math.PI / 180, range = Number(row.dataset.range);
        const el = document.createElement('button');
        el.type = 'button';
        el.tabIndex = -1;
        el.className = 'sonar-blip';
        el.style.left = `${50 + Math.sin(a) * range * 50}%`;
        el.style.top  = `${50 - Math.cos(a) * range * 50}%`;
        el.innerHTML = '<span></span>';
        el.addEventListener('click', () => pick(i));
        radar.appendChild(el);
        return el;
    });

    function select(i) {
        if (i === selected) return;
        selected = i;
        render();
    }

    function pick(i) {
        setManual(true);
        select(i);
    }

    function setManual(value) {
        manual = value;
        modeBtn.classList.toggle('is-manual', manual);
        modeBtn.setAttribute('aria-pressed', manual ? 'true' : 'false');
        modeText.textContent = t(manual ? 'projects.sonarManual' : 'projects.sonarAuto');
    }

    function render() {
        cards.forEach((card, i) => {
            card.classList.toggle('is-selected', i === selected);
            card.inert = i !== selected;
        });
        rows.forEach((row, i) => {
            row.classList.toggle('is-selected', i === selected);
            row.setAttribute('aria-pressed', i === selected ? 'true' : 'false');
        });
        blips.forEach((b, i) => b.classList.toggle('is-selected', i === selected));
    }

    function ping(el) {
        pingEl.style.left = el.style.left;
        pingEl.style.top  = el.style.top;
        pingEl.animate(
            [{ transform: 'scale(.4)', opacity: .9 }, { transform: 'scale(2.8)', opacity: 0 }],
            { duration: 1600, easing: 'ease-out' }
        );
    }

    rows.forEach((row, i) => row.addEventListener('click', () => pick(i)));
    modeBtn.addEventListener('click', () => setManual(!manual));
    panel.addEventListener('pointerenter', () => pointerInside = true);
    panel.addEventListener('pointerleave', () => pointerInside = false);
    panel.addEventListener('focusin', () => focusInside = true);
    panel.addEventListener('focusout', e => focusInside = panel.contains(e.relatedTarget));
    document.addEventListener('langchange', () => setManual(manual));

    setManual(manual);
    render();
    if (reduced) return;

    let angle = 0, last = 0, rafId = 0;

    function frame(now) {
        const prev = angle;
        angle = (angle + (now - last) / SWEEP_MS * 360) % 360;
        last = now;
        sweepEl.style.transform = `rotate(${angle}deg)`;
        bearings.forEach((bearing, i) => {
            const crossed = prev <= angle
                ? bearing > prev && bearing <= angle
                : bearing > prev || bearing <= angle;
            if (crossed) {
                ping(blips[i]);
                if (!manual && !pointerInside && !focusInside) select(i);
            }
            const since = ((angle - bearing) + 360) % 360;
            blips[i].firstChild.style.opacity = (1 - since / 360 * .8).toFixed(2);
        });
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
    }).observe(radar);
}
