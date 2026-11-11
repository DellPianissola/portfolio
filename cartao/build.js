import { fileURLToPath } from 'node:url';
import { printPdfs } from '../scripts/print-pdf.js';

const phone = process.env.CARTAO_TELEFONE;
if (!phone) {
    console.error('Defina CARTAO_TELEFONE no .env (fora do git) antes de gerar o cartão.');
    process.exit(1);
}

const out = name => fileURLToPath(new URL(name, import.meta.url));
const query = new URLSearchParams({ tel: phone });

await printPdfs(['90x50', '85x55'].map(size => ({
    page: `cartao/cartao.html?${query}#${size}`,
    out: out(`cartao-gabriel-pianissola-${size}mm.pdf`),
})));
