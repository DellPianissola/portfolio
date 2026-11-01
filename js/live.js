const FRAME_WIDTH = 1280;
const wide = matchMedia('(min-width: 1041px) and (prefers-reduced-motion: no-preference)');

export async function goLive(shot) {
    if (!shot?.dataset.live || !wide.matches || shot.querySelector('iframe')) return;

    const online = await fetch(shot.dataset.live, { mode: 'no-cors', cache: 'no-store' }).catch(() => null);
    if (!online || shot.querySelector('iframe')) return;

    const frame = document.createElement('iframe');
    frame.src = shot.dataset.live;
    frame.title = '';
    frame.tabIndex = -1;
    frame.scrolling = 'no';
    frame.sandbox = 'allow-scripts allow-same-origin';
    frame.setAttribute('aria-hidden', 'true');
    frame.addEventListener('load', () => frame.classList.add('is-on'));

    new ResizeObserver(([{ contentRect: { width, height } }]) => {
        if (!width) return;
        const scale = width / FRAME_WIDTH;
        frame.style.setProperty('--scale', scale);
        frame.style.height = `${height / scale}px`;
    }).observe(shot);

    shot.append(frame);
}
