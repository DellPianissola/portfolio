const STORAGE_KEY = 'lang';
const SUPPORTED = ['pt', 'en'];
const DEFAULT = 'pt';

const dict = {
    pt: {
        'meta.title': 'Gabriel Pianissola',
        'meta.description': 'Gabriel Pianissola, engenheiro de software full stack. Projetos, decisões técnicas e trajetória em web e mobile.',
        'meta.ogTitle': 'Gabriel Pianissola, engenheiro de software',
        'meta.ogDescription': 'Full stack com foco em arquitetura de software. Projetos, decisões técnicas e trajetória.',
        'meta.ogImageAlt': 'Gabriel Pianissola, engenheiro de software',
        'meta.ogLocale': 'pt_BR',

        'nav.mainAria': 'Navegação principal',
        'nav.skip': 'Pular para o conteúdo',
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
        'nav.hint': 'Role para ver mais',

        'hero.role1': 'Cientista da computação',
        'hero.role2': 'Arquiteto de soluções',
        'hero.role3': 'Full stack developer',
        'hero.role4': 'Técnico mecatrônico',
        'hero.role5': 'Apaixonado',
        'hero.ctaProjects': 'Ver projetos',
        'hero.ctaContact': 'Falar comigo',
        'hero.profileAlt': 'Gabriel Pianissola de camisa azul-marinho, com a mão no queixo',

        'about.title': 'Sobre mim',
        'about.photoAlt': 'Gabriel Pianissola sorrindo, de braços cruzados',
        'about.text1': 'Sou desenvolvedor full stack com foco em arquitetura de software. Atuo de ponta a ponta em projetos web e mobile.',
        'about.text2': 'Sempre avalio a melhor forma de atacar cada problema, com eficiência e no melhor tempo possível, construindo soluções duráveis e com muita atenção aos detalhes.',
        'about.stat1Value': '+5 anos',
        'about.stat1Label': 'construindo sistemas',
        'about.stat2Value': 'Versátil',
        'about.stat2Label': 'web, API, arquitetura e mais',
        'about.stat3Value': 'PT e EN',
        'about.stat3Label': 'português e inglês no dia a dia',

        'how.title': 'Como trabalho',
        'how.file': 'como-trabalho.md',
        'how.m1': '## Decisão registrada',
        'how.m2': 'Decisões importantes viram ADRs: o contexto, as alternativas e o custo de cada escolha.',
        'how.m3': '## Ponta a ponta',
        'how.m4': 'Assumo o problema inteiro, do banco ao deploy.',
        'how.m5': '## Entregas pequenas',
        'how.m6': 'PRs curtos, deploy automatizado e feedback cedo.',
        'how.m7': '## Testes na solução inteira',
        'how.m8': 'Crio testes unitários para cobertura de código e e2e para garantir as regras de negócio.',
        'how.m9': '## Simples primeiro',
        'how.m10': 'Complexidade entra só quando o problema pede.',
        'how.m11': '## Regra longe da tela',
        'how.m12': 'A regra de negócio fica no domínio, testável sem framework. A interface só mostra o resultado.',
        'how.toolSigned': 'URLs assinadas',
        'how.toolModular': 'Monolito modular',
        'how.toolServices': 'Microsserviços',
        'how.toolSemver': 'Versionamento semântico',
        'how.skill1Title': 'Full stack developer',
        'how.skill2Title': 'Arquitetura de software',
        'how.skill3Title': 'Mobile',
        'how.skill4Title': 'Dados e storage',
        'how.skill5Title': 'Infra e deploy',
        'how.skill6Title': 'Testes',
        'how.skill7Title': 'Mapas e formatos gráficos',
        'how.skill8Title': 'Git e CI/CD',

        'projects.title': 'Projetos',
        'projects.open': 'Abrir site ↗',
        'projects.visit': 'Ver site ↗',
        'projects.case': 'Detalhes →',
        'case.title': 'Detalhes do projeto',
        'case.back': 'Voltar aos projetos',
        'case.problem': 'A dor',
        'case.solution': 'Como resolvi',
        'case.architecture': 'Arquitetura',
        'case.decisions': 'Decisões técnicas',
        'case.stack': 'Por que essa stack',
        'case.layerFront': 'Front-end',
        'case.layerMobile': 'Mobile',
        'case.layerBack': 'Back-end',
        'case.layerData': 'Dados',
        'case.layerTests': 'Testes',
        'case.layerInfra': 'Infra',
        'projects.code': 'Código',
        'projects.footer': 'Mais experimentos e estudos no <a href="https://github.com/DellPianissola" target="_blank" rel="noopener">GitHub</a>.',
        'projects.whatchuType': 'Full stack',
        'projects.whatchuAlt': 'Tela inicial do Whatchu mostrando o sorteio de um título',
        'projects.whatchuDesc': 'Sorteia o que assistir, com peso pela prioridade de cada título e busca integrada ao TMDB. Autenticação JWT com refresh token, avatar via MinIO e testes automatizados.',
        'projects.citriaType': 'Full stack e mobile',
        'projects.citriaAlt': 'Landing do Citria com o app do paciente mostrando a refeição do momento',
        'projects.citriaDesc': 'Conecta paciente e nutricionista: refeição do momento, check-in diário, dietas com as tabelas TACO e IBGE e agenda. Código compartilhado entre web e mobile, notificações push e testes e2e com Testcontainers.',
        'projects.insideType': 'Full stack',
        'projects.insideAlt': 'Tela de login do Inside',
        'projects.insideDesc': 'Gestão de leads, propostas, projetos e clientes. A API precifica propostas versionadas, transforma o aceite em projeto com marcos e envia e-mails via outbox. O acesso é restrito, por isso só a tela de login é pública.',
        'projects.irisType': 'Front-end',
        'projects.irisAlt': 'Íris testando uma paleta de cores sobre o mockup de um site',
        'projects.irisDesc': 'Laboratório de cores: o cliente envia o próprio logo e testa paletas em um mockup real de site, com o contraste WCAG calculado em tempo real.',

        'experience.title': 'Experiência',
        'experience.open': 'Ver detalhes',
        'experience.closePanel': 'Fechar',
        'experience.behind': 'Detalhes',
        'experience.kaffaMetricValue': '16 GB → 1,5 GB',
        'experience.kaffaMetric': 'é o tamanho da base necessária para rodar o app, mais de 90% menor',
        'experience.senaiMetricValue': '2x mais rápido',
        'experience.senaiMetric': 'projeto de 1 ano entregue em 6 meses, além do escopo pedido',
        'experience.kaffaDecisions': '<li><strong>Base do app de 16 GB para 1,5 GB</strong><span>Criei a solução que reduziu em mais de 90% a base necessária para rodar o app.</span></li><li><strong>Import de DWG além do limite</strong><span>Otimizei a importação para o canvas SWT: com carregamento em pacotes, o sistema passou do limite máximo de tamanho do arquivo e ainda reduziu a latência ao mover o mapa.</span></li><li><strong>IA no fluxo com o QA</strong><span>Integrei IA ao desenvolvimento para gerar documentação que deixa mais prático testar bugs e histórias de usuário, diminuindo o gargalo de testes do time de QA.</span></li><li><strong>Referência técnica em Android</strong><span>Responsável pela camada Android do produto dentro do time.</span></li>',
        'experience.senaiDecisions': '<li><strong>Projeto de 1 ano entregue na metade do tempo</strong><span>Cheguei com 6 meses de projeto já corridos, assumi a arquitetura e o backend inteiro e entregamos mais do que havia sido pedido.</span></li><li><strong>Comunicação assíncrona com SSE</strong><span>Back e front em Django REST Framework conversando por Server-Sent Events, com documentação para o cliente evoluir sozinho.</span></li><li><strong>API do time de IA</strong><span>Assumi a API em FastAPI e integrei ao backend os algoritmos que calculam KPIs e outras inferências.</span></li><li><strong>Envio de grandes arquivos</strong><span>Arquitetura de upload direto com URLs assinadas: em um projeto com Google Cloud Storage, em outro com MinIO, de forma otimizada.</span></li>',
        'experience.unipDecisions': '<li><strong>TCC testado em sala de aula</strong><span>Meu TCC foi validado em uma escola particular de ensino fundamental I, com engajamento dos estudantes.</span></li>',
        'experience.etepDecisions': '<li><strong>Competição FIRST</strong><span>No time de programação, responsável pelo algoritmo que levava o robô a completar os desafios com sensores, em cenários bem variáveis que exigiam um sistema responsivo.</span></li><li><strong>Tarefa autônoma inédita</strong><span>Concluímos com êxito uma tarefa feita de forma autônoma pelo robô, responsabilidade do time de programação e algo que a equipe nunca tinha conseguido.</span></li><li><strong>Programação embarcada</strong><span>Diversos projetos em PIC Basic e Arduino.</span></li>',
        'experience.kaffaDate': '2025, atual',
        'experience.kaffaRole': 'Full stack no time de produto',
        'experience.kaffaText': 'De ponta a ponta no produto: React na web, SWT no desktop, Android, backend em Kotlin e Java no servidor Nomad, mapas e GIS.',
        'experience.senaiName': 'Instituto SENAI de Inovação',
        'experience.senaiDate': '2021 a 2025',
        'experience.senaiRole': 'Desenvolvedor full stack',
        'experience.senaiText': 'Arquitetura e backend em projetos de inovação, com Django REST Framework, FastAPI, React Native e Docker. Todo o Django testado com pytest.',
        'experience.unipDate': '2020 a 2023',
        'experience.unipRole': 'Ciência da Computação',
        'experience.unipText': 'TCC: plataforma web que mescla gamificação e educação.',
        'experience.etepDate': '2016 a 2018',
        'experience.etepRole': 'Técnico em Mecatrônica',
        'experience.etepText': 'Base em eletrônica, hidráulica, mecânica e desenho técnico, projetos em PIC Basic e Arduino e atuação no time de programação na competição de robótica FIRST.',

        'contact.title': 'Vamos conversar',
        'contact.line': 'Tem uma vaga ou um sistema para construir? Puxa assunto por aqui.',
        'contact.emailTerm': 'E-mail',
        'contact.emailLabel': 'dell.pianissola@outlook.com',
        'contact.emailCopied': 'Copiado!',
        'contact.copy': 'Copiar',
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
        'meta.description': 'Gabriel Pianissola, full stack software engineer. Projects, technical decisions and background across web and mobile.',
        'meta.ogTitle': 'Gabriel Pianissola, software engineer',
        'meta.ogDescription': 'Full stack developer focused on software architecture. Projects, technical decisions and background.',
        'meta.ogImageAlt': 'Gabriel Pianissola, software engineer',
        'meta.ogLocale': 'en_US',

        'nav.mainAria': 'Main navigation',
        'nav.skip': 'Skip to content',
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
        'nav.hint': 'Scroll for more',

        'hero.role1': 'Computer scientist',
        'hero.role2': 'Solutions architect',
        'hero.role3': 'Full stack developer',
        'hero.role4': 'Mechatronics technician',
        'hero.role5': 'Passionate',
        'hero.ctaProjects': 'See projects',
        'hero.ctaContact': 'Get in touch',
        'hero.profileAlt': 'Gabriel Pianissola in a navy shirt, hand on his chin',

        'about.title': 'About me',
        'about.photoAlt': 'Gabriel Pianissola smiling, arms crossed',
        'about.text1': 'I am a full stack developer focused on software architecture. I work end to end on web and mobile projects.',
        'about.text2': 'I always weigh the best way to tackle each problem, efficiently and in the best possible time, building durable solutions with close attention to detail.',
        'about.stat1Value': '5+ years',
        'about.stat1Label': 'building systems',
        'about.stat2Value': 'Versatile',
        'about.stat2Label': 'web, APIs, architecture and more',
        'about.stat3Value': 'PT and EN',
        'about.stat3Label': 'Portuguese and English day to day',

        'how.title': 'How I work',
        'how.file': 'how-i-work.md',
        'how.m1': '## Recorded decisions',
        'how.m2': 'Important decisions become ADRs: the context, the alternatives and the cost of each choice.',
        'how.m3': '## End to end',
        'how.m4': 'I take on the whole problem, from database to deploy.',
        'how.m5': '## Small deliveries',
        'how.m6': 'Short PRs, automated deploys and early feedback.',
        'how.m7': '## Tests across the whole solution',
        'how.m8': 'I write unit tests for code coverage and e2e tests to guarantee the business rules.',
        'how.m9': '## Simple first',
        'how.m10': 'Complexity comes in only when the problem asks for it.',
        'how.m11': '## Rules away from the screen',
        'how.m12': 'Business rules live in the domain, testable without a framework. The interface only shows the result.',
        'how.toolSigned': 'Signed URLs',
        'how.toolModular': 'Modular monolith',
        'how.toolServices': 'Microservices',
        'how.toolSemver': 'Semantic versioning',
        'how.skill1Title': 'Full stack developer',
        'how.skill2Title': 'Software architecture',
        'how.skill3Title': 'Mobile',
        'how.skill4Title': 'Data and storage',
        'how.skill5Title': 'Infra and deploy',
        'how.skill6Title': 'Testing',
        'how.skill7Title': 'Maps and graphic formats',
        'how.skill8Title': 'Git and CI/CD',

        'projects.title': 'Projects',
        'projects.open': 'Open site ↗',
        'projects.visit': 'Visit site ↗',
        'projects.case': 'Details →',
        'case.title': 'Project details',
        'case.back': 'Back to projects',
        'case.problem': 'The pain',
        'case.solution': 'How I solved it',
        'case.architecture': 'Architecture',
        'case.decisions': 'Technical decisions',
        'case.stack': 'Why this stack',
        'case.layerFront': 'Front-end',
        'case.layerMobile': 'Mobile',
        'case.layerBack': 'Back-end',
        'case.layerData': 'Data',
        'case.layerTests': 'Testing',
        'case.layerInfra': 'Infra',
        'projects.code': 'Code',
        'projects.footer': 'More experiments and studies on <a href="https://github.com/DellPianissola" target="_blank" rel="noopener">GitHub</a>.',
        'projects.whatchuType': 'Full stack',
        'projects.whatchuAlt': 'Whatchu home screen showing a weighted random pick',
        'projects.whatchuDesc': "Picks what to watch, weighted by each title's priority, with TMDB-integrated search. JWT authentication with refresh tokens, avatars via MinIO and automated tests.",
        'projects.citriaType': 'Full stack and mobile',
        'projects.citriaAlt': 'Citria landing page with the patient app showing the current meal',
        'projects.citriaDesc': 'Connects patients and nutritionists: meal of the moment, daily check-in, diets from the TACO and IBGE food tables and scheduling. Code shared between web and mobile, push notifications and e2e tests with Testcontainers.',
        'projects.insideType': 'Full stack',
        'projects.insideAlt': 'Inside login screen',
        'projects.insideDesc': 'Manages leads, proposals, projects and clients. The API prices versioned proposals, turns an acceptance into a project with milestones and sends emails through an outbox. Access is restricted, so only the login screen is public.',
        'projects.irisType': 'Front-end',
        'projects.irisAlt': 'Íris testing a colour palette on a website mockup',
        'projects.irisDesc': 'Colour lab: customers upload their own logo and try palettes on a real website mockup, with WCAG contrast calculated in real time.',

        'experience.title': 'Experience',
        'experience.open': 'See details',
        'experience.closePanel': 'Close',
        'experience.behind': 'Details',
        'experience.kaffaMetricValue': '16 GB → 1.5 GB',
        'experience.kaffaMetric': 'is the size of the base needed to run the app, more than 90% smaller',
        'experience.senaiMetricValue': '2x faster',
        'experience.senaiMetric': '1-year project delivered in 6 months, beyond the requested scope',
        'experience.kaffaDecisions': "<li><strong>App base from 16 GB to 1.5 GB</strong><span>Built the solution that cut the base needed to run the app by more than 90%.</span></li><li><strong>DWG import past the limit</strong><span>Optimized the import into the SWT canvas: loading in chunks took the system past its maximum file size and also reduced latency when moving the map.</span></li><li><strong>AI in the QA workflow</strong><span>Brought AI into development to generate documentation that makes testing bugs and user stories easier, reducing the QA team's testing bottleneck.</span></li><li><strong>Technical reference for Android</strong><span>Responsible for the product's Android layer within the team.</span></li>",
        'experience.senaiDecisions': "<li><strong>1-year project delivered in half the time</strong><span>Joined with 6 months already gone, took over the architecture and the entire backend, and we delivered more than was asked for.</span></li><li><strong>Async communication with SSE</strong><span>Back and front in Django REST Framework talking through Server-Sent Events, documented so the client could evolve it alone.</span></li><li><strong>The AI team's API</strong><span>Took over the FastAPI service and integrated the algorithms that calculate KPIs and other inferences into the backend.</span></li><li><strong>Sending large files</strong><span>Direct upload architecture with signed URLs: Google Cloud Storage on one project, MinIO on another, in an optimized way.</span></li>",
        'experience.unipDecisions': '<li><strong>Capstone tested in the classroom</strong><span>My capstone was validated at a private elementary school, with student engagement.</span></li>',
        'experience.etepDecisions': '<li><strong>FIRST competition</strong><span>On the programming team, responsible for the algorithm that got the robot through the challenges using sensors, in highly variable scenarios that required a responsive system.</span></li><li><strong>A first autonomous task</strong><span>We completed a task the robot performed autonomously, the responsibility of the programming team and something the team had never achieved.</span></li><li><strong>Embedded programming</strong><span>Several projects in PIC Basic and Arduino.</span></li>',
        'experience.kaffaDate': '2025, present',
        'experience.kaffaRole': 'Full stack on the product team',
        'experience.kaffaText': "End to end on the product: React on the web, SWT on desktop, Android, a Kotlin and Java backend on the Nomad server, maps and GIS.",
        'experience.senaiName': 'SENAI Innovation Institute',
        'experience.senaiDate': '2021 to 2025',
        'experience.senaiRole': 'Full stack developer',
        'experience.senaiText': 'Architecture and backend on innovation projects, with Django REST Framework, FastAPI, React Native and Docker. All of the Django code tested with pytest.',
        'experience.unipDate': '2020 to 2023',
        'experience.unipRole': 'Computer Science',
        'experience.unipText': 'Capstone project: a web platform blending gamification and education.',
        'experience.etepDate': '2016 to 2018',
        'experience.etepRole': 'Technical degree in Mechatronics',
        'experience.etepText': 'Grounding in electronics, hydraulics, mechanics and technical drawing, projects in PIC Basic and Arduino, and work on the programming team at the FIRST robotics competition.',

        'contact.title': 'Let\'s talk',
        'contact.line': 'Got a role or a system to build? Start the conversation here.',
        'contact.emailTerm': 'Email',
        'contact.emailLabel': 'dell.pianissola@outlook.com',
        'contact.emailCopied': 'Copied!',
        'contact.copy': 'Copy',
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
