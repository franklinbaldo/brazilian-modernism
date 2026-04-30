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

### Bloco 7 — Festa, religião, popular

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 26 | **Bandeirinhas de festa junina** | Bunting colorido suspenso, céu noturno, igreja | ❌ falta | `Bandeirinhas.svelte` (ornamento horizontal) — uso festivo, recipes comunitárias |
| 27 | **Estampa de chita** | Floral saturado vermelho/verde/azul, tecido popular | ❌ falta | `pattern-chita` — fundo de seções comunitárias/feira |
| 28 | **Renda renascença** | Lace branco filé delicado | ❌ falta | `pattern-renda` — overlay decorativo sutil |
| 29 | **Berimbau** | Arco de madeira, cabaça, instrumento de capoeira | ❌ falta | `Berimbau.svelte` — ícone folk linha xilográfica |
| 30 | **Carranca do São Francisco** | Figura em proa de barco, expressão dramática | ❌ falta | `Carranca.svelte` — ornamento dramático em hero/manifesto |
| 31 | **Fitinhas do Bonfim** | Fitas coloridas amarradas no portão, votivas | ❌ falta | `Fitinhas.svelte` (decorativo vertical) |
| 32 | **Estandarte de maracatu** | Bandeira pernambucana com Leão Coroado, dourado/azul | ❌ falta | `Estandarte.svelte` (ornamento de seção, opcional) |
| 33 | **Sanfona nordestina** | Acordeão preto/vermelho, instrumento icônico | ❌ falta | `Sanfona.svelte` ícone folk |

### Bloco 8 — Arquitetura e mobiliário cívico

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 34 | **Palafita amazônica** | Casa de madeira sobre estacas, rio | ❌ falta | `Palafita.svelte` ícone silhueta |
| 35 | **Fachada art déco brasileira** | Predio anos 30/40, simetria, ornamento estilizado | ❌ falta | `Fachada.svelte` ícone silhueta |
| 36 | **Bonde de Santa Teresa** | Bonde amarelo aberto, trilho urbano | ❌ falta | `Bonde.svelte` ícone silhueta cívica (amarelo+vermelho fixos) |
| 37 | **Caixa d'água azul** | Reservatório azul cilíndrico em telhado | ❌ falta | `CaixaDagua.svelte` ícone silhueta |
| 38 | **Coreto de praça** | Quiosque circular branco, ornamento metálico | ❌ falta | `Coreto.svelte` ícone silhueta |
| 39 | **Rosácea barroca** | Janela circular ornamentada igreja colonial | ❌ falta | `pattern-rosacea` ou `Rosacea.svelte` ornamento radial |
| 40 | **Faixa de caminhão** | "DEUS NO COMANDO SEMPRE" letreiro vermelho/branco | ❌ falta | `theme-faixa-caminhao` — variante de banner/Alert tipográfico |

### Bloco 9 — Natureza e mar

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 41 | **Jardim de Burle Marx** | Curvas orgânicas, paisagismo modernista | ❌ falta | `pattern-burle-marx` — curvas orgânicas como pattern |
| 42 | **Pipa de rua** | Pipa colorida com cauda, céu | ❌ falta | `Pipa.svelte` ícone festivo |
| 43 | **Guarda-sol de praia** | Listras vermelho/branco, tropical | ❌ falta | `Guardasol.svelte` ícone silhueta |
| 44 | **Jangada nordestina** | Jangada com vela triangular | ❌ falta | `Jangada.svelte` ícone silhueta |
| 45 | **Barco ribeirinho** | Lancha amazônica colorida | ❌ falta | `Barco.svelte` ícone silhueta |

