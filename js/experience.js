export function initExperience() {
    const toggles = document.querySelectorAll('.xp-toggle');

    const setOpen = (toggle, open) => {
        toggle.setAttribute('aria-expanded', String(open));
        document.getElementById(toggle.getAttribute('aria-controls')).classList.toggle('is-open', open);
    };

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            setOpen(toggle, toggle.getAttribute('aria-expanded') !== 'true');
        });
    });

    setOpen(toggles[0], true);
}
