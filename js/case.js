import { initI18n, getLang, t } from './i18n.js';
import { logoUrl } from './projects.js';
import { CASES, LAYERS } from './cases.js';

const slugs = Object.keys(CASES);
const currentSlug = () => location.hash.slice(1);

const section = (titleKey, body, order) => `
    <section class="case-section" style="--i:${order}">
        <h2>${t(titleKey)}</h2>
        <div>${body}</div>
    </section>`;

const GENERIC_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/></svg>';

const paragraphs = texts => texts.map(text => `<p>${text}</p>`).join('');

function stackMarkup(item, uses) {
    return LAYERS.map(([key, names]) => {
        const tools = item.stack.filter(name => names.includes(name));
        if (!tools.length) return '';
        const cards = tools.map(name => `
            <div class="case-tool">
                ${logoUrl(name) ? `<img src="${logoUrl(name)}" alt="" width="28" height="28" loading="lazy">` : GENERIC_ICON}
                <b>${name}</b>
                ${uses[name] ? `<span>${uses[name]}</span>` : ''}
            </div>`).join('');
        return `<div class="case-layer"><h3>${t(key)}</h3><div class="case-tools">${cards}</div></div>`;
    }).join('');
}

function render() {
    const slug = currentSlug();
    const item = CASES[slug];
    if (!item) return location.replace('index.html#projetos');

    const copy = item[getLang()];
    const next = slugs[(slugs.indexOf(slug) + 1) % slugs.length];
    const decisions = copy.decisions.map(([title, text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('');
    const architecture = copy.architecture.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join('');
    const sections = [
        ['case.problem', paragraphs(copy.problem)],
        ['case.solution', paragraphs(copy.solution)],
        ['case.architecture', `<dl class="case-arch">${architecture}</dl><div class="case-layer"><h3>${t('case.decisions')}</h3><ol class="decisions">${decisions}</ol></div>`],
        ['case.stack', stackMarkup(item, copy.uses)],
    ];

    document.title = `${item.name} | ${t('case.title')}`;
    document.getElementById('case').innerHTML = `
        <header class="case-hero" data-spot>
            <div class="grid" aria-hidden="true"><i class="grid-lines"></i></div>
            <div>
                <p class="case-kicker">${t('case.title')} · ${t(`projects.${slug}Type`)}</p>
                <h1>${item.name}</h1>
                <p class="case-summary">${t(`projects.${slug}Desc`)}</p>
                <div class="case-actions">
                    <a class="button button--white" href="${item.url}" target="_blank" rel="noopener">${t('projects.visit')}</a>
                    ${item.github ? `<a class="button button--dark" href="${item.github}" target="_blank" rel="noopener">${t('projects.code')}</a>` : ''}
                </div>
            </div>
            <div class="browser">
                <div class="browser-bar"><span class="mono">${item.host}</span></div>
                <div class="browser-shot"><img src="images/projects/${slug}-preview-1200.webp" srcset="images/projects/${slug}-preview-1200.webp 1x, images/projects/${slug}-preview-2400.webp 2x" alt="${t(`projects.${slug}Alt`)}"></div>
            </div>
        </header>
        <div class="case-body">${sections.map(([key, body], i) => section(key, body, i)).join('')}</div>
        <a class="case-next" href="#${next}">
            <span><small>${t('case.next')}</small><b>${CASES[next].name}</b></span>
            <i aria-hidden="true">→</i>
        </a>`;
}

document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    render();
    document.addEventListener('langchange', render);
    addEventListener('hashchange', () => {
        render();
        scrollTo(0, 0);
    });
});