### Bloco 10 — Objetos e vestuário

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 46 | **Bule esmaltado** | Bule azul com pintinhas brancas | ❌ falta | `Bule.svelte` ícone silhueta cívica |
| 47 | **Cadeira de fio** | Cadeira acapulco brasileira, fio multicolor | ❌ falta | `Cadeira.svelte` ícone silhueta |
| 48 | **Canga de praia** | Tecido tropical estampa folhagem/animal | ❌ falta | `pattern-canga` |
| 49 | **Cestaria indígena** | Cesta trançada padrão geométrico marrom | ❌ falta | `pattern-cestaria` (geométrico, paralelo a marajoara) |
| 50 | **Tabuleiro de acarajé** | Tigelas coloridas, comida de baiana | ⏭️ skip | (figurativo demais; não vira ícone — referência cromática só) |

### Bloco 11 — Cotidiano brasileiro ("grita Brasil" imediato)

| # | Referência | Visual | Status | Mapeamento |
|---|---|---|---|---|
| 51 | **Chuveiro elétrico** | Cabeça branca + corpo aquecedor + botão temp | ❌ falta | `cotidiano/chuveiro-eletrico.svg` |
| 52 | **Filtro de barro** | Cilindro terracota + tampa cônica + torneira | ❌ falta | `cotidiano/filtro-barro.svg` |
| 53 | **Placa de BR** | Placa amarela rodoviária retangular | ❌ falta | `cotidiano/placa-br.svg` |
| 54 | **Copo americano** | Trapézio + estrias horizontais | ❌ falta | `cotidiano/copo-americano.svg` |
| 55 | **Botijão de gás** | P13 vermelho + alça + amarelo | ❌ falta | `cotidiano/botijao-gas.svg` |
| 56 | **Pote de sorvete reutilizado** | Pote redondo + tampa | ❌ falta | `cotidiano/pote-sorvete.svg` |
| 57 | **Faixa de caminhão** | Faixa traseira pintada | ❌ falta | `cotidiano/faixa-caminhao.svg` |
| 58 | **Carimbo de protocolo** | Selo redondo "RECEBIDO" | ❌ falta | `cotidiano/carimbo-protocolo.svg` |
| 59 | **Pasta AZ** | Lombada + alavanca metal | ❌ falta | `cotidiano/pasta-az.svg` |
| 60 | **Kombi** | Silhueta lateral creme | ❌ falta | `cotidiano/kombi.svg` |
| 61 | **Letreiro pintado à mão** | Moldura ornamentada + handpaint | ❌ falta | `cotidiano/letreiro-pintado.svg` |
| 62 | **Estufa de salgado** | Vidro + base metal | ❌ falta | `cotidiano/estufa-salgado.svg` |
| 63 | **Mesa de plástico de bar** | Quadrada + 4 pernas | ❌ falta | `cotidiano/mesa-plastico.svg` |
| 64 | **Cadeira de plástico de bar** | Encosto vazado | ❌ falta | `cotidiano/cadeira-plastico.svg` |
| 65 | **Guardanapeira de boteco** | Cilindro inox + guardanapos | ❌ falta | `cotidiano/guardanapeira.svg` |
| 66 | **Cadeira longarina** | Fileira repartição | ❌ falta | `cotidiano/cadeira-longarina.svg` |
| 67 | **Canga de praia** | Tecido + franjas | ❌ falta | `cotidiano/canga.svg` |
| 68 | **Sacola de feira listrada** | Listras verticais coloridas | ❌ falta | `cotidiano/sacola-feira.svg` |

### Bloco 12 — Display fonts brasileiros

| Token | Família | Vibe | Uso |
|---|---|---|---|
| `--font-letreiro` | Caveat | Handpaint padaria/comércio | Letreiros, sinalização cívica fictícia |
| `--font-jornal` | PT Serif Caption | Manchete editorial densa | Headlines de impacto, blockquotes históricas |
| `--font-cordel` | Bevan | Display chunky tipo woodcut | Carimbos, faixas, cabeçalhos folk |

## Estilo dos ícones — 4 categorias com regras claras

