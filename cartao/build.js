import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const EDGE = process.env.EDGE_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = fileURLToPath(new URL('.', import.meta.url));
const SIZES = ['90x50', '85x55'];
const TYPES = { '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    try {
        const body = await readFile(join(ROOT, path));
        res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
    } catch {
        res.writeHead(404).end();
    }
});

async function waitForFile(path, timeout = 30000) {
    for (const start = Date.now(); Date.now() - start < timeout; await new Promise(r => setTimeout(r, 250))) {
        const size = await stat(path).then(s => s.size, () => 0);
        if (size > 0 && size === await new Promise(r => setTimeout(r, 500)).then(() => stat(path)).then(s => s.size)) return;
    }
    throw new Error(`PDF não gerado: ${path}`);
}

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

for (const size of SIZES) {
    const file = `cartao-gabriel-pianissola-${size}mm.pdf`;
    const pdf = join(OUT, file);
    const profile = await mkdtemp(join(tmpdir(), 'cartao-edge-'));
    await rm(pdf, { force: true });
    await promisify(execFile)(EDGE, [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        `--user-data-dir=${profile}`,
        '--no-pdf-header-footer',
        '--virtual-time-budget=8000',
        `--print-to-pdf=${pdf}`,
        `http://127.0.0.1:${port}/cartao/cartao.html#${size}`,
    ]);
    // O msedge.exe sai antes de o processo filho terminar de gravar o PDF.
    await waitForFile(pdf);
    console.log(`cartao/${file}`);
}

server.close();
