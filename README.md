# COBOGÓ — Modernismo brasileiro, traduzido em interface.
A Brazilian modernist design system for public-interest software.

Um design system focado em software público e de interesse cívico, inspirado nos princípios do modernismo brasileiro de funcionalidade, geometria e acessibilidade.

## Install & Use

Instale via GitHub (até existir release no NPM):

```bash
bun add github:franklinbaldo/cobogo#main
# ou: npm install github:franklinbaldo/cobogo#main
```

Quando houver release tagueada, use a tag específica (`#v0.1.0` etc).

### Importar tokens CSS

No layout principal:

```astro
---
import "cobogo/styles";
---
```

Isso traz toda a paleta, tipografia, escala, radius e sombras como CSS variables. Veja a referência completa em [`src/styles/tokens.md`](./src/styles/tokens.md).

### Importar componentes Svelte

```astro
---
import Button from "cobogo/components/Button";
import Card from "cobogo/components/Card";
import Badge from "cobogo/components/Badge";
---

<Button variant="azul">Ver manifesto</Button>
<Card>...</Card>
<Badge>Novo</Badge>
```

Componentes disponíveis: `Button`, `Card`, `Badge`, `ProfileCard`, `DataTable`, `SearchBar`, e os padrões cobogó (`patterns/CobogoCircular`, `patterns/CobogoHexagonal`, `patterns/CobogoLosango`, `patterns/CobogoCruz`).

## Objetivo
Unificar a interface dos projetos:
- [Verne](https://github.com/franklinbaldo/verne)
- [CausaGanha](https://github.com/franklinbaldo/causaganha)
- [Baliza](https://github.com/franklinbaldo/baliza)
- [FICHA](https://github.com/franklinbaldo/ficha)

