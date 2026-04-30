# VIBE — Cobogó visual identity reference

Este arquivo é a **fonte única** do que cobogó quer parecer. Toda
adição visual ao design system (patterns, fonts, themes, componentes
decorativos, recipes) deve dialogar com pelo menos uma das 25
referências abaixo. Sessões Jules trabalhando em waves de
"abrasileiramento" devem ler esse arquivo antes de planejar.

## Tese central

Cobogó é modernismo brasileiro **traduzido em interface** — não
nostalgia, não folclore decorativo, não exotismo turístico. É:

- Brasileiro **sem ser caricato** — referências locais com sofisticação contemporânea
- Modernista **sem ser nostálgico** — gramática visual viva, não museu
- Cívico **sem ser burocrático** — serviço público elegante e product-ready
- Colorido **sem ser infantil** — saturação com função, não festa
- Geométrico **sem ser frio** — grid + pattern + ornamento que convidam
- Orgânico **sem ser hippie** — natureza tropical com rigor editorial

## Moodboard — 25 referências

Cada referência tem: nome, descrição visual, status no design system,
e mapeamento para componentes/tokens existentes ou planejados.

### Bloco 1 — Pavimentação e arquitetura modernista

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 1 | **Calçadão de Copacabana** | Mosaico ondulado preto/branco, ritmo orgânico contínuo | ❌ falta | `pattern-calcada-onda` |
| 2 | **Calçada de Ipanema** | Pavimento geométrico preto/branco, linhas sinuosas | ❌ falta | `pattern-calcada-ipanema` |
| 3 | **Cobogó arquitetônico** | Concreto vazado, módulos repetidos, luz filtrada | ✅ coberto | `pattern-cobogo-{circular,hexagonal,losango,cruz}` + `Cobogo*.svelte` |
| 4 | **Brasília modernista** | Niemeyer: curvas brancas, monumentalidade, céu como fundo | ✅ parcial | tokens de paleta + tipografia editorial; falta `Sky.svelte` ou hero variant |
| 5 | **Azulejo modernista** | Triângulos azul/branco geométricos, repetição rítmica | ⚠️ parcial | `pattern-bulcao` (simplista); falta `pattern-azulejo-modernista` |
| 6 | **Pedra portuguesa** | Mosaico com estrela central, simetria radial | ❌ falta | `pattern-pedra-portuguesa` |

### Bloco 2 — Tipografia popular e burocrática

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 7 | **Tipografia de jornal** | Manchete pesada serif, "O BRASIL", densidade editorial | ⚠️ parcial | `--font-display-alt: Fraunces` cobre serif; falta `--font-jornal` (PT Serif Caption ou Old Standard TT) |
| 8 | **Lambe-lambe** | Cartaz colado urbano, amarelo + vermelho + preto, weathered, "A CIDADE É NOSSA" | ❌ falta | `Lambe.svelte` + `theme-lambe` (alta saturação, rotação leve, border irregular) |
| 9 | **Letreiro pintado à mão** | Fachada de padaria/mercearia, font handpaint, ornamentado | ❌ falta | `Sign.svelte` + `--font-letreiro` (Caveat ou similar) |
| 10 | **Carimbo burocrático** | Selo "RECEBIDO" rotacionado, vermelho, papel oficial | ❌ falta | `Stamp.svelte` + `theme-carimbo` (rotação, cor, dotted border) |

### Bloco 3 — Folclore, indígena, popular nordestino

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 11 | **Cordel/xilogravura** | Preto sobre creme, traços grosseiros, narrativa figurativa | ❌ falta | `pattern-cordel` ou `Xilogravura.astro` (decorativo, blockprint feel) |
| 12 | **Cerâmica marajoara** | Geometria indígena, espiral, terracota | ❌ falta | `pattern-marajoara` (uso respeitoso, citado como referência) |
| 13 | **Palha trançada** | Textura natural, weave horizontal/vertical | ❌ falta | `texture-palha` ou ornament trim |
| 14 | **Filtro de barro** | Cerâmica utilitária, vermelho terra | ❌ falta | (referência cromática só — adicionar `--terracota` aos tokens) |
| 15 | **Rede de dormir** | Listras coloridas saturadas, alternância, descanso | ❌ falta | `pattern-rede` (listras saturadas combinatórias) |

### Bloco 4 — Natureza tropical

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 16 | **Folhagem tropical** | Monstera, costela-de-adão, verde profundo | ❌ falta | `Foliage.svelte` (decorativo SVG) |
| 17 | **Rios brasileiros** | Mapa de veias hidrográficas, azul claro orgânico | ❌ falta | `RiverMap.svelte` (background ornamental decorativo) |
| 18 | **Feira livre** | Frutas saturadas, abundância, "BOM DIA!" | ❌ falta | (referência cromática — paleta saturada na seção de Aplicações) |

