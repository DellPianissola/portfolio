// ── Entry point ───────────────────────────────────────────────

import { initI18n }      from './i18n.js';
import { initUI }        from './ui.js';
import { initTheme }     from './theme.js';
import { initCelestial } from './celestial.js';
import { startClouds }   from './clouds.js';
import { initJellyfish } from './jellyfish.js';
import { initStars, initBubbles, initParticles } from './ambient.js';
import { initContact }   from './contact.js';

document.addEventListener('DOMContentLoaded', function() {
    initI18n();
    initUI();
    initTheme();
    initCelestial();

    if (!document.body.classList.contains('dark-mode')) {
        startClouds();
    }

    initStars();
    initBubbles();
    initParticles();
    initJellyfish();
    initContact();
});
