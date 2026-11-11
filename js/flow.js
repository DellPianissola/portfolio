import { t } from './i18n.js';

const STEPS = ['detail', 'arch', 'web', 'tests', 'git', 'infra'];
const pad = n => String(n).padStart(2, '0');
const stepOf = j => ((j % STEPS.length) + STEPS.length) % STEPS.length;

export function initFlow() {
    const root = document.getElementById('flow');
    if (!root) return;

    const view = root.querySelector('.flow-view');
    const track = root.querySelector('.flow-track');
    const slot = root.querySelector('.flow-slot');
    const cards = new Map();
    let pos = 0;

    function makeCard(j) {
        const i = stepOf(j);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'flow-card';
        card.style.setProperty('--j', j);
        card.innerHTML = `
            <span class="flow-card-top"><span class="flow-icon" style="--icon: url(images/icons/${STEPS[i]}.svg)"></span><span class="flow-num">${pad(i + 1)}</span></span>
            <span class="flow-title">${t(`how.step${i + 1}Title`)}</span>
            <span class="flow-bar"><span></span></span>`;
        card.addEventListener('click', () => go(j));
        return card;
    }

    function render() {
        const first = pos - 1;
        const last = pos + 7;

        for (const [j, card] of cards) {
            if (j >= first && j <= last) continue;
            card.remove();
            cards.delete(j);
        }
        for (let j = first; j <= last; j++) {
            if (cards.has(j)) continue;
            const card = makeCard(j);
            cards.set(j, card);
            track.append(card);
        }
        cards.forEach((card, j) => {
            card.classList.toggle('is-on', j === pos);
            card.classList.toggle('is-past', j < pos);
            card.inert = j < pos;
        });
        syncFocus();
        track.style.transform = `translateX(calc(${-pos} * (var(--card) + var(--gap))))`;

        const n = stepOf(pos) + 1;
        const detail = document.createElement('div');
        detail.className = 'flow-detail';
        detail.innerHTML = `
            <span class="flow-detail-num" aria-hidden="true">${pad(n)}</span>
            <div><h3>${t(`how.step${n}Title`)}</h3><p>${t(`how.step${n}Text`)}</p></div>`;
        slot.replaceChildren(detail);
    }

    function syncFocus() {
        const current = cards.get(pos);
        const step = cards.get(pos + 1).offsetLeft - current.offsetLeft;
        const fits = Math.max(1, Math.floor((view.clientWidth + step - current.offsetWidth) / step));
        cards.forEach((card, j) => {
            card.tabIndex = j >= pos && j < pos + fits ? 0 : -1;
        });
    }

    function go(j) {
        if (j === pos) return;
        pos = j;
        render();
    }

    root.querySelectorAll('[data-flow]').forEach(button => {
        button.addEventListener('click', () => go(pos + Number(button.dataset.flow)));
    });

    track.addEventListener('animationend', e => {
        if (e.animationName === 'flow-fill') go(pos + 1);
    });

    let visible = false;
    const hold = () => root.classList.toggle('is-held', !visible);
    const stop = () => {
        root.classList.add('is-stopped');
        slot.setAttribute('aria-live', 'polite');
    };
    const resume = () => {
        root.classList.remove('is-stopped');
        slot.removeAttribute('aria-live');
    };

    root.addEventListener('click', e => {
        if (e.target.closest('.flow-card, [data-flow]')) stop();
    }, true);
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) resume();
        hold();
    }, { threshold: 0.5 }).observe(view);
    addEventListener('resize', syncFocus);

    document.addEventListener('langchange', () => {
        cards.forEach(card => card.remove());
        cards.clear();
        render();
    });

    hold();
    render();
}
