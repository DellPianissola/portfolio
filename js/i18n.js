const STORAGE_KEY = 'lang';
const SUPPORTED = ['pt', 'en'];
const DEFAULT = 'pt';

const dict = {
    pt: {
        'meta.title': 'Gabriel Pianissola',
        'meta.description': 'Gabriel Pianissola, engenheiro de software full stack. Projetos, decisões técnicas e trajetória em web, mobile e desktop.',
        'meta.ogTitle': 'Gabriel Pianissola, engenheiro de software',
        'meta.ogDescription': 'Sistemas que continuam de pé depois que o prazo passa. Projetos, decisões técnicas e trajetória.',
        'meta.ogImageAlt': 'Gabriel Pianissola, engenheiro de software',
        'meta.ogLocale': 'pt_BR',

        'nav.mainAria': 'Navegação principal',
        'nav.about': 'Sobre',
        'nav.how': 'Como trabalho',
        'nav.projects': 'Projetos',
        'nav.experience': 'Experiência',
        'nav.contact': 'Contato',
        'nav.logoAria': 'Ir para o início',
        'nav.menuAria': 'Abrir menu',
        'nav.langGroupAria': 'Seletor de idioma',
        'nav.langPtAria': 'Mudar para português',
        'nav.langEnAria': 'Switch to English',
        'nav.hintA': 'Role para baixo',
        'nav.hintB': 'a página anda para o lado',

        'hero.role': 'Engenheiro de software',
        'hero.line': 'Desenho sistemas que continuam de pé depois que o prazo passa.',
        'hero.ctaProjects': 'Ver projetos',
        'hero.ctaContact': 'Falar comigo',
        'hero.profileAlt': 'Gabriel Pianissola de camisa azul-marinho, com a mão no queixo',

        'about.title': 'Sobre mim',
        'about.photoAlt': 'Gabriel Pianissola sorrindo, de braços cruzados',
        'about.text1': 'Comecei programando PIC e Arduino no time de robótica do ensino técnico. Hoje atuo de ponta a ponta em web, mobile e desktop, na camada onde o problema está.',
        'about.text2': 'Escolho cada solução pelo que ela vai custar depois, e escrevo a decisão para quem vier em seguida.',
        'about.stat1Value': '6 de 12',
        'about.stat1Label': 'meses para entregar o escopo que assumi no SENAI',
        'about.stat2Label': 'início no técnico em mecatrônica, com robótica',
        'about.stat3Value': 'PT e EN',
        'about.stat3Label': 'português e inglês no dia a dia',

        'how.title': 'Como trabalho',
        'how.intro': 'As áreas em que atuo, de ponta a ponta, e o jeito que gosto de trabalhar.',
        'how.file': 'como-trabalho.md',
        'how.replay': 'Reescrever',
        'how.m0': '# como-trabalho.md',
        'how.m1': '## Decisão escrita',
        'how.m2': 'Toda escolha cara ganha um registro: contexto, opções, motivo.',
        'how.m3': '## Ponta a ponta',
        'how.m4': 'Dono do problema inteiro, do banco à interface.',
        'how.m5': '## Entregas pequenas',
        'how.m6': 'PRs curtos, deploy frequente, feedback cedo.',
        'how.m7': '## Teste onde dói',
        'how.m8': 'E2e com banco real nos fluxos críticos.',
        'how.m9': '## Simples primeiro',
        'how.m10': 'Complexidade só quando o problema pede.',
        'how.toolAsync': 'Assíncrono',
        'how.toolSigned': 'URLs assinadas',
        'how.toolBridge': 'Ponte Android',
        'how.skill1Title': 'Full stack web',
        'how.skill2Title': 'Arquitetura de sistemas',
        'how.skill3Title': 'Mobile',
        'how.skill4Title': 'Desktop',
        'how.skill5Title': 'Dados e storage',
        'how.skill6Title': 'Infra e deploy',
        'how.skill7Title': 'Testes',
        'how.skill8Title': 'Mapas e formatos gráficos',

        'projects.title': 'Projetos',
        'projects.intro': 'Construídos de ponta a ponta, do banco à interface.',
        'projects.open': 'Abrir site ↗',
        'projects.visit': 'Ver site ↗',
        'projects.code': 'Código',
        'projects.prevAria': 'Projeto anterior',
        'projects.nextAria': 'Próximo projeto',
        'projects.footer': 'Mais experimentos e estudos no <a href="https://github.com/DellPianissola" target="_blank" rel="noopener">GitHub</a>.',
        'projects.whatchuType': 'Full stack',
        'projects.whatchuAlt': 'Tela inicial do Whatchu mostrando o sorteio de um título',
        'projects.whatchuDesc': 'Decide o que assistir com um sorteio ponderado pela prioridade de cada título, com busca integrada ao TMDB. JWT com refresh token, avatar via MinIO e testes automatizados.',
        'projects.citriaType': 'Full stack e mobile',
        'projects.citriaAlt': 'Landing do Citria com o app do paciente mostrando a refeição do momento',
        'projects.citriaDesc': 'Liga paciente e nutricionista: refeição da hora, check-in diário, dietas com a tabela TACO e agenda. Código compartilhado entre web e mobile, notificações push e testes e2e com Testcontainers.',
        'projects.insideType': 'Full stack',
        'projects.insideAlt': 'Tela de login do Inside',
        'projects.insideDesc': 'Gestão de leads, propostas, projetos e clientes. A API precifica propostas versionadas, converte o aceite em projeto com marcos e envia e-mails por outbox. O acesso é restrito, então o site mostra só a tela de login.',
        'projects.irisType': 'Front-end',
        'projects.irisAlt': 'Íris testando uma paleta de cores sobre o mockup de um site',
        'projects.irisDesc': 'Laboratório de cores: o cliente sobe o próprio logo e testa paletas num mockup real de site, com contraste WCAG calculado enquanto arrasta.',

        'experience.title': 'Experiência',
        'experience.intro': 'Da robótica ao time de produto. Clique em cada etapa para ver os bastidores.',
        'experience.open': 'Ver bastidores',
        'experience.closePanel': 'Fechar',
        'experience.behind': 'Bastidores',
        'experience.senaiMetric': 'meses para entregar o escopo assumido',
        'experience.tagGamification': 'Gamificação',
        'experience.kaffaDecisions': '<li><strong>Referência técnica em Android</strong><span>Responsável pela camada Android do produto dentro do time.</span></li><li><strong>Correção na ponte, não em cada tela</strong><span>Falhas de renderização sob escalas de DPI, como campos deformados com zoom no tablet, resolvidas na ponte SWT para Android.</span></li><li><strong>Conversão DWG e SVG</strong><span>Módulo de import e export do canvas gráfico reconstruído, nos dois sentidos.</span></li>',
        'experience.senaiDecisions': '<li><strong>12 meses de escopo em 6</strong><span>Backend assumido na metade do prazo, com nada feito, e projeto fechado com mais funcionalidades do que o contrato pedia.</span></li><li><strong>Comunicação assíncrona</strong><span>Duas APIs e o frontend sem esperar uns pelos outros, com documentação para o cliente evoluir sozinho.</span></li><li><strong>Upload direto com URLs assinadas</strong><span>Arquivos pesados fora do backend, com MinIO e envio direto entre cliente e storage.</span></li><li><strong>Inferência em FastAPI</strong><span>Serviços de IA integrados aos backends Django.</span></li>',
        'experience.unipDecisions': '<li><strong>TCC com gamificação</strong><span>Plataforma de incentivo ao ensino.</span></li>',
        'experience.etepDecisions': '<li><strong>Robótica FIRST</strong><span>Participação no time, com base em software, eletrônica e mecânica.</span></li><li><strong>Programação embarcada</strong><span>Primeiros projetos com PIC e Arduino.</span></li>',
        'experience.kaffaDate': '2025, atual',
        'experience.kaffaRole': 'Full stack no time de produto',
        'experience.kaffaText': 'Ponta a ponta no produto: React na web, SWT no desktop, Android, backend proprietário, mapas e GIS.',
        'experience.senaiName': 'Instituto SENAI de Inovação',
        'experience.senaiDate': '2021 a 2025',
        'experience.senaiRole': 'Desenvolvedor full stack',
        'experience.senaiText': 'Backend principal em múltiplos projetos, com Django, FastAPI, React Native e Docker.',
        'experience.unipDate': '2020 a 2023',
        'experience.unipRole': 'Ciência da Computação',
        'experience.unipText': 'TCC: plataforma de incentivo ao ensino com gamificação.',
        'experience.etepDate': '2016 a 2018',
        'experience.etepRole': 'Técnico em Mecatrônica',
        'experience.etepText': 'Programação embarcada com PIC e Arduino e time de robótica FIRST.',

        'contact.title': 'Vamos conversar',
        'contact.line': 'Tem uma vaga ou um sistema para construir? Puxa assunto por aqui.',
        'contact.emailTerm': 'E-mail',
        'contact.emailLabel': 'dell.pianissola@outlook.com',
        'contact.emailCopied': 'Copiado!',
        'contact.emailAria': 'Copiar e-mail',
        'contact.chatStatus': 'Responde em até dois dias úteis',
        'contact.chatStep': '{n} de 3',
        'contact.chatHello': 'Oi! Aqui é o Gabriel. Como posso te chamar?',
        'contact.chatAskEmail': 'Prazer, {name}! Qual e-mail eu uso para te responder?',
        'contact.chatAskMessage': 'Anotado. E o que você tem em mente? Uma vaga, um projeto, uma ideia…',
        'contact.chatPh0': 'Seu nome',
        'contact.chatPh1': 'seu@email.com',
        'contact.chatPh2': 'Sua mensagem',
        'contact.chatSend': 'Enviar',
        'contact.chatDone': 'Tudo certo por aqui.',
        'contact.chatRestart': 'Recomeçar conversa',
        'contact.chatMailto': 'Abri seu app de e-mail com a mensagem pronta. É só enviar por lá.',
        'contact.quick1': 'Tenho uma vaga',
        'contact.quick2': 'Quero tirar um projeto do papel',
        'contact.quick3': 'Só passei para dar oi',
        'contact.success': 'Mensagem enviada. Costumo responder em até dois dias úteis. Até já!',
        'contact.error': 'Erro ao enviar. Tente novamente ou use o e-mail direto.',
        'contact.recaptchaFail': 'Falha na verificação anti-spam. Tente novamente.',
        'contact.recaptchaNotLoaded': 'Verificação anti-spam não carregou. Recarregue a página.',
        'contact.mailtoSubject': 'Contato do portfólio: ',
        'contact.mailtoNoName': 'sem nome',
        'contact.recaptchaNotice': 'Protegido por reCAPTCHA: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacidade</a> e <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Termos</a> do Google.',

        'footer.copyright': '© 2026 Gabriel Pianissola',
        'footer.top': 'Voltar ao topo',
    },

    en: {
        'meta.title': 'Gabriel Pianissola',
        'meta.description': 'Gabriel Pianissola, full stack software engineer. Projects, technical decisions and background across web, mobile and desktop.',
        'meta.ogTitle': 'Gabriel Pianissola, software engineer',
        'meta.ogDescription': 'Systems that keep standing after the deadline has passed. Projects, technical decisions and background.',
        'meta.ogImageAlt': 'Gabriel Pianissola, software engineer',
        'meta.ogLocale': 'en_US',

        'nav.mainAria': 'Main navigation',
        'nav.about': 'About',
        'nav.how': 'How I work',
        'nav.projects': 'Projects',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'nav.logoAria': 'Go to top',
        'nav.menuAria': 'Open menu',
        'nav.langGroupAria': 'Language switcher',
        'nav.langPtAria': 'Mudar para português',
        'nav.langEnAria': 'Switch to English',
        'nav.hintA': 'Scroll down',
        'nav.hintB': 'the page moves sideways',

        'hero.role': 'Software engineer',
        'hero.line': 'I design systems that keep standing after the deadline has passed.',
        'hero.ctaProjects': 'See projects',
        'hero.ctaContact': 'Get in touch',
        'hero.profileAlt': 'Gabriel Pianissola in a navy shirt, hand on his chin',

        'about.title': 'About me',
        'about.photoAlt': 'Gabriel Pianissola smiling, arms crossed',
        'about.text1': 'I started programming PIC and Arduino on my technical school robotics team. Today I work end to end across web, mobile and desktop, at the layer where the problem actually lives.',
        'about.text2': 'I choose each solution by what it will cost later, and I write the decision down for whoever comes next.',
        'about.stat1Value': '6 of 12',
        'about.stat1Label': 'months to deliver the scope I took over at SENAI',
        'about.stat2Label': 'started technical school in mechatronics, with robotics',
        'about.stat3Value': 'PT and EN',
        'about.stat3Label': 'Portuguese and English day to day',

        'how.title': 'How I work',
        'how.intro': 'The areas I work in, end to end, and how I like to work.',
        'how.file': 'how-i-work.md',
        'how.replay': 'Rewrite',
        'how.m0': '# how-i-work.md',
        'how.m1': '## Written decisions',
        'how.m2': 'Every expensive choice gets a record: context, options, reason.',
        'how.m3': '## End to end',
        'how.m4': 'Owner of the whole problem, from database to interface.',
        'how.m5': '## Small deliveries',
        'how.m6': 'Short PRs, frequent deploys, early feedback.',
        'how.m7': '## Test where it hurts',
        'how.m8': 'E2e with a real database on critical flows.',
        'how.m9': '## Simple first',
        'how.m10': 'Complexity only when the problem asks for it.',
        'how.toolAsync': 'Async',
        'how.toolSigned': 'Signed URLs',
        'how.toolBridge': 'Android bridge',
        'how.skill1Title': 'Full stack web',
        'how.skill2Title': 'Systems architecture',
        'how.skill3Title': 'Mobile',
        'how.skill4Title': 'Desktop',
        'how.skill5Title': 'Data and storage',
        'how.skill6Title': 'Infra and deploy',
        'how.skill7Title': 'Testing',
        'how.skill8Title': 'Maps and graphic formats',

        'projects.title': 'Projects',
        'projects.intro': 'Built end to end, from the database to the interface.',
        'projects.open': 'Open site ↗',
        'projects.visit': 'Visit site ↗',
        'projects.code': 'Code',
        'projects.prevAria': 'Previous project',
        'projects.nextAria': 'Next project',
        'projects.footer': 'More experiments and studies on <a href="https://github.com/DellPianissola" target="_blank" rel="noopener">GitHub</a>.',
        'projects.whatchuType': 'Full stack',
        'projects.whatchuAlt': 'Whatchu home screen showing a weighted random pick',
        'projects.whatchuDesc': 'Decides what to watch with a random pick weighted by each title\'s priority, with TMDB-integrated search. JWT with refresh tokens, avatars via MinIO and automated tests.',
        'projects.citriaType': 'Full stack and mobile',
        'projects.citriaAlt': 'Citria landing page with the patient app showing the current meal',
        'projects.citriaDesc': 'Connects patients and nutritionists: meal of the moment, daily check-in, diets from the TACO food table and scheduling. Code shared between web and mobile, push notifications and e2e tests with Testcontainers.',
        'projects.insideType': 'Full stack',
        'projects.insideAlt': 'Inside login screen',
        'projects.insideDesc': 'Manages leads, proposals, projects and clients. The API prices versioned proposals, turns an acceptance into a project with milestones and sends emails through an outbox. Access is restricted, so the site only shows the login screen.',
        'projects.irisType': 'Front-end',
        'projects.irisAlt': 'Íris testing a colour palette on a website mockup',
        'projects.irisDesc': 'Colour lab: customers upload their own logo and try palettes on a real website mockup, with WCAG contrast checked as they drag.',

        'experience.title': 'Experience',
        'experience.intro': 'From robotics to the product team. Click each stage to go behind the scenes.',
        'experience.open': 'Behind the scenes',
        'experience.closePanel': 'Close',
        'experience.behind': 'Behind the scenes',
        'experience.senaiMetric': 'months to deliver the scope I took over',
        'experience.tagGamification': 'Gamification',
        'experience.kaffaDecisions': '<li><strong>Technical reference for Android</strong><span>Responsible for the product\'s Android layer within the team.</span></li><li><strong>Fixing the bridge, not every screen</strong><span>Rendering bugs under DPI scaling, like distorted fields when zooming on a tablet, solved in the SWT to Android bridge.</span></li><li><strong>DWG and SVG conversion</strong><span>Rebuilt the graphics canvas import and export module, in both directions.</span></li>',
        'experience.senaiDecisions': '<li><strong>12 months of scope in 6</strong><span>Took over a backend halfway through the deadline, with nothing built, and closed the project with more features than the contract asked for.</span></li><li><strong>Async communication</strong><span>Two APIs and the frontend not waiting on each other, documented so the client could evolve it alone.</span></li><li><strong>Direct uploads with signed URLs</strong><span>Heavy files off the backend, with MinIO and direct client-to-storage uploads.</span></li><li><strong>Inference in FastAPI</strong><span>AI services integrated with Django backends.</span></li>',
        'experience.unipDecisions': '<li><strong>Gamified capstone</strong><span>A platform to encourage learning.</span></li>',
        'experience.etepDecisions': '<li><strong>FIRST robotics</strong><span>Part of the team, with a foundation in software, electronics and mechanics.</span></li><li><strong>Embedded programming</strong><span>First projects with PIC and Arduino.</span></li>',
        'experience.kaffaDate': '2025, present',
        'experience.kaffaRole': 'Full stack on the product team',
        'experience.kaffaText': 'End to end on the product: React on the web, SWT on desktop, Android, proprietary backend, maps and GIS.',
        'experience.senaiName': 'SENAI Innovation Institute',
        'experience.senaiDate': '2021 to 2025',
        'experience.senaiRole': 'Full stack developer',
        'experience.senaiText': 'Lead backend engineer on multiple projects, with Django, FastAPI, React Native and Docker.',
        'experience.unipDate': '2020 to 2023',
        'experience.unipRole': 'Computer Science',
        'experience.unipText': 'Capstone project: a gamified platform to encourage learning.',
        'experience.etepDate': '2016 to 2018',
        'experience.etepRole': 'Technical degree in Mechatronics',
        'experience.etepText': 'Embedded programming with PIC and Arduino, and the FIRST robotics team.',

        'contact.title': 'Let\'s talk',
        'contact.line': 'Got a role or a system to build? Start the conversation here.',
        'contact.emailTerm': 'Email',
        'contact.emailLabel': 'dell.pianissola@outlook.com',
        'contact.emailCopied': 'Copied!',
        'contact.emailAria': 'Copy email',
        'contact.chatStatus': 'Replies within two business days',
        'contact.chatStep': '{n} of 3',
        'contact.chatHello': 'Hi! Gabriel here. What should I call you?',
        'contact.chatAskEmail': 'Nice to meet you, {name}! Which email should I reply to?',
        'contact.chatAskMessage': 'Got it. And what do you have in mind? A role, a project, an idea…',
        'contact.chatPh0': 'Your name',
        'contact.chatPh1': 'you@email.com',
        'contact.chatPh2': 'Your message',
        'contact.chatSend': 'Send',
        'contact.chatDone': 'All set here.',
        'contact.chatRestart': 'Start over',
        'contact.chatMailto': 'I opened your email app with the message ready. Just send it from there.',
        'contact.quick1': 'I have a role',
        'contact.quick2': 'I want to get a project off the ground',
        'contact.quick3': 'Just stopping by to say hi',
        'contact.success': 'Message sent. I usually reply within two business days. Talk soon!',
        'contact.error': 'Failed to send. Try again or use the email directly.',
        'contact.recaptchaFail': 'Anti-spam check failed. Try again.',
        'contact.recaptchaNotLoaded': "Anti-spam check didn't load. Please reload the page.",
        'contact.mailtoSubject': 'Portfolio contact: ',
        'contact.mailtoNoName': 'no name',
        'contact.recaptchaNotice': 'Protected by reCAPTCHA: Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms</a>.',

        'footer.copyright': '© 2026 Gabriel Pianissola',
        'footer.top': 'Back to top',
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
