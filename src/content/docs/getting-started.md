---
title: Getting Started
description: Instale e use o COBOGÓ no seu projeto Astro+Svelte
section: intro
order: 1
---

# Getting Started

Instale e use o COBOGÓ no seu projeto Astro+Svelte.

## Instalação

Instale via GitHub (até existir release no NPM):

```bash
bun add github:franklinbaldo/cobogo#v0.1.0
# ou: npm install github:franklinbaldo/cobogo#v0.1.0
```

## Uso

### Importar tokens CSS

No layout principal:

```astro
---
import 'cobogo/styles';
---
```

Isso traz toda a paleta, tipografia, escala, radius e sombras como CSS variables.

### Importar componentes Svelte

```astro
---
import Button from 'cobogo/components/Button';
import Card from 'cobogo/components/Card';
import Badge from 'cobogo/components/Badge';
---

<Button variant="azul">Ver manifesto</Button>
<Card>...</Card>
<Badge>Novo</Badge>
```

### Componentes disponíveis

Componentes disponíveis incluem `Button`, `Card`, `Badge`, `ProfileCard`, `DataTable`, `SearchBar`, e os padrões cobogó.
