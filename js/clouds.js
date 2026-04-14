// ── Nuvens (céu diurno) ───────────────────────────────────────

let cloudsActive = false;
let cloudSchedulerTimeout = null;

// Silhuetas SVG de nuvens (viewBox variável)
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

    const shape    = CLOUD_SHAPES[Math.floor(Math.random() * CLOUD_SHAPES.length)];
    const width    = Math.random() * 180 + 60;           // 60–240px

    // Paralax: menor = mais longe = mais lento e mais alto
    const t        = (width - 60) / 180;                 // 0 (pequena) → 1 (grande)
    const duration = 110 - t * 65 + Math.random() * 10; // 55–120s
    const top      = 2 + (1 - t) * 10 + Math.random() * 6;
    const opacity  = 0.45 + t * 0.40 + Math.random() * 0.1;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', shape.vb);
    svg.classList.add('cloud');
    svg.style.width             = `${width}px`;
    svg.style.height            = 'auto';
    svg.style.top               = `${top}%`;
    svg.style.left              = `-${width + 20}px`;
    svg.style.opacity           = opacity;
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

export function startClouds() {
    if (cloudsActive) return;
    cloudsActive = true;
    launchCloud();
    setTimeout(launchCloud, 6000);
    cloudSchedulerTimeout = setTimeout(scheduleClouds, 12000);
}

export function stopClouds() {
    cloudsActive = false;
    clearTimeout(cloudSchedulerTimeout);
    cloudSchedulerTimeout = null;
    const container = document.getElementById('clouds-container');
    Array.from(container.children).forEach(cloud => {
        cloud.style.transition = 'opacity 1.5s ease';
        cloud.style.opacity    = '0';
        setTimeout(() => cloud.remove(), 1500);
    });
}
