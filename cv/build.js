import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const EDGE = process.env.EDGE_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = fileURLToPath(new URL('.', import.meta.url));
const LANGS = ['pt', 'en'];
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    try {
        const body = await readFile(join(ROOT, path));
        res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
    } catch {
        res.writeHead(404).end();
    }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

for (const lang of LANGS) {
    await promisify(execFile)(EDGE, [
        '--headless=new',
        '--disable-gpu',
        `--user-data-dir=${join(tmpdir(), 'cv-edge-profile')}`,
        '--no-pdf-header-footer',
        '--virtual-time-budget=8000',
        `--print-to-pdf=${join(OUT, `gabriel-pianissola-cv-${lang}.pdf`)}`,
        `http://127.0.0.1:${port}/cv/cv.html#${lang}`,
    ]);
    console.log(`cv/gabriel-pianissola-cv-${lang}.pdf`);
}

server.close();
