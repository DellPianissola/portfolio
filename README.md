# Gabriel Pianissola — Portfólio

Portfólio pessoal com temática de **oceano e água**. A navegação pelo site simula um mergulho progressivo — da superfície até o fundo do abismo.

## Conceito visual

| Seção | Profundidade | Tema |
|---|---|---|
| **Home** | Superfície / Céu | Céu dinâmico, ondas animadas |
| **Sobre** | Água rasa | Turquesa, bolhas flutuando |
| **Tecnologias** | Meia profundidade | Azul médio, badges glassmorphism |
| **Projetos** | Fundo do mar | Azul escuro, cards estilo vigia de submarino |
| **Contato** | Zona abissal | Quase preto, partículas bioluminescentes |

## Funcionalidades

- **Céu dinâmico** — sistema orbital: o Sol e a Lua giram em órbita circular com 180° de separação, sempre atrás das ondas
- **Transição dia/noite animada** — ao ativar o modo escuro, o Sol percorre o céu se pondo; ao desativar, a Lua se põe antes do Sol nascer
- **Cores sincronizadas** — o gradiente do céu muda em tempo real com a posição do Sol (dia → laranja → vermelho → noite → pré-amanhecer → aurora → dia)
- **Nuvens geradas dinamicamente** — cruzam o céu periodicamente em tamanhos e velocidades aleatórias
- **Ondas em 4 camadas** — animação de vaivém sutil com profundidade visual
- **Estrelas** — aparecem no céu noturno com brilho pulsante
- **Bolhas** — flutuam em cada seção com quantidade inversamente proporcional à profundidade
- **Partículas bioluminescentes** — seção de contato
- **Dark mode** com persistência via `localStorage`
- **Efeito de digitação** no header
- **Menu hambúrguer** responsivo para mobile
- **Smooth scroll** na navegação

## Stack

- HTML5
- CSS3 (animações, gradientes, glassmorphism)
- JavaScript vanilla (sem frameworks ou dependências externas)

## Como rodar

```bash
git clone https://github.com/DellPianissola/portfolio.git
cd portfolio
# Abra index.html no navegador, ou use um servidor local:
python -m http.server 8000
```

## Estrutura

```
portfolio/
├── index.html
├── style.css
├── script.js
└── images/
    └── selfie_praia_cortado.jpg
```

## Autor

**Gabriel Pianissola** — [GitHub](https://github.com/DellPianissola) · [Dell.pianissola@outlook.com](mailto:Dell.pianissola@outlook.com)
