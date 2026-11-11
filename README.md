# Gabriel Pianissola

Portfólio pessoal: projetos, decisões técnicas e trajetória, em português e inglês.

## Stack

- HTML, CSS e JavaScript puros, sem build
- Claude Haiku 5.5 no chat, por um Cloudflare Worker (`worker/`)
- EmailJS e reCAPTCHA no envio da mensagem do chat

## Como rodar

```bash
git clone https://github.com/DellPianissola/portfolio.git
cd portfolio
python -m http.server 8000
```

O chat depende do Worker, de `wrangler login` e dos secrets `ANTHROPIC_API_KEY` e `VISITOR_SALT` (localmente, em `.dev.vars`):

```bash
npx wrangler dev
```

Os PDFs do currículo saem de `cv/cv.html`, com o Microsoft Edge (`EDGE_PATH` troca o executável). A pasta `cv/` está fora do deploy em `.assetsignore`:

```bash
npm run cv
```

O cartão de visita sai de `cartao/cartao.html`, em 90x50 mm e 85x55 mm, com 3 mm de sangria. O telefone fica fora do git: defina `CARTAO_TELEFONE` num `.env` na raiz. Os PDFs gerados também ficam fora do git e do deploy:

```bash
npm run cartao
```

## Estrutura

```
portfolio/
├── index.html
├── estudo-de-caso.html
├── style.css
├── config.js
├── wrangler.jsonc
├── _headers
├── cv/
│   ├── cv.html
│   └── build.js
├── cartao/
│   ├── cartao.html
│   └── build.js
├── scripts/
│   └── print-pdf.js
├── worker/
│   ├── index.js
│   └── knowledge.md
├── js/
│   ├── main.js
│   ├── i18n.js
│   ├── media.js
│   ├── ui.js
│   ├── hero.js
│   ├── projects.js
│   ├── live.js
│   ├── experience.js
│   ├── contact.js
│   ├── chat.js
│   ├── chat-limits.js
│   ├── delivery.js
│   ├── case.js
│   ├── cases.js
│   └── project-parts.js
└── images/
    ├── profile/
    ├── projects/
    └── stack/
```
