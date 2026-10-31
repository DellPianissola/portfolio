import { initI18n }    from './i18n.js';
import { initUI }      from './ui.js';
import { initExperience } from './experience.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', function() {
    initI18n();
    initUI();
    initExperience();
    initContact();
});
