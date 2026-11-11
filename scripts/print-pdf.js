import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const EDGE = process.env.EDGE_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sizeOf = path => stat(path).then(s => s.size, () => 0);

async function waitForFile(path, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const size = await sizeOf(path);
        await sleep(500);
        if (size > 0 && size === await sizeOf(path)) return;
    }
    throw new Error(`PDF não gerado: ${path}`);
}

function serveRoot() {
    return createServer(async (req, res) => {
        const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        try {
            const body = await readFile(join(ROOT, path));
            res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
        } catch {
            res.writeHead(404).end();
        }
    });
}

export async function printPdfs(jobs) {
    const server = serveRoot();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();

    try {
        for (const { page, out } of jobs) {
            const profile = await mkdtemp(join(tmpdir(), 'print-pdf-'));
            await rm(out, { force: true });
            try {
                await promisify(execFile)(EDGE, [
                    '--headless=new',
                    '--disable-gpu',
                    '--no-first-run',
                    `--user-data-dir=${profile}`,
                    '--no-pdf-header-footer',
                    '--virtual-time-budget=8000',
                    `--print-to-pdf=${out}`,
                    `http://127.0.0.1:${port}/${page}`,
                ]);
                // O msedge.exe sai antes de o processo filho terminar de gravar o PDF.
                await waitForFile(out);
            } finally {
                await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
            }
            console.log(out.slice(ROOT.length).replaceAll('\\', '/'));
        }
    } finally {
        server.close();
    }
}
