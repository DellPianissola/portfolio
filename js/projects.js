import { goLive } from './live.js';

const LOGOS = {
    'React': 'react',
    'React Native': 'react',
    'Vite': 'vite',
    'Node.js': 'nodedotjs',
    'Express': 'express',
    'Prisma': 'prisma',
    'PostgreSQL': 'postgresql',
    'MinIO': 'minio',
    'Vitest': 'vitest',
    'Docker': 'docker',
    'Expo': 'expo',
    'Mantine': 'mantine',
    'NestJS': 'nestjs',
    'Jest': 'jest',
    'Java': 'openjdk',
    'Spring Boot': 'springboot',
    'Tailwind': 'tailwindcss',
    'TypeScript': 'typescript',
    'Cloudflare': 'cloudflare',
    'pnpm': 'pnpm',
};

export const logoUrl = name => LOGOS[name] && `https://cdn.simpleicons.org/${LOGOS[name]}/1d2242`;

function stackGrid(names) {
    const grid = document.createElement('div');
    grid.className = 'stack-grid';
    names.forEach(name => {
        const tile = document.createElement('div');
        tile.className = 'stack-tile';

        const logo = new Image(24, 24);
        logo.src = logoUrl(name);
        logo.alt = name;
        logo.title = name;
        logo.loading = 'lazy';

        const label = document.createElement('span');
        label.textContent = name;
        label.setAttribute('aria-hidden', 'true');

        tile.append(logo, label);
        grid.append(tile);
    });
    return grid;
}

export function initProjects() {
    const items  = [...document.querySelectorAll('.proj-item')];
    const thumbs = [...document.querySelectorAll('.proj-thumb')];
    const strip = document.querySelector('.proj-strip');
    let current = 0;

    const show = index => {
        current = (index + items.length) % items.length;
        items.forEach((item, i) => item.classList.toggle('is-active', i === current));
        thumbs.forEach((thumb, i) => {
            thumb.setAttribute('aria-pressed', String(i === current));
            thumb.classList.toggle('is-past', i < current);
        });
    };

    document.querySelectorAll('.stack').forEach(stack => {
        stack.replaceWith(stackGrid(stack.textContent.split(', ')));
    });

    const deck = document.querySelector('.proj');
    const swipeable = matchMedia('(max-width: 860px)');
    const calm = matchMedia('(prefers-reduced-motion: reduce)');

    const stopAuto =() => strip.classList.remove('is-auto');

    const go = index => {
        show(index);
        if (!swipeable.matches) return;
        deck.scrollTo({ left: items[current].offsetLeft - items[0].offsetLeft, behavior: calm.matches ? 'auto' : 'smooth' });
    };

    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => {
        stopAuto();
        go(i);
    }));

    strip.addEventListener('animationend', e => {
        if (e.animationName === 'proj-dwell') go(current + 1);
    });

    deck.addEventListener('touchstart', stopAuto, { passive: true });

    new IntersectionObserver(([entry]) => {
        strip.classList.toggle('is-auto', entry.isIntersecting);
    }, { threshold: 0.4 }).observe(deck);

    const preload = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        preload.disconnect();
        document.querySelectorAll('.proj [data-live]').forEach(goLive);
    }, { rootMargin: '150% 0px' });

    preload.observe(deck);

    const slides = new IntersectionObserver(entries => {
        if (!swipeable.matches) return;
        entries.filter(entry => entry.isIntersecting).forEach(entry => show(items.indexOf(entry.target)));
    }, { root: deck, threshold: 0.6 });

    items.forEach(item => slides.observe(item));
}
