import { initI18n, getLang, t } from './i18n.js';
import { logoUrl } from './projects.js';
import { CASES, LAYERS } from './cases.js';

const currentSlug = () => location.hash.slice(1);

const GENERIC_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/></svg>';

const paragraphs = texts => texts.map(text => `<p>${text}</p>`).join('');

const calm = matchMedia('(prefers-reduced-motion: reduce)');

function stackMarkup(item, uses) {
    return LAYERS.map(([key, names]) => {
        const tools = item.stack.filter(name => names.includes(name));
        if (!tools.length) return '';
        const cards = tools.map(name => `
            <div class="case-tool">
                <span class="case-tool-icon">${logoUrl(name) ? `<img src="${logoUrl(name)}" alt="" width="24" height="24" loading="lazy">` : GENERIC_ICON}</span>
                <b>${name}</b>
                ${uses[name] ? `<span>${uses[name]}</span>` : ''}
            </div>`).join('');
        return `<div class="case-layer"><h3>${t(key)}</h3><div class="case-tools">${cards}</div></div>`;
    }).join('');
}

function storyMarkup(slug, item, copy) {
    const steps = [
        `<p class="case-kicker">${t('case.title')} · ${t(`projects.${slug}Type`)}</p>
         <h1>${item.name}</h1>
         <p>${t(`projects.${slug}Desc`)}</p>
         <div class="case-actions">
             <a class="button" href="${item.url}" target="_blank" rel="noopener">${t('projects.visit')}</a>
             ${item.github ? `<a class="button button--line" href="${item.github}" target="_blank" rel="noopener">${t('projects.code')}</a>` : ''}
         </div>
         <span class="story-hint">${t('nav.hint')} ↓</span>`,
        `<h2>${t('case.problem')}</h2>${paragraphs(copy.problem)}`,
        `<h2>${t('case.solution')}</h2>${paragraphs(copy.solution)}`,
    ];
    return `
        <div class="story">
            <div class="story-steps">${steps.map(step => `<section class="story-step">${step}</section>`).join('')}</div>
            <div class="story-stage">
                <div class="story-frame">
                    <video src="images/projects/video/${slug}.mp4" poster="images/projects/video/${slug}.jpg" muted loop playsinline preload="auto" ${calm.matches ? '' : 'autoplay'} aria-label="${t(`projects.${slug}Alt`)}"></video>
                </div>
            </div>
        </div>`;
}

function syncStory() {
    const steps = [...document.querySelectorAll('.story-step')];
    let active = 0;
    steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top < innerHeight * 0.55) active = i;
    });

    steps.forEach((step, i) => step.classList.toggle('is-on', i === active));

    const bar = document.querySelector('.story-bar');
    const room = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${room > 0 ? scrollY / room : 0})`;
}

function render() {
    const slug = currentSlug();
    const item = CASES[slug];
    if (!item) return location.replace('index.html#projetos');

    const copy = item[getLang()];
    const decisions = copy.decisions.map(([title, text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('');
    const architecture = copy.architecture.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join('');

    document.title = `${item.name} | ${t('case.title')}`;
    document.getElementById('case').innerHTML = `
        <span class="story-bar" aria-hidden="true"></span>
        ${storyMarkup(slug, item, copy)}
        <section class="case-band case-band--night">
            <div class="case-band-inner">
                <h2>${t('case.architecture')}</h2>
                <dl class="case-arch">${architecture}</dl>
            </div>
        </section>
        <section class="case-band">
            <div>
                <h2>${t('case.decisions')}</h2>
                <ol class="decisions">${decisions}</ol>
            </div>
        </section>
        <section class="case-band case-band--tint">
            <div>
                <h2>${t('case.stack')}</h2>
                <div class="case-layers">${stackMarkup(item, copy.uses)}</div>
            </div>
        </section>`;

    syncStory();
}

document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    render();
    document.addEventListener('langchange', render);
    addEventListener('scroll', syncStory, { passive: true });
    addEventListener('resize', syncStory);
    addEventListener('hashchange', () => {
        render();
        scrollTo(0, 0);
    });
});
