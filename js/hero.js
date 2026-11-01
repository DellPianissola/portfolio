import { calm } from './media.js';

const ROLE_INTERVAL = 2800;

export function initHero() {
    if (calm.matches) return;

    const roles = [...document.querySelectorAll('.hero-role span')];
    let current = 0;

    setInterval(() => {
        roles.forEach(role => role.classList.remove('is-out'));
        roles[current].classList.replace('is-on', 'is-out');
        current = (current + 1) % roles.length;
        roles[current].classList.add('is-on');
    }, ROLE_INTERVAL);
}
