// ── Jornada: régua de anos, filtros e cards expansíveis ──────

import { t } from './i18n.js';

const RULER_START = 2016;
const TICK_STEP = 2;

function yearNow() {
    const d = new Date();
    return d.getFullYear() + d.getMonth() / 12;
}

function layoutRuler(section) {
    const now = yearNow();
    const end = Math.floor(now) + 1;
    const pct = year => `${(year - RULER_START) / (end - RULER_START) * 100}%`;
    const yearOf = value => value === 'now' ? now : Number(value);

    section.querySelectorAll('.ruler-row').forEach(row => {
        const from = yearOf(row.dataset.from), to = yearOf(row.dataset.to);
        const bar = row.querySelector('.ruler-bar');
        bar.style.left  = pct(from);
        bar.style.width = `${(to - from) / (end - RULER_START) * 100}%`;
    });

    const ticks = section.querySelector('.ruler-ticks');
    ticks.replaceChildren(...Array.from({ length: Math.ceil((end - RULER_START) / TICK_STEP) }, (_, i) => {
        const tick = document.createElement('span');
        const year = RULER_START + i * TICK_STEP;
        tick.textContent = year;
        tick.style.left = pct(year);
        return tick;
    }));
}

export function initJourney() {
    const section = document.getElementById('jornada');
    if (!section) return;

    const items   = [...section.querySelectorAll('.journey-item')];
    const rows    = [...section.querySelectorAll('.ruler-row')];
    const filters = [...section.querySelectorAll('.journey-filter')];
    const idOf    = item => item.id.replace('journey-', '');
    let open = 'kaffa';

    layoutRuler(section);

    function render() {
        items.forEach(item => {
            const id = idOf(item);
            const selected = id === open;
            const toggle  = item.querySelector('.journey-toggle');
            const details = item.querySelector('.journey-details');
            item.classList.toggle('is-selected', selected);
            if (!toggle) return;
            toggle.setAttribute('aria-expanded', selected ? 'true' : 'false');
            toggle.textContent = t(selected ? 'journey.collapse' : 'journey.details');
            details.classList.toggle('is-open', selected);
            details.inert = !selected;
        });
        rows.forEach(row => row.classList.toggle('is-selected', row.dataset.target === open));
    }

    function setFilter(kind) {
        filters.forEach(btn => {
            const active = btn.dataset.filter === kind;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        [...items, ...rows].forEach(el => {
            el.classList.toggle('is-dim', kind !== 'all' && el.dataset.kind !== kind);
        });
    }

    filters.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));

    rows.forEach(row => row.addEventListener('click', () => {
        open = row.dataset.target;
        render();
        document.getElementById(`journey-${open}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }));

    items.forEach(item => {
        if (!item.querySelector('.journey-toggle')) return;
        item.querySelector('.journey-card').addEventListener('click', e => {
            if (e.target.closest('a') || getSelection().toString()) return;
            open = open === idOf(item) ? null : idOf(item);
            render();
        });
    });

    document.addEventListener('langchange', render);
    render();
}
