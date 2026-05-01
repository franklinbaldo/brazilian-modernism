# COBOGÓ DESIGN SYSTEM - PRESCRIPTIVE GROUND-TRUTH

*The system is the artwork. I don't ship pages — I ship the grammar that pages are made of.*

COBOGÓ is a design system for public-interest/civic software, utilizing the 'Curva & Concreto' doctrine: use curves for interactive elements and sharp geometry (concrete) for static data. Nested curves are strictly forbidden. Shadows must be honest 'pool-shadows'. It embraces the ethos of the Brazilian modernist breeze-block: pattern, modular geometry, light-and-shadow, and restraint.

## 1. Tokens (Strict Values)

### Colors
**Neutrals (Paper / Concrete):**
- `--papel-00`: `#FBF8F1`
- `--papel-10`: `#F5F1E8`
- `--papel-20`: `#EDE7D8`
- `--papel-30`: `#DCD4BE`
- `--concreto-40`: `#B8B0A0`
- `--concreto-60`: `#6B6455` (Muted fg/Note admonition)
- `--concreto-80`: `#2E2A24` (Base fg/Border strong)
- `--concreto-90`: `#1A1814` (Heading fg/Shadow)

**Saturated Primaries:**
- `--azul`: `#1B2B4B` (Info admonition/Primary accent)
- `--azul-bright`: `#2D4A7B`
- `--azul-soft`: `#E6ECF5`
- `--vermelho`: `#C8472E` (Danger admonition)
- `--vermelho-deep`: `#9C3422`
- `--vermelho-soft`: `#F9E7E1`
- `--ocre`: `#D9A441` (Warning admonition)
- `--ocre-deep`: `#A87A1F`
- `--ocre-soft`: `#F7EED6`
- `--verde`: `#2E6B4A` (Tip admonition)
- `--verde-soft`: `#DDEBE1`

### Spacing & Sizing
Generous negative space is mandatory to avoid cognitive overload.

### Type System
- `--font-display`: `"Archivo", "Archivo Black", sans-serif`
- `--font-display-alt`: `"Fraunces", Georgia, serif`
- `--font-sans`: `"Archivo", sans-serif`
- `--font-serif`: `"Piazzolla", Georgia, serif`

*Other approved fonts:* JetBrains Mono, Caveat, PT Serif Caption, Bevan.

**Type Scale:**
- `--t-micro`: `11px`
- `--t-small`: `13px`
- `--t-body`: `16px`
- `--t-lede`: `19px`
- `--t-h4`: `22px`
- `--t-h3`: `30px`
- `--t-h2`: `44px`
- `--t-h1`: `68px`
- `--t-display`: `112px`

### Elevation & Radii
- **Radii:** `--r-1` (2px), `--r-soft` (8px), `--r-pill` (9999px)
- **Shadows:** Honest pool-shadows. `--shadow-1`: `2px 2px 0 var(--concreto-90)`, `--shadow-2`: `4px 4px 0 var(--concreto-90)`

### Motion
- `--dur-2`: `220ms`
- `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`

## 2. WCAG AA Floor
All components **MUST** adhere to WCAG AA accessibility standards.
- Use semantic HTML.
- Support keyboard navigation with explicit `focus-visible` states.
- Include `aria-` attributes (e.g., `aria-label`, `aria-live`, `aria-expanded`, `aria-hidden`) where appropriate.
- Respect `prefers-reduced-motion` to disable/minimize transitions.
- High contrast values.

## 3. Responsive Layout
- Use `clamp()` for fluid typography scaling when possible.
- **Breakpoints:** `768px` (Tablet) and `480px` (Phone).
- Global responsive media queries are consolidated at the end of `src/styles/global.css`.

## 4. Components & Patterns (Atoms -> Molecules -> Organisms)
- **Curva & Concreto:** Curves (border-radius) for interactive elements, sharp geometry (concrete) for static data. Nested curves are forbidden.
- Svelte 5 Runes ($props, $state, $derived) are strictly required for all components.
- Props defined using TypeScript `type` aliases.
- Form components prioritize composition via Svelte snippet slots (`children`).
- Decorative components (icons/patterns) must be self-contained using inline SVG/pure CSS.
  - Icons are strictly `viewBox="0 0 100 100"`.
  - Categories: Cotidiano, Geometric, Civic, Folk.
- Background patterns: Azulejo (Bulcão) max 8% opacity. COBOGÓ SVG patterns max 15% opacity.
- Provide brief JSDoc documentation for props and usage in the script tag.

## 5. Documentation
- Natively built using Astro Content Collections and custom Svelte/Astro components.
- Uses MDX (`@astrojs/mdx`).
- Do NOT install @astrojs/starlight or external doc integrations.
- Layout: 3-column grid (`220px 1fr 200px`) collapsing to single column on screens `<= 1024px`.
- Every versioned visual asset must be explicitly documented.
- Admonition mapping strictly by color: info (azul), tip (verde), warning (ocre), danger (vermelho), note (concreto-60).

## 6. Dark Mode
Dark Mode is defined in `.dark-mode` globally. It strictly inverts the `--papel` and `--concreto` variables to maintain geometric contrast while deeply adjusting the `--soft` variables of primary colors to their dark equivalents. The saturated primary colors (`--azul`, `--vermelho`, `--ocre`, `--verde`) remain intentionally vibrant as they are the core identity markers.

## Form Organisms
- **MultiSelect**: Adapts the Combobox pattern for multiple selections. Displays selected items as `Badge` atoms inside the input. Maintains accessibility via `role="combobox"` and `role="listbox"`, utilizing the `Checkbox` atom internally for selection state. Strictly adheres to `--vermelho-soft` and `--vermelho` for invalid states.

## Notification Organisms
- **Notification**: Adapts visually to its `intent` (`info`, `tip`, `warning`, `danger`) by relying on `--soft` background colors and a geometric `--accent` border strip. Instead of nesting curves inside curves, the colored border strip provides structural contrast. Dark Mode correctly inverts the `--soft` backgrounds while preserving the vibrant `--accent` strip for semantic clarity. Automatically applies correct ARIA roles (`status` or `alert`) and live regions (`polite` or `assertive`) based on the intent.
