import { CASES } from './cases.js';
import { goLive } from './live.js';
import { calm, compact } from './media.js';

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

const stackLogos = names => names.filter(logoUrl).map(name => `
    <div class="stack-tile"><img src="${logoUrl(name)}" alt="${name}" title="${name}" width="24" height="24" loading="lazy"><span aria-hidden="true">${name}</span></div>`).join('');

const card = ([slug, item], i) => `
    <article class="proj-item${i ? '' : ' is-active'}">
        <div class="proj-media">
            <div class="browser">
                <div class="browser-bar">
                    <span class="mono">${item.host}</span>
                    <a href="${item.url}" target="_blank" rel="noopener" data-i18n="projects.open"></a>
                </div>
                <div class="browser-shot" data-live="${item.url}"><img src="images/projects/${slug}-live.jpg" alt="" data-i18n-attr="alt:projects.${slug}Alt" width="1280" height="800" loading="lazy"></div>
            </div>
        </div>
        <div class="proj-info">
            <p class="proj-type" data-i18n="projects.${slug}Type"></p>
            <h3 class="proj-tag">${item.name}</h3>
            <p class="proj-desc" data-i18n="projects.${slug}Desc"></p>
            <div class="stack-grid">${stackLogos(item.stack)}</div>
            <div class="proj-cta">
                <a class="button" href="estudo-de-caso.html#${slug}" data-i18n="projects.case"></a>
                <a class="button button--line" href="${item.url}" target="_blank" rel="noopener" data-i18n="projects.visit"></a>
                ${item.github ? `<a class="button button--line" href="${item.github}" target="_blank" rel="noopener" data-i18n="projects.code"></a>` : ''}
            </div>
        </div>
    </article>`;

const tab = ([slug, item], i) => `
    <button type="button" class="proj-thumb" aria-pressed="${!i}">
        <span class="proj-bar"></span>
        <span class="proj-thumb-name"><b>${item.name}</b></span>
        <span class="proj-thumb-type" data-i18n="projects.${slug}Type"></span>
    </button>`;

export function renderProjects() {
    const projects = Object.entries(CASES);
    document.querySelector('.proj').innerHTML = projects.map(card).join('');
    document.querySelector('.proj-strip').innerHTML = projects.map(tab).join('');
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

    const deck = document.querySelector('.proj');

    const stopAuto =() => strip.classList.remove('is-auto');

    const go = index => {
        show(index);
        if (!compact.matches) return;
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
        if (!compact.matches) return;
        entries.filter(entry => entry.isIntersecting).forEach(entry => show(items.indexOf(entry.target)));
    }, { root: deck, threshold: 0.6 });

    items.forEach(item => slides.observe(item));
}
