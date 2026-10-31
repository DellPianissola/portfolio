export function initExperience() {
    const items = document.querySelectorAll('.xp');
    let open = null;

    const toggleOf = item => item.querySelector('.xp-toggle');

    const close = () => {
        if (!open) return;
        const item = open;
        open = null;
        item.classList.remove('is-open');
        toggleOf(item).setAttribute('aria-expanded', 'false');
        return item;
    };

    const show = item => {
        close();
        open = item;
        item.classList.add('is-open');
        toggleOf(item).setAttribute('aria-expanded', 'true');
        item.querySelector('.xp-close').focus({ preventScroll: true });
        item.scrollIntoView({ block: 'nearest' });
    };

    const dismiss = () => {
        const item = close();
        if (item) toggleOf(item).focus({ preventScroll: true });
    };

    items.forEach(item => {
        toggleOf(item).addEventListener('click', () => show(item));
        item.querySelector('.xp-close').addEventListener('click', dismiss);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') dismiss();
    });
}
