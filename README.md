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

O chat depende do Worker e de `wrangler login`:

```bash
npx wrangler dev
```

## Estrutura

```
portfolio/
├── index.html
├── estudo-de-caso.html
├── style.css
├── config.js
├── wrangler.jsonc
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
│   ├── case.js
│   └── cases.js
└── images/
    ├── profile/
    └── projects/
```
