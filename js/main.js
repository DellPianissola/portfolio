// ── Entry point ───────────────────────────────────────────────

import { initUI }        from './ui.js';
import { initTheme }     from './theme.js';
import { initCelestial } from './celestial.js';
import { startClouds }   from './clouds.js';
import { initJellyfish } from './jellyfish.js';
import { initStars, initBubbles, initParticles } from './ambient.js';
import { initContact }   from './contact.js';

document.addEventListener('DOMContentLoaded', function() {
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
