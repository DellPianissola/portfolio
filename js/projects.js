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

function stackGrid(names) {
    const grid = document.createElement('div');
    grid.className = 'stack-grid';
    names.forEach((name, i) => {
        const tile = document.createElement('div');
        tile.className = 'stack-tile';
        tile.style.setProperty('--i', i);

        const logo = new Image(28, 28);
        logo.src = `https://cdn.simpleicons.org/${LOGOS[name]}/1d2242`;
        logo.alt = '';
        logo.loading = 'lazy';

        const label = document.createElement('span');
        label.textContent = name;

        tile.append(logo, label);
        grid.append(tile);
    });
    return grid;
}

export function initProjects() {
    const items  = [...document.querySelectorAll('.proj-item')];
    const thumbs = [...document.querySelectorAll('.proj-thumb')];
    let current = 0;

    const show = index => {
        current = (index + items.length) % items.length;
        items.forEach((item, i) => item.classList.toggle('is-active', i === current));
        thumbs.forEach((thumb, i) => thumb.setAttribute('aria-pressed', String(i === current)));
    };

    document.querySelectorAll('.stack').forEach(stack => {
        stack.replaceWith(stackGrid(stack.textContent.split(', ')));
    });

    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));

    document.querySelectorAll('[data-proj-step]').forEach(button => {
        button.addEventListener('click', () => {
            const step = button.dataset.projStep;
            show(current + Number(step));
            items[current].querySelector(`[data-proj-step="${step}"]`).focus();
        });
    });
}
