import { t } from './i18n.js';

export function initManifest() {
    const box    = document.getElementById('manifest');
    const replay = document.getElementById('manifest-replay');
    const lines  = [...box.querySelectorAll('[data-i18n]')];
    let timer = null;

    const clear = () => {
        lines.forEach(line => {
            line.classList.remove('is-current');
            line.innerHTML = '<span class="man-typed"></span><span class="man-rest"></span>';
        });
    };

    const finish = () => {
        clearInterval(timer);
        timer = null;
        lines.forEach(line => {
            line.classList.remove('is-current');
            line.textContent = t(line.dataset.i18n);
        });
        box.classList.add('is-done');
    };

    const paint = (typed, texts) => {
        let offset = 0;
        lines.forEach((line, i) => {
            const text = texts[i];
            const shown = Math.max(0, Math.min(text.length, typed - offset));
            line.firstChild.textContent = text.slice(0, shown);
            line.lastChild.textContent = text.slice(shown);
            line.classList.toggle('is-current', typed >= offset && typed <= offset + text.length);
            offset += text.length + 1;
        });
    };

    const type = () => {
        clearInterval(timer);
        box.classList.remove('is-done');
        clear();
        const texts = lines.map(line => t(line.dataset.i18n));
        const total = texts.reduce((sum, text) => sum + text.length + 1, 0);
        let typed = 0;
        timer = setInterval(() => {
            typed += 2;
            if (typed >= total) return finish();
            paint(typed, texts);
        }, 16);
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        box.classList.add('is-done');
        replay.hidden = true;
        return;
    }

    clear();
    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        type();
    }, { rootMargin: '0px 0px -40% 0px' });

    observer.observe(box);
    replay.addEventListener('click', type);
    document.addEventListener('langchange', () => {
        if (timer) finish();
    });
}
