const STORAGE_KEY = 'lang';
const SUPPORTED = ['pt', 'en'];
const DEFAULT = 'pt';

const dict = {
    pt: {
        'meta.title': 'Gabriel Pianissola',
        'meta.description': 'Portfólio de Gabriel Pianissola, Programador Full-Stack especializado em JavaScript, TypeScript, Python, Django, React, React Native, Node.js, Kotlin, Java e mais.',
        'meta.ogTitle': 'Gabriel Pianissola — Programador Full-Stack',
        'meta.ogDescription': 'Portfólio de Gabriel Pianissola. JavaScript, TypeScript, Python, Django, React, React Native, Kotlin e mais.',
        'meta.ogImageAlt': 'Portfólio de Gabriel Pianissola, Programador Full-Stack',
        'meta.ogLocale': 'pt_BR',

        'nav.home': 'Home',
        'nav.about': 'Sobre',
        'nav.journey': 'Jornada',
        'nav.tech': 'Tecnologias',
        'nav.projects': 'Projetos',
        'nav.contact': 'Contato',
        'nav.logoAria': 'Ir para o início',
        'nav.themeGroupAria': 'Horário do céu',
        'nav.themeAuto': 'Auto',
        'nav.themeDay': 'Dia',
        'nav.themeNight': 'Noite',
        'nav.menuAria': 'Abrir menu',
        'nav.langGroupAria': 'Seletor de idioma',
        'nav.langPtAria': 'Mudar para português',
        'nav.langEnAria': 'Switch to English',

        'hero.greeting': 'Olá, me chamo',
        'hero.role': 'Programador Full-Stack',
        'hero.ctaProjects': 'Ver Projetos',
        'hero.ctaContact': 'Falar comigo',
        'hero.scrollAria': 'Rolar para baixo',
        'hero.profileAlt': 'Gabriel Pianissola sorrindo na praia',

        'about.title': 'Sobre mim',
        'about.intro': 'Comecei programando microcontroladores no time de robótica do ensino médio. Hoje atuo full-stack em web, mobile e desktop, com foco em problemas técnicos difíceis e decisões de arquitetura que envelhecem bem.',
        'about.card1Title': 'Amplitude técnica',
        'about.card1Text': 'Web, mobile e desktop. Front, backend e infra. Atuo na camada onde o problema está.',
        'about.card2Title': 'Decisões que escalam',
        'about.card2Text': 'Arquiteturas pensadas pra crescer: comunicação assíncrona entre APIs e uploads direto entre cliente e storage com URLs assinadas.',
        'about.card3Title': 'Aprendo entregando',
        'about.card3Text': 'Cada projeto trouxe uma stack nova que precisei dominar pra entregar. Foi assim com FastAPI, MinIO e Android nativo.',
        'about.factLangLabel': 'Idiomas',
        'about.factLangValue': 'Português · Inglês',
        'about.factOutLabel': 'Fora do código',
        'about.factOutValue': 'Mar, leitura, treino',

        'journey.title': 'Minha Jornada',
        'journey.current': 'Atual',
        'journey.now': 'AGORA',
        'journey.kindEdu': 'FORMAÇÃO',
        'journey.kindWork': 'EXPERIÊNCIA',
        'journey.filterAria': 'Filtrar jornada',
        'journey.filterAll': 'Tudo',
        'journey.filterEdu': 'Formação',
        'journey.filterWork': 'Experiência',
        'journey.details': 'DETALHES +',
        'journey.collapse': 'RECOLHER −',
        'journey.months': 'MESES',

        'journey.etepRole': 'Ensino Médio Técnico em Mecatrônica',
        'journey.etepText': 'Primeiros passos na programação, com base sólida em software, eletrônica e mecânica. Programação embarcada com PIC e Arduino, e participação no time de robótica FIRST.',

        'journey.unipRole': 'Ciência da Computação',
        'journey.unipText': 'Formação sólida em desenvolvimento de software e visão de produto. TCC: plataforma de incentivo ao ensino com gamificação.',

        'journey.senaiRole': 'Desenvolvedor Full Stack',
        'journey.senaiText': 'Atuei em múltiplos projetos como backend principal, majoritariamente em Django, com passagens por FastAPI (APIs para serviços de IA) e React Native (adaptação de plataforma web para mobile). Docker em todos.',
        'journey.senaiHighlight': '<strong>Projeto destaque: comunicação assíncrona entre APIs.</strong> Assumi o backend na metade do prazo, com nada feito, e entreguei em 6 meses um escopo originalmente estimado em 12. Além do prazo, fechei o projeto com mais funcionalidades do que o contrato pedia. Arquitetura com comunicação assíncrona entre 2 APIs e frontend, e documentação completa para que o cliente evoluísse a plataforma de forma autônoma.',
        'journey.senaiList': '<li><strong>Upload tipo Drive</strong> Arquitetura com MinIO e URLs assinadas para tirar o tráfego de arquivos pesados do backend, permitindo upload direto entre cliente e storage.</li><li><strong>App em React Native</strong> Porte de uma plataforma web existente para Android e iOS.</li><li><strong>APIs de IA em FastAPI</strong> Serviços de inferência integrados aos backends Django.</li>',

        'journey.kaffaRole': 'Full Stack no time de produto',
        'journey.kaffaText1': 'Atuo de ponta a ponta no produto: frontend web em React, desktop em SWT, backend no framework proprietário da empresa e camada Android, com passagens por mapas e GIS.',
        'journey.kaffaText2': '<strong>Sou a referência técnica do time em Android.</strong> Atuo numa ponte proprietária que traduz SWT (desktop) para componentes nativos Android, onde identifiquei e corrigi falhas de renderização sob diferentes escalas de DPI, como deformação de campos e botões ao aplicar zoom no tablet.',
        'journey.kaffaText3': 'Reconstruí o módulo de import e export de arquivos DWG no canvas gráfico do produto, lidando com a conversão entre SVG e DWG em ambos os sentidos.',

        'projects.title': 'Projetos',
        'projects.sonarEyebrow': 'SONAR · 4 CONTATOS',
        'projects.sonarAuto': 'VARREDURA AUTOMÁTICA',
        'projects.sonarManual': 'MANUAL · RETOMAR VARREDURA',
        'projects.contact': 'CONTATO',
        'projects.bearing': 'RUMO',
        'projects.whatchuType': 'Full-Stack',
        'projects.whatchuAlt': 'Tela inicial do Whatchu mostrando o sorteio de um título',
        'projects.whatchuDesc': 'Plataforma multi-usuário para decidir o que assistir hoje. Cada usuário monta sua watchlist com busca integrada ao TMDB, organiza por prioridade, e o sistema faz um sorteio com peso. Inclui autenticação JWT com refresh token, onboarding guiado, upload de avatar via MinIO e testes automatizados.',
        'projects.citriaType': 'Full-Stack · Mobile',
        'projects.citriaAlt': 'Landing do Citria com o app do paciente mostrando a refeição do momento',
        'projects.citriaDesc': 'App de acompanhamento nutricional que conecta pacientes e nutricionistas. O paciente abre o app e vê a refeição da hora, registra com um toque e faz um check-in diário; a nutricionista monta dietas com a tabela TACO, acompanha evolução e agenda pelo painel web ou pelo app. Código compartilhado entre web e mobile, notificações push e testes e2e com Testcontainers.',
        'projects.insideType': 'Full-Stack',
        'projects.insideAlt': 'Tela de login do Inside, ferramenta interna da Nomai Code',
        'projects.insideDesc': 'Ferramenta interna do estúdio Nomai Code para gerir leads, propostas, projetos e clientes. A API precifica propostas versionadas, converte o aceite em projeto com marcos e envia e-mails por outbox. O acesso é restrito, então o site mostra só a tela de login.',
        'projects.irisType': 'Front-End',
        'projects.irisAlt': 'Íris testando uma paleta de cores sobre o mockup de um site',
        'projects.irisDesc': 'Laboratório de cores da Nomai Code: o cliente sobe o próprio logo e testa paletas em um mockup real de site, com contraste WCAG calculado enquanto arrasta. Um pipeline classifica e recolore o SVG no navegador, e o arquivo fica no navegador, a menos que o cliente escolha enviá-lo ao estúdio.',
        'projects.visit': 'Visitar site',
        'projects.github': 'GitHub',
        'projects.footer': 'Mais experimentos e estudos no <a href="https://github.com/DellPianissola" target="_blank" rel="noopener">GitHub</a>.',

        'contact.title': 'Entre em contato',
        'contact.emailLabel': 'Email',
        'contact.emailCopied': 'Copiado!',
        'contact.emailAria': 'Copiar e-mail',
        'contact.nameLabel': 'Seu Nome',
        'contact.emailFieldLabel': 'Seu E-mail',
        'contact.msgLabel': 'Sua Mensagem',
        'contact.namePlaceholder': 'Seu Nome',
        'contact.emailPlaceholder': 'Seu E-mail',
        'contact.msgPlaceholder': 'Sua Mensagem',
        'contact.send': 'Enviar',
        'contact.sending': 'Enviando...',
        'contact.success': 'Mensagem enviada! Entrarei em contato em breve.',
        'contact.error': 'Erro ao enviar. Tente novamente ou use o e-mail direto.',
        'contact.recaptchaFail': 'Falha na verificação anti-spam. Tente novamente.',
        'contact.recaptchaNotLoaded': 'Verificação anti-spam não carregou. Recarregue a página.',
        'contact.mailtoOpen': 'Abrir no e-mail',
        'contact.mailtoSubject': 'Contato do portfólio — ',
        'contact.mailtoNoName': 'sem nome',
        'contact.recaptchaNotice': 'Protegido por reCAPTCHA — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacidade</a> e <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Termos</a> do Google.',

        'footer.copyright': '© 2026 Gabriel Pianissola. Todos os direitos reservados.',
    },

    en: {
        'meta.title': 'Gabriel Pianissola',
        'meta.description': 'Portfolio of Gabriel Pianissola, Full-Stack Developer specializing in JavaScript, TypeScript, Python, Django, React, React Native, Node.js, Kotlin, Java and more.',
        'meta.ogTitle': 'Gabriel Pianissola — Full-Stack Developer',
        'meta.ogDescription': 'Portfolio of Gabriel Pianissola. JavaScript, TypeScript, Python, Django, React, React Native, Kotlin and more.',
        'meta.ogImageAlt': 'Portfolio of Gabriel Pianissola, Full-Stack Developer',
        'meta.ogLocale': 'en_US',

        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.journey': 'Journey',
        'nav.tech': 'Tech',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'nav.logoAria': 'Go to top',
        'nav.themeGroupAria': 'Sky time',
        'nav.themeAuto': 'Auto',
        'nav.themeDay': 'Day',
        'nav.themeNight': 'Night',
        'nav.menuAria': 'Open menu',
        'nav.langGroupAria': 'Language switcher',
        'nav.langPtAria': 'Mudar para português',
        'nav.langEnAria': 'Switch to English',

        'hero.greeting': "Hi, I'm",
        'hero.role': 'Full-Stack Developer',
        'hero.ctaProjects': 'See Projects',
        'hero.ctaContact': 'Get in touch',
        'hero.scrollAria': 'Scroll down',
        'hero.profileAlt': 'Gabriel Pianissola smiling at the beach',

        'about.title': 'About me',
        'about.intro': 'I started programming microcontrollers on my high school robotics team. Today I work full-stack across web, mobile and desktop, focused on hard technical problems and architecture decisions that age well.',
        'about.card1Title': 'Technical range',
        'about.card1Text': 'Web, mobile and desktop. Frontend, backend and infra. I work at the layer where the problem actually lives.',
        'about.card2Title': 'Decisions that scale',
        'about.card2Text': 'Architectures built to grow: async communication between APIs and direct client-to-storage uploads with signed URLs.',
        'about.card3Title': 'I learn by shipping',
        'about.card3Text': 'Every project brought a new stack I had to master to ship. That was the case with FastAPI, MinIO and native Android.',
        'about.factLangLabel': 'Languages',
        'about.factLangValue': 'Portuguese · English',
        'about.factOutLabel': 'Outside of code',
        'about.factOutValue': 'Ocean, reading, training',

        'journey.title': 'My Journey',
        'journey.current': 'Now',
        'journey.now': 'NOW',
        'journey.kindEdu': 'EDUCATION',
        'journey.kindWork': 'EXPERIENCE',
        'journey.filterAria': 'Filter journey',
        'journey.filterAll': 'All',
        'journey.filterEdu': 'Education',
        'journey.filterWork': 'Experience',
        'journey.details': 'DETAILS +',
        'journey.collapse': 'COLLAPSE −',
        'journey.months': 'MONTHS',

        'journey.etepRole': 'Technical High School in Mechatronics',
        'journey.etepText': 'First steps in programming, with a solid foundation in software, electronics and mechanics. Embedded programming with PIC and Arduino, and participation in the FIRST robotics team.',

        'journey.unipRole': 'Computer Science',
        'journey.unipText': 'Solid background in software development and product thinking. Capstone project: a gamified platform to encourage learning.',

        'journey.senaiRole': 'Full Stack Developer',
        'journey.senaiText': 'Worked on multiple projects as the lead backend engineer, mostly in Django, with stints in FastAPI (APIs for AI services) and React Native (porting a web platform to mobile). Docker across the board.',
        'journey.senaiHighlight': '<strong>Featured project: async communication between APIs.</strong> I took over the backend halfway through the deadline, with nothing built, and delivered in 6 months a scope originally estimated at 12. Beyond the deadline, I closed the project with more features than the contract asked for. The architecture used async communication between 2 APIs and the frontend, with complete documentation so the client could evolve the platform on their own.',
        'journey.senaiList': '<li><strong>Drive-like uploads</strong> Architecture with MinIO and signed URLs to move heavy file traffic off the backend, enabling direct client-to-storage uploads.</li><li><strong>React Native app</strong> Porting an existing web platform to Android and iOS.</li><li><strong>AI APIs in FastAPI</strong> Inference services integrated with Django backends.</li>',

        'journey.kaffaRole': 'Full Stack on the product team',
        'journey.kaffaText1': 'I work end-to-end on the product: web frontend in React, desktop in SWT, backend on the company\'s proprietary framework and the Android layer, with work on maps and GIS.',
        'journey.kaffaText2': "<strong>I'm the team's technical reference for Android.</strong> I work on a proprietary bridge that translates SWT (desktop) into native Android components, where I identified and fixed rendering bugs under different DPI scales — like field and button distortion when zooming on a tablet.",
        'journey.kaffaText3': 'Rebuilt the import and export module for DWG files in the product\'s graphical canvas, handling SVG-to-DWG conversion in both directions.',

        'projects.title': 'Projects',
        'projects.sonarEyebrow': 'SONAR · 4 CONTACTS',
        'projects.sonarAuto': 'AUTO SWEEP',
        'projects.sonarManual': 'MANUAL · RESUME SWEEP',
        'projects.contact': 'CONTACT',
        'projects.bearing': 'BEARING',
        'projects.whatchuType': 'Full-Stack',
        'projects.whatchuAlt': 'Whatchu home screen showing a weighted random pick',
        'projects.whatchuDesc': 'Multi-user platform to decide what to watch tonight. Each user builds their watchlist with TMDB-integrated search, sorts by priority, and the system runs a weighted random pick. Includes JWT auth with refresh tokens, guided onboarding, avatar upload via MinIO and automated tests.',
        'projects.citriaType': 'Full-Stack · Mobile',
        'projects.citriaAlt': 'Citria landing page with the patient app showing the current meal',
        'projects.citriaDesc': 'Nutrition follow-up app connecting patients and nutritionists. The patient opens the app to see the meal of the moment, logs it in one tap and does a daily check-in; the nutritionist builds diets from the TACO food table, tracks progress and manages appointments on the web dashboard or in the app. Code shared between web and mobile, push notifications and e2e tests with Testcontainers.',
        'projects.insideType': 'Full-Stack',
        'projects.insideAlt': 'Login screen of Inside, the Nomai Code internal tool',
        'projects.insideDesc': 'Internal tool of the Nomai Code studio to manage leads, proposals, projects and clients. The API prices versioned proposals, converts an acceptance into a project with milestones and sends emails through an outbox. Access is restricted, so the site only shows the login screen.',
        'projects.irisType': 'Front-End',
        'projects.irisAlt': 'Íris testing a colour palette on a website mockup',
        'projects.irisDesc': 'Colour lab by Nomai Code: customers upload their own logo and try palettes on a real website mockup, with WCAG contrast checked as they drag. A pipeline classifies and recolours the SVG in the browser, and the file stays in the browser unless the customer chooses to send it to the studio.',
        'projects.visit': 'Visit site',
        'projects.github': 'GitHub',
        'projects.footer': 'More experiments and studies on <a href="https://github.com/DellPianissola" target="_blank" rel="noopener">GitHub</a>.',

        'contact.title': 'Get in touch',
        'contact.emailLabel': 'Email',
        'contact.emailCopied': 'Copied!',
        'contact.emailAria': 'Copy email',
        'contact.nameLabel': 'Your Name',
        'contact.emailFieldLabel': 'Your Email',
        'contact.msgLabel': 'Your Message',
        'contact.namePlaceholder': 'Your Name',
        'contact.emailPlaceholder': 'Your Email',
        'contact.msgPlaceholder': 'Your Message',
        'contact.send': 'Send',
        'contact.sending': 'Sending...',
        'contact.success': "Message sent! I'll get back to you soon.",
        'contact.error': 'Failed to send. Try again or use the email directly.',
        'contact.recaptchaFail': 'Anti-spam check failed. Try again.',
        'contact.recaptchaNotLoaded': "Anti-spam check didn't load. Please reload the page.",
        'contact.mailtoOpen': 'Open in email',
        'contact.mailtoSubject': 'Portfolio contact — ',
        'contact.mailtoNoName': 'no name',
        'contact.recaptchaNotice': 'Protected by reCAPTCHA — Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms</a>.',

        'footer.copyright': '© 2026 Gabriel Pianissola. All rights reserved.',
    },
};

