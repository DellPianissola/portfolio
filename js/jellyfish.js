// ── Águas-vivas SVG (Tecnologias) ────────────────────────────

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

function injectSVGs() {
    document.querySelectorAll('.jf-svg').forEach((svg, i) => {
        const begin   = (i * 0.23) % 1.6;
        const dur     = 1.3 + (i % 5) * 0.12;
        const labelEl = svg.closest('.jf-wrap').querySelector('.jf-label');
        const label   = labelEl ? labelEl.textContent.trim() : '';
        if (labelEl) labelEl.style.display = 'none';
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.innerHTML = buildJfSVG(begin, dur, label);
    });
}

function layoutJellyfish() {
    const tank = document.querySelector('.jellyfish-tank');
    if (!tank) return;
    const orbits      = tank.querySelectorAll('.jf-orbit');
    const n           = orbits.length;
    const maxR        = Math.min(tank.offsetWidth * 0.44, 380);
    tank.style.height = (maxR * 2 + 260) + 'px';

    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ≈ 137.5°
    orbits.forEach((el, i) => {
        const angle = i * goldenAngle;
        const dist  = Math.sqrt((i + 0.5) / n) * maxR;
        const x     = Math.cos(angle) * dist;
        const y     = Math.sin(angle) * dist;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

export function initJellyfish() {
    injectSVGs();
    layoutJellyfish();
    window.addEventListener('resize', layoutJellyfish);
}
