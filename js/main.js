import { initI18n }    from './i18n.js';
import { initUI }      from './ui.js';
import { initHero }    from './hero.js';
import { initProjects, renderProjects } from './projects.js';
import { initExperience, renderExperience } from './experience.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    renderExperience();
    initI18n();
    initUI();
    initHero();
    initProjects();
    initExperience();
    initContact();
});
