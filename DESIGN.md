# DESIGN.md
# COBOGÓ — A Brazilian modernist design system

**Identity**: COBOGÓ — Sistema visual brasileiro
**Design Base**: bm2.zip

This document prescribes what the code SHOULD be, acting as the absolute source of truth for design decisions. When code disagrees, the code is wrong.

## 1. Tokens

### 1.1 Colors

**Neutrals (Paper / Concrete)**
- `--papel-00`: `#FBF8F1`
- `--papel-10`: `#F5F1E8`
- `--papel-20`: `#EDE7D8`
- `--papel-30`: `#DCD4BE`
- `--concreto-40`: `#B8B0A0`
- `--concreto-60`: `#6B6455`
- `--concreto-80`: `#2E2A24`
- `--concreto-90`: `#1A1814`

**Saturated Primaries**
- **Azul**: Base `--azul` (`#1B2B4B`), Bright `--azul-bright` (`#2D4A7B`), Soft `--azul-soft` (`#E6ECF5`)
- **Vermelho**: Base `--vermelho` (`#C8472E`), Deep `--vermelho-deep` (`#9C3422`), Soft `--vermelho-soft` (`#F9E7E1`)
- **Ocre**: Base `--ocre` (`#D9A441`), Deep `--ocre-deep` (`#A87A1F`), Soft `--ocre-soft` (`#F7EED6`)
- **Verde**: Base `--verde` (`#2E6B4A`), Soft `--verde-soft` (`#DDEBE1`)

**Brazilian Extras (Cotidiano + Festa)**
- **Amarelo**: Base `--amarelo` (`#F5D547`), Festa `--amarelo-festa` (`#F5D547`), Soft `--amarelo-soft` (`#FCF1B7`)
- **Terracota**: Base `--terracota` (`#A0522D`), Soft `--terracota-soft` (`#E8D5C4`)

### 1.2 Spacing

Generous negative space is fundamental to the COBOGÓ visual identity.
- `--space-1`: `0.25rem` (4px)
- `--space-2`: `0.5rem` (8px)
- `--space-3`: `1rem` (16px)
- `--space-4`: `1.5rem` (24px)
- `--space-5`: `2rem` (32px)
- `--space-6`: `3rem` (48px)
- `--space-8`: `4rem` (64px)
- `--space-12`: `6rem` (96px)
- `--space-16`: `8rem` (128px)

### 1.3 Typography

We strictly use specific fonts to maintain a luxurious, well-spaced rhythm with generous negative space, avoiding cognitive overload.

**Families**
- **Display**: Archivo, Archivo Black (`--font-display`)
- **Display Alternate**: Fraunces, Georgia (`--font-display-alt`)
- **Sans Serif**: Archivo (`--font-sans`)
- **Serif**: Piazzolla, Georgia (`--font-serif`)
- **Monospace**: JetBrains Mono (`'JetBrains Mono', monospace`)

**Scale Variables**
- `--t-micro`: 11px
- `--t-small`: 13px
- `--t-body`: 16px
- `--t-lede`: 19px
- `--t-h4`: 22px
- `--t-h3`: 30px
- `--t-h2`: 44px
- `--t-h1`: 68px
- `--t-display`: 112px

### 1.4 Radii: "Curva & Concreto" Doctrine

The visual doctrine of COBOGÓ dictates the use of curves for interactive elements and sharp geometry (concrete) for static data. Nested curves are strictly forbidden.

- `--r-1`: `2px` (Small curves, usually nested/inner when absolute necessary or structural borders)
- `--r-soft`: `8px` (Standard interaction curves)
- `--r-pill`: `9999px` (Pill shapes)

### 1.5 Elevation & Shadows

Shadows must be honest 'pool-shadows', creating depth that feels physical rather than digital.

- `--shadow-1`: `2px 2px 0 var(--concreto-90)` (Sharp, modernist drop)
- `--shadow-2`: `4px 4px 0 var(--concreto-90)` (Deeper sharp drop)
- Pool shadows are implemented as needed via `2px 4px 12px rgba(0,0,0,0.08)`.

### 1.6 Motion

- **Duration**: `--dur-2`: `220ms`
- **Easing**: `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`

## 2. Responsive Rules

Global responsive media queries are consolidated. For mobile responsiveness:
- **Tablet**: Max-width `768px`
- **Phone**: Max-width `480px`

We utilize fluid typography (`clamp()`) for structural headings and major scale shifts.

## 3. Dark Mode

While COBOGÓ favors the natural light-and-shadow of its modernist roots, dark mode requires careful token mapping to invert the relationship between 'Papel' (Paper/Light) and 'Concreto' (Concrete/Dark).

- Background tokens (`--bg`, `--bg-raised`, `--bg-sunken`) will map towards the `--concreto` spectrum (`--concreto-90`, `--concreto-80`).
- Foreground tokens (`--fg`, `--fg-heading`) will invert towards the `--papel` spectrum (`--papel-00`, `--papel-10`).
- Saturated primaries (Azul, Vermelho, Ocre, Verde) may require specific adjusted "-bright" or "-soft" variants to maintain WCAG AA contrast against concrete backgrounds.

## 4. Accessibility

- **WCAG AA Floor**: All components must adhere to WCAG AA accessibility standards at a minimum.
- **Semantic HTML**: Mandatory usage of native semantic elements.
- **Focus Management**: Explicit `focus-visible` states are required for keyboard navigation. No hidden or purely outlined native focus without a designed interaction ring.
- **Reduced Motion**: Respect `prefers-reduced-motion` media queries for any animations/transitions.
- **ARIA**: Include ARIA labels and roles only when semantic HTML does not natively provide context.

## 5. Atomic Components & Patterns

- **Form Components**: Prioritize composition over monolithic components. Wrapper components (e.g., `FormField`) use Svelte 5 snippet slots (`children`) to receive input components. This keeps base components isolated and self-contained.
- **Strict Isolation**: Decorative components must be entirely self-contained using inline SVG or pure CSS/markup, without importing or relying on external components or icons.
- **State Management**: Strictly use Svelte 5 Runes patterns (`$props`, `$state`, `$derived`) for all components. Define props using TypeScript `type` aliases.