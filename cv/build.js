import { fileURLToPath } from 'node:url';
import { printPdfs } from '../scripts/print-pdf.js';

const out = name => fileURLToPath(new URL(name, import.meta.url));

await printPdfs(['pt', 'en'].map(lang => ({
    page: `cv/cv.html#${lang}`,
    out: out(`gabriel-pianissola-cv-${lang}.pdf`),
})));
