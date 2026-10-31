import { initI18n }    from './i18n.js';
import { initUI }      from './ui.js';
import { initHero }    from './hero.js';
import { initManifest } from './manifest.js';
import { initProjects } from './projects.js';
import { initExperience } from './experience.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', function() {
    initI18n();
    initUI();
    initHero();
    initManifest();
    initProjects();
    initExperience();
    initContact();
});