| Categoria | Vibe | Cor | Stroke | viewBox | Casos |
|---|---|---|---|---|---|
| **Geométrico funcional** | Modernista limpo | `currentColor` (herda) | 8px stroke, fill=none | 100×100 | Patterns, ícones de seção, tinta-via-CSS |
| **Silhueta cívica** | Sinalização pública | Paleta cobogó fixa quando icônica (orelhão amarelo, bonde amarelo+vermelho); senão `currentColor` | preenchido + detalhes finos | 100×100 | Ícones grandes 48-200px, ornamentos figurativos |
| **Folk linha xilográfica** | Cordel/Carranca/Berimbau | preto sólido (ou `currentColor`) | traços grossos irregulares (~3-5px), zero fill | 100×100 | Ornamentos especiais, contextos folk pontuais |
| **Cotidiano brasileiro** | "Grita Brasil" imediato — doméstico/comercial/burocrático | Paleta cobogó fixa quando icônica (botijão vermelho, kombi creme); `currentColor` quando neutro | Silhueta sinalética + detalhes mínimos | 100×100 | Ícones de seção de aplicação, recipes cívicas, ornamentos cotidianos |

## Estrutura técnica — `src/icons/` + `BrIcon.svelte`

```
src/icons/
  cotidiano/
    botijao-gas.svg
    cadeira-longarina.svg
    cadeira-plastico.svg
    canga.svg
    carimbo-protocolo.svg
    chuveiro-eletrico.svg
    copo-americano.svg
    estufa-salgado.svg
    faixa-caminhao.svg
    filtro-barro.svg
    guardanapeira.svg
    kombi.svg
    letreiro-pintado.svg
    mesa-plastico.svg
    pasta-az.svg
    placa-br.svg
    pote-sorvete.svg
    sacola-feira.svg
  geometric/
    cobogo-circular.svg
    cobogo-hexagonal.svg
    cobogo-losango.svg
    cobogo-cruz.svg
    calcada-onda.svg
    calcada-ipanema.svg
    pedra-portuguesa.svg
    azulejo-modernista.svg
    bulcao.svg
    concretismo.svg
    marajoara.svg
    cestaria.svg
    chita.svg
    rosacea-barroca.svg
    burle-marx.svg
  civic/
    orelhao.svg
    bonde.svg
    coreto.svg
    palafita.svg
    fachada-art-deco.svg
    caixa-dagua.svg
    jangada.svg
    barco-ribeirinho.svg
    guardasol.svg
    bule.svg
    cadeira-fio.svg
  folk/
    carranca.svg
    berimbau.svg
    sanfona.svg
    estandarte-maracatu.svg
    cordel-ornament.svg
```

`src/components/BrIcon.svelte`:

```svelte
<script lang="ts" module>
  // Vite glob import — todos os SVGs como raw strings
  const modules = import.meta.glob('/src/icons/**/*.svg', { eager: true, query: '?raw', import: 'default' });
  const registry: Record<string, string> = {};
  for (const [path, content] of Object.entries(modules)) {
    const match = path.match(/\/icons\/[^/]+\/([^/]+)\.svg$/);
    if (match) registry[match[1]] = content as string;
  }
  export const ICON_NAMES = Object.keys(registry).sort();
</script>

<script lang="ts">
  let {
    name,
    size = 48,
    color,
    title,
    'aria-hidden': ariaHidden,
  }: {
    name: string;
    size?: number;
    color?: string;
    title?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
  } = $props();

  const svg = $derived(registry[name]);
</script>

{#if svg}
  <span
    class="br-icon"
    style:width="{size}px"
    style:height="{size}px"
    style:color={color ?? 'inherit'}
    role={ariaHidden ? undefined : 'img'}
    aria-hidden={ariaHidden}
    aria-label={title}
  >
    {@html svg}
  </span>
{:else}
  <span class="br-icon br-icon--missing" style:width="{size}px" style:height="{size}px">?</span>
{/if}

<style>
  .br-icon { display: inline-flex; align-items: center; justify-content: center; }
  .br-icon :global(svg) { width: 100%; height: 100%; }
  .br-icon--missing {
    border: 1px dashed var(--vermelho);
    color: var(--vermelho);
    font-family: var(--font-display);
  }
</style>
```