### Bloco 5 — Vida urbana brasileira

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 19 | **Boteco** | Azulejo verde, copo cerveja, balcão | ❌ falta | `theme-boteco` (verde profundo + creme) ou `Card.svelte` variant |
| 20 | **Carnaval** | Flâmula colorida "ALEGRIA É DO POVO", festa | ❌ falta | `Pennant.svelte` (componente decorativo flâmula) |
| 21 | **Futebol** | Placar 2x1, estádio, listras | ❌ falta | (referência tipográfica — display monospace LCD-ish; baixa prioridade) |
| 22 | **Orelhão** | Cápsula amarela icônica, modernismo cívico | ❌ falta | `Orelhao.svelte` (silhueta SVG decorativa, ícone de seção) |
| 23 | **Casa colonial** | Telhado + parede branca + azulejo + porta azul | ❌ falta | (referência arquitetônica — usar em hero illustration secundário) |

### Bloco 6 — Arte abstrata brasileira

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 24 | **Athos Bulcão** | Tile geométrico azul/preto/amarelo, repetição modular | ⚠️ parcial | `pattern-bulcao` simples existe; falta variantes coloridas + `pattern-bulcao-{azul,vermelho,verde,amarelo}` |
| 25 | **Concretismo tropical** | Mavignier/Barsotti, geometria pura, primárias | ⚠️ parcial | tokens cobrem isso; falta `pattern-concretismo` explícito |

## Mapa de waves de implementação

### Wave A — Pattern library expansion
6-8 SVGs novos em `public/patterns/` + classes CSS:
- `calcada-onda`, `calcada-ipanema`, `pedra-portuguesa`, `azulejo-modernista`, `marajoara`, `concretismo`
- Enrich `bulcao-{azul,vermelho,verde,amarelo}` (variantes coloridas)

### Wave B — Brazilian display fonts + tonal themes
Modifica `global.css`:
- `--font-letreiro`, `--font-jornal`, `--font-cordel` (Google Fonts)
- `--terracota` token novo
- `.theme-lambe`, `.theme-carimbo`, `.theme-boteco`
- `.texture-papel-velho`, `.texture-concreto`, `.texture-palha`

### Wave C — Decorative components
`src/components/decorative/`:
- `Stamp.svelte` (carimbo)
- `Lambe.svelte` (lambe-lambe wheatpaste card)
- `Sign.svelte` (letreiro pintado)
- `Foliage.svelte` (monstera tropical)
- `Orelhao.svelte` (silhueta amarela)
- `Pennant.svelte` (flâmula carnaval)
- `RiverMap.svelte` (rios brasileiros)

### Wave D — Page integration / showcase
- Hero com `pattern-calcada-onda` em background (opacity baixa)
- Manifesto: seção "Referências visuais" com mini-galeria do moodboard mapeada
- Footer com `Foliage` ornament
- Showcase no `/inspirations` ou `/foundations/references`

## Princípios de uso

1. **Densidade modernista, não densidade nostálgica.** Padrões devem
   organizar layout, não decorar por decoração.
2. **Saturação com função.** Cores fortes (vermelho, ocre, amarelo
   carnaval) são pra alerta/destaque, não tom geral.
3. **Brasil sem caricatura.** Marajoara, cordel, azulejo: usar com
   peso histórico, não como "tema brasileiro" turístico.
4. **Geometria como linguagem comum.** Cobogó, bulcão, concretismo,
   azulejo — tudo é grid + módulo. Componentes herdam isso.
5. **Cívico antes de decorativo.** Carimbo, lambe, letreiro, orelhão
   são todos signos de espaço público brasileiro. Reforçar a tese
   "design system pra software cívico".

## Não-fazer

- ❌ Glitter, brilho, efeitos festivos genéricos.
- ❌ Bandeira do Brasil, tons de "verde-amarelo" como signo identitário.
- ❌ Samba/música como tema visual (esse não é projeto cultural).
- ❌ Chamar marajoara/indígena de "exótico" ou "tribal" no copy.
- ❌ Lambe-lambe com texto agressivo apolítico (manter dignidade
   do gênero — protesto urbano sério).

## Referência viva

Quando adicionar uma nova referência ou ajustar mapping, edita esse
arquivo no mesmo PR. VIBE.md é parte integral do design system, não
documentação morta.
