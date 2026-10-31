// Seções vazias (problem, result, uses) não aparecem na página.

export const LAYERS = [
    ['case.layerFront', ['React', 'Vite', 'TypeScript', 'Mantine', 'Tailwind']],
    ['case.layerMobile', ['React Native', 'Expo']],
    ['case.layerBack', ['Node.js', 'Express', 'NestJS', 'Java', 'Spring Boot']],
    ['case.layerData', ['Prisma', 'PostgreSQL', 'MinIO']],
    ['case.layerTests', ['Vitest', 'Jest']],
    ['case.layerInfra', ['Docker', 'Cloudflare', 'pnpm']],
];

export const CASES = {
    whatchu: {
        name: 'Whatchu',
        host: 'whatchu.pianissola.tech',
        url: 'https://whatchu.pianissola.tech/',
        github: 'https://github.com/DellPianissola/whatchu',
        stack: ['React', 'Vite', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MinIO', 'Vitest', 'Docker'],
        pt: {
            problem: '',
            decisions: [
                ['Sorteio ponderado', 'Cada título entra no sorteio com peso pela sua prioridade.'],
                ['Busca integrada ao TMDB', 'Os títulos são encontrados direto na base do TMDB.'],
                ['JWT com refresh token', 'Autenticação com sessão renovada por refresh token.'],
            ],
            result: '',
            uses: { 'MinIO': 'Armazenamento dos avatares', 'Vitest': 'Testes automatizados' },
        },
        en: {
            problem: '',
            decisions: [
                ['Weighted pick', 'Each title enters the draw weighted by its priority.'],
                ['TMDB-integrated search', 'Titles are found directly in the TMDB catalogue.'],
                ['JWT with refresh tokens', 'Authentication with sessions renewed by a refresh token.'],
            ],
            result: '',
            uses: { 'MinIO': 'Avatar storage', 'Vitest': 'Automated tests' },
        },
    },
    citria: {
        name: 'Citria',
        host: 'citria.pianissola.tech',
        url: 'https://citria.pianissola.tech/',
        github: '',
        stack: ['React Native', 'Expo', 'React', 'Vite', 'Mantine', 'NestJS', 'Prisma', 'PostgreSQL', 'Jest', 'Docker'],
        pt: {
            problem: '',
            decisions: [
                ['Código compartilhado', 'Web e mobile aproveitam o mesmo código.'],
                ['Dietas com a tabela TACO', 'As dietas são montadas sobre a tabela TACO.'],
                ['Notificações push', 'Paciente recebe avisos direto no app.'],
                ['Testes e2e com Testcontainers', 'Fluxos testados de ponta a ponta com Testcontainers.'],
            ],
            result: '',
            uses: {},
        },
        en: {
            problem: '',
            decisions: [
                ['Shared code', 'Web and mobile reuse the same code.'],
                ['Diets from the TACO table', 'Diets are built on the TACO food table.'],
                ['Push notifications', 'Patients get alerts directly in the app.'],
                ['E2e tests with Testcontainers', 'Flows tested end to end with Testcontainers.'],
            ],
            result: '',
            uses: {},
        },
    },
    inside: {
        name: 'Inside',
        host: 'inside.nomaicode.com',
        url: 'https://inside.nomaicode.com/',
        github: '',
        stack: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Vite', 'Tailwind', 'Docker'],
        pt: {
            problem: '',
            decisions: [
                ['Propostas versionadas', 'A API precifica cada versão da proposta.'],
                ['Aceite vira projeto', 'A proposta aceita se transforma em projeto com marcos.'],
                ['E-mails via outbox', 'O envio de e-mails passa por outbox.'],
            ],
            result: '',
            uses: {},
        },
        en: {
            problem: '',
            decisions: [
                ['Versioned proposals', 'The API prices each version of a proposal.'],
                ['Acceptance becomes a project', 'An accepted proposal turns into a project with milestones.'],
                ['Emails through an outbox', 'Email delivery goes through an outbox.'],
            ],
            result: '',
            uses: {},
        },
    },
    iris: {
        name: 'Íris',
        host: 'iris.nomaicode.com',
        url: 'https://iris.nomaicode.com/',
        github: '',
        stack: ['React', 'Vite', 'TypeScript', 'Vitest', 'Cloudflare', 'pnpm'],
        pt: {
            problem: '',
            decisions: [
                ['Mockup real com o logo do cliente', 'As paletas são testadas sobre um site de verdade, não em amostras soltas.'],
                ['Contraste WCAG em tempo real', 'O contraste é recalculado enquanto o cliente arrasta.'],
            ],
            result: '',
            uses: {},
        },
        en: {
            problem: '',
            decisions: [
                ['Real mockup with the client logo', 'Palettes are tried on an actual website, not on loose swatches.'],
                ['WCAG contrast in real time', 'Contrast is recalculated as the customer drags.'],
            ],
            result: '',
            uses: {},
        },
    },
};
