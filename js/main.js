// ── Entry point ───────────────────────────────────────────────

import { initUI }                        from './ui.js';
import { initCelestial }                 from './celestial.js';
import { startClouds }                   from './clouds.js';
import { initJellyfish }                 from './jellyfish.js';
import { initStars, initBubbles, initParticles } from './ambient.js';

document.addEventListener('DOMContentLoaded', function() {
    initUI();
    initCelestial();

    if (!document.body.classList.contains('dark-mode')) {
        startClouds();
    }

    initStars();
    initBubbles();
    initParticles();
    initJellyfish();
});
