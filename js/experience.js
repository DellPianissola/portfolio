import { calm, compact as sheet } from './media.js';

const JOBS = [
    { id: 'kaffa', name: 'Kaffa', metric: true, chips: ['React', 'SWT', 'Android', 'GIS'], tags: ['Kotlin', 'Java', 'Nomad', 'React', 'SWT', 'Android', 'GIS'] },
    { id: 'senai', metric: true, chips: ['Django', 'FastAPI', 'React Native', 'Docker'], tags: ['Django REST Framework', 'FastAPI', 'SSE', 'Google Cloud Storage', 'MinIO', 'React Native', 'Docker', 'pytest'] },
    { id: 'unip', name: 'UNIP', edu: true, chips: ['MySQL', 'React', 'Next.js'], tags: ['MySQL', 'React', 'Next.js'] },
    { id: 'etep', name: 'ETEP', edu: true, chips: ['C++', 'Basic', 'Arduino'], tags: ['C++', 'Basic', 'Arduino'] },
];

const words = list => list.map(word => `<span>${word}</span>`).join(' ');

const jobMarkup = ({ id, name, edu, metric, chips, tags }) => {
    const key = field => `experience.${id}${field}`;
    const title = name ?? '';
    const titleKey = name ? '' : `data-i18n="${key('Name')}"`;
    return `
    <li class="xp${edu ? ' is-edu' : ''}">
        <div class="card">
            <h3><button type="button" class="xp-toggle" aria-expanded="false" aria-controls="xp-${id}">
                <span class="xp-head"><span class="xp-name" ${titleKey}>${title}</span><time data-i18n="${key('Date')}"></time></span>
                <span class="xp-role" data-i18n="${key('Role')}"></span>
                <span class="xp-text" data-i18n="${key('Text')}"></span>
                <span class="xp-foot"><span class="xp-chips">${words(chips)}</span><span class="xp-cue"><span data-i18n="experience.open"></span><span class="xp-arrow" aria-hidden="true"></span></span></span>
            </button></h3>
        </div>
        <div class="xp-panel" id="xp-${id}">
            <div class="xp-side">
                <div class="xp-side-top">
                    <span data-i18n="${key('Date')}"></span>
                    <button type="button" class="xp-close"><span data-i18n="experience.closePanel"></span> <i aria-hidden="true">×</i></button>
                </div>
                <p class="xp-title" ${titleKey}>${title}</p>
                <p class="xp-side-role" data-i18n="${key('Role')}"></p>
                <p class="xp-side-text" data-i18n="${key('Text')}"></p>
                ${metric ? `<p class="xp-metric"><b data-i18n="${key('MetricValue')}"></b><span data-i18n="${key('Metric')}"></span></p>` : ''}
            </div>
            <div class="xp-body">
                <p class="xp-label" data-i18n="experience.behind"></p>
                <ol class="decisions" data-i18n-html="${key('Decisions')}"></ol>
                <p class="xp-tags">${words(tags)}</p>
            </div>
        </div>
    </li>`;
};

export function renderExperience() {
    document.querySelector('.timeline').innerHTML = JOBS.map(jobMarkup).join('');
}

const MORPH = { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)' };
const REVEAL_GAP = 350;
const CONTENT_FADE = 200;
const CARD_FADE = 250;

export function initExperience() {
    const items = [...document.querySelectorAll('.xp')];
    const morphs = new Map();

    let open = null;

    const toggleOf = item => item.querySelector('.xp-toggle');

    const setOpen = (item, isOpen) => {
        item.classList.toggle('is-open', isOpen);
        toggleOf(item).setAttribute('aria-expanded', String(isOpen));
    };

    const measureClosed = item => ({
        height: item.offsetHeight,
        card: item.querySelector('.card').getBoundingClientRect(),
    });

    const buildFrames = (item, closed) => {
        const box = item.querySelector('.xp-panel').getBoundingClientRect();
        const edge = value => `${Math.max(0, value)}px`;
        const clip = `inset(${edge(closed.card.top - box.top)} ${edge(box.right - closed.card.right)} ${edge(box.bottom - closed.card.bottom)} ${edge(closed.card.left - box.left)})`;
        return {
            height: [`${closed.height}px`, `${item.offsetHeight}px`],
            clipPath: [clip, 'inset(0px 0px 0px 0px)'],
        };
    };

    const play = (item, direction) => {
        const morph = morphs.get(item);
        morph.running = [
            item.animate({ height: morph.frames.height }, { ...MORPH, direction }),
            item.querySelector('.xp-panel').animate({ clipPath: morph.frames.clipPath }, { ...MORPH, direction }),
        ];
        return Promise.all(morph.running.map(animation => animation.finished));
    };

    const clearFades = morph => {
        morph.fades.forEach(animation => animation.cancel());
        morph.fades = [];
    };

    const fadeOutContent = item => [...item.querySelectorAll('.xp-side > *, .xp-body')].map(element =>
        element.animate({ opacity: [1, 0] }, { duration: CONTENT_FADE, fill: 'forwards' }));

    const fadeInCard = item => item.querySelector('.card').animate(
        [{ opacity: 0, offset: 0 }, { opacity: 0, offset: 0.6 }, { opacity: 1, offset: 1 }],
        { duration: MORPH.duration, fill: 'forwards' });

    const fadeOutCard = item => item.querySelector('.card').animate(
        { opacity: [1, 0] }, { duration: CARD_FADE, fill: 'forwards' });

    const retract = item => {
        const morph = morphs.get(item);
        const settle = () => {
            setOpen(item, false);
            item.classList.remove('is-morphing');
            if (morph) clearFades(morph);
            morphs.delete(item);
        };

        if (!morph) {
            settle();
            return Promise.resolve();
        }

        clearFades(morph);
        item.classList.add('is-morphing');
        morph.fades = [...fadeOutContent(item), fadeInCard(item)];

        if (morph.running.some(animation => animation.playState === 'running')) {
            morph.running.forEach(animation => animation.reverse());
            return Promise.all(morph.running.map(animation => animation.finished)).then(settle);
        }

        return play(item, 'reverse').then(settle);
    };

    const show = item => {
        if (open) retract(open);

        const closed = measureClosed(item);
        open = item;
        setOpen(item, true);
        item.querySelector('.xp-close').focus({ preventScroll: true });

        if (calm.matches || sheet.matches) return;

        const morph ={ frames: buildFrames(item, closed), running: [], fades: [] };
        morphs.set(item, morph);
        item.classList.add('is-morphing');
        morph.fades = [fadeOutCard(item)];
        play(item, 'normal').then(() => {
            if (open !== item) return;
            item.classList.remove('is-morphing');
            clearFades(morph);
        });
    };

    const dismiss = () => {
        if (!open) return;
        const item = open;
        open = null;
        retract(item).then(() => toggleOf(item).focus({ preventScroll: true }));
    };

    items.forEach(item => {
        toggleOf(item).addEventListener('click', () => show(item));
        item.querySelector('.xp-close').addEventListener('click', dismiss);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') dismiss();
    });

    document.addEventListener('click', e => {
        if (sheet.matches && !e.target.closest('.xp-panel, .xp-toggle')) dismiss();
    });

    if (calm.matches) {
        items.forEach(item => item.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
            entry.target.style.setProperty('--d', `${i * REVEAL_GAP}ms`);
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -15% 0px' });

    items.forEach(item => observer.observe(item));
}
