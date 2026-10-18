# Gabriel Pianissola — Portfólio

Portfólio pessoal com temática de **oceano e água**. A navegação pelo site simula um mergulho progressivo — da superfície até o fundo do abismo.

## Conceito visual

| Seção | Profundidade | Tema |
|---|---|---|
| **Home** | Superfície / Céu | Céu dinâmico, ondas animadas |
| **Sobre** | Água rasa | Turquesa, peixes tropicais |
| **Jornada** | Meia-água | Régua de anos, cardume de sardinhas |
| **Tecnologias** | Meia profundidade | Águas-vivas com as stacks |
| **Projetos** | Fundo do mar | Sonar que varre os projetos, plâncton bioluminescente |
| **Contato** | Leito | Naufrágio no escuro, neve marinha e partículas bioluminescentes |

## Funcionalidades

- **Céu dinâmico** — sistema orbital: o Sol e a Lua percorrem uma órbita elíptica em lados opostos, sempre atrás das ondas
- **Céu pela hora real**: no modo Auto o céu, o Sol e a Lua seguem o horário local do visitante; Dia e Noite giram o céu até o horário escolhido
- **Cores sincronizadas**: céu, ondas e oceano mudam juntos com a posição do Sol (dia, pôr do sol, noite, amanhecer)
- **Oceano vivo**: criaturas em canvas por profundidade, que fogem do cursor e se dissolvem na cor da água
- **Nuvens geradas dinamicamente** — cruzam o céu periodicamente em tamanhos e velocidades aleatórias
- **Ondas em 4 camadas** — animação de vaivém sutil com profundidade visual
- **Estrelas** — aparecem no céu noturno com brilho pulsante
- **Bolhas** — flutuam em cada seção com quantidade inversamente proporcional à profundidade
- **Partículas bioluminescentes** — seção de contato
- **Modo Auto / Dia / Noite** com persistência via `localStorage`
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
    ├── og-cover.jpg
    ├── selfie-300.jpg / .webp
    └── selfie-600.jpg / .webp
```

## Autor

**Gabriel Pianissola** — [GitHub](https://github.com/DellPianissola) · [Dell.pianissola@outlook.com](mailto:Dell.pianissola@outlook.com)
