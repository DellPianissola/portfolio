
// ── Entry point ───────────────────────────────────────────────

import { initI18n }      from './i18n.js';
import { initUI }        from './ui.js';
import { initCelestial } from './celestial.js';
import { initTheme }     from './theme.js';
import { initJellyfish } from './jellyfish.js';
import { initStars, initBubbles, initParticles } from './ambient.js';
import { initOcean }     from './ocean.js';
import { initJourney }   from './journey.js';
import { initSonar }     from './sonar.js';
import { initContact }   from './contact.js';

document.addEventListener('DOMContentLoaded', function() {
    initI18n();
    initUI();
    initCelestial();
    initTheme();

    initStars();
    initBubbles();
    initParticles();
    initJellyfish();
    initOcean();
    initJourney();
    initSonar();
    initContact();
});