Uso:

```astro
<BrIcon name="cobogo-circular" size={64} color="var(--azul)" />
<BrIcon name="orelhao" size={120} title="Orelhão" />
<BrIcon name="berimbau" size={48} aria-hidden />
```

### Pattern auto-gerado (futuro, fora desta wave)

Cada SVG geométrico também serve como `background-image` via build step que gera `dist/patterns/{name}.svg` na public dir + classes `.pattern-{name}` em `global.css`. Isso unifica icon library + pattern library — mas só implementa quando os SVGs estiverem prontos.

## Mapa de waves (revisado pós-50-references)

### Wave A0 — Icon library scaffold + 15 ícones de validação
1 sessão. Cria `src/icons/{geometric,civic,folk}/` + `BrIcon.svelte` + 15 SVGs (5 de cada estilo) pra validar consistência:
- **Geometric**: calcada-onda, pedra-portuguesa, azulejo-modernista, marajoara, concretismo
- **Civic**: orelhao, bonde, coreto, palafita, caixa-dagua
- **Folk**: carranca, berimbau, sanfona, cordel-ornament, estandarte-maracatu

Owner revisa o PR, ajusta padrão visual se necessário antes de escalar.

### Wave A1 — Geometric tier (10 SVGs restantes paralelos)
Move os 4 cobogó-* já existentes em `public/patterns/` pra `src/icons/geometric/` + adiciona: bulcao, cestaria, chita, rosacea-barroca, burle-marx, calcada-ipanema.

### Wave A2 — Civic tier (6 SVGs restantes)
fachada-art-deco, jangada, barco-ribeirinho, guardasol, bule, cadeira-fio.

### Wave A3 — Folk extras (opcional, ~3 SVGs)
Refinos no folk + qualquer extra (ex: pipa, bandeirinhas em variante linha).

### Wave B — Brazilian display fonts + tonal themes (independente)
Como antes: `--font-letreiro`, `--font-jornal`, `--font-cordel`, `theme-lambe`, `theme-carimbo`, etc.

### Wave C — Decorative wrapper components
Compostos a partir dos ícones: `Stamp.svelte`, `Lambe.svelte`, `Sign.svelte`, `Pennant.svelte`, `Bandeirinhas.svelte`, `Foliage.svelte`, `RiverMap.svelte`.

### Wave D — Page integration / showcase
- Hero usa `BrIcon` ou pattern de fundo
- `/foundations/icons` na docs com showcase de todos
- Manifesto seção "Referências visuais"

## Princípios atualizados

1. **3 estilos coexistem mas não se misturam num mesmo bloco.** Não combinar geometric + folk no mesmo cartão.
2. **Folk com peso histórico, não decoração.** Carranca, marajoara, cordel sempre com legenda/contexto, nunca solto.
3. **Cor cívica é semântica.** Orelhão amarelo, bonde amarelo+vermelho, faixa-caminhão vermelho — essas cores são parte da identidade do objeto, não escolha estilística.
4. **Geometric = combinável infinitamente.** Esses são pra usar livre como background, ícone, pattern.
5. **Tabuleiro de acarajé não vira ícone.** Comida regional figurativa específica não cabe — só a referência cromática (azuis baianos).
6. **Cotidiano não é folk.** Pasta AZ, copo americano, kombi não são "tema brasileiro" — são objetos materiais que sinalizam o país sem caricaturização. Tratar com sobriedade silhuetária, não com nostalgia decorativa.
7. **Tudo no repo aparece no Pages.** Nenhum componente, ícone, pattern, theme ou recipe é "interno". Se está versionado, está documentado e showcased em alguma página de `/foundations` ou `/components`.

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
