const MORPH = { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)' };
const REVEAL_GAP = 350;

export function initExperience() {
    const items = [...document.querySelectorAll('.xp')];
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
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

    const retract = item => {
        const morph = morphs.get(item);
        const settle = () => {
            setOpen(item, false);
            morphs.delete(item);
        };

        if (!morph) {
            settle();
            return Promise.resolve();
        }

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

        if (calm) return item.scrollIntoView({ block: 'nearest' });

        morphs.set(item, { frames: buildFrames(item, closed), running: [] });
        play(item, 'normal').then(() => {
            if (open === item) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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

    if (calm) {
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
