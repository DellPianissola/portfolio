import { t } from './i18n.js';

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

export const logoUrl = name => LOGOS[name] && `images/stack/${LOGOS[name]}.svg`;

export const externalButton = (url, key, line = false) =>
    `<a class="button${line ? ' button--line' : ''}" href="${url}" target="_blank" rel="noopener" data-i18n="${key}">${t(key)}</a>`;