let currentLang = DEFAULT;

function detectLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
}

export function getLang() {
    return currentLang;
}

export function t(key) {
    return dict[currentLang]?.[key] ?? dict[DEFAULT][key] ?? key;
}

function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    root.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });

    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
        el.dataset.i18nAttr.split(';').forEach(pair => {
            const [attr, key] = pair.split(':').map(s => s.trim());
            if (attr && key) el.setAttribute(attr, t(key));
        });
    });

    document.title = t('meta.title');
    setMeta('name', 'description', t('meta.description'));
    setMeta('property', 'og:title', t('meta.ogTitle'));
    setMeta('property', 'og:description', t('meta.ogDescription'));
    setMeta('property', 'og:image:alt', t('meta.ogImageAlt'));
    setMeta('property', 'og:locale', t('meta.ogLocale'));
    setMeta('name', 'twitter:title', t('meta.ogTitle'));
    setMeta('name', 'twitter:description', t('meta.ogDescription'));

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
}

function setMeta(attr, value, content) {
    const el = document.querySelector(`meta[${attr}="${value}"]`);
    if (el) el.setAttribute('content', content);
}

export function setLang(lang) {
    if (!SUPPORTED.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function updateSwitchActive() {
    document.querySelectorAll('#lang-switch .lang-opt').forEach(btn => {
        const isActive = btn.dataset.lang === currentLang;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

export function initI18n() {
    currentLang = detectLang();
    applyTranslations();
    updateSwitchActive();

    document.querySelectorAll('#lang-switch .lang-opt').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    document.addEventListener('langchange', updateSwitchActive);
}
