# COBOGÓ DESIGN SYSTEM - PRESCRIPTIVE GROUND-TRUTH

*The system is the artwork. I don't ship pages — I ship the grammar that pages are made of.*

COBOGÓ is a design system for public-interest/civic software, utilizing the 'Curva & Concreto' doctrine: use curves for interactive elements and sharp geometry (concrete) for static data. Nested curves are strictly forbidden. Shadows must be honest 'pool-shadows'. It embraces the ethos of the Brazilian modernist breeze-block: pattern, modular geometry, light-and-shadow, and restraint.

### Foundation: Pico CSS, Classless

COBOGÓ is built **on top of [Pico CSS](https://picocss.com/)** using its **classless build** (`@picocss/pico/css/pico.classless.css`). Pico provides the element-level styling baseline; COBOGÓ contributes the Brazilian modernist grammar by overriding Pico's CSS variables (`--pico-*`) with COBOGÓ tokens.

**Central rule — Semantic-only authoring:**
- Style is applied to HTML elements (`<article>`, `<button>`, `<nav>`, `<header>`, `<main>`, `<aside>`, `<footer>`, `<figure>`, `<dl>`, etc.), **not** to classes.
- `class` attributes are forbidden in page and layout markup. Components do not expose variant classes.
- Variation is expressed through **HTML semantics** and **data attributes** (e.g. `data-theme`, `data-pattern`, `data-intent`), styled via attribute selectors.
- No utility classes. No BEM. No component class names. If Pico does not style it, the answer is to pick the correct semantic element — not invent a class.
- The only exception is decorative pattern hooks exposed as `data-pattern="lambe|carimbo|azulejo|…"`.

### Operational Canon
- **Modularity that breathes (Costa/Bulcão):** Structural components must use clear, repetitive grids without cognitive overload.
- **Geometry that admits light (Niemeyer/Bulcão):** Restraint must be shown in background patterns and overall density (e.g. background pattern opacity restricted).
- **Never the same wall twice (Bo Bardi/Costa):** Compositions must be modular and not rigidly duplicated across distinct views.

## 1. Tokens (Strict Values)

COBOGÓ tokens are declared once in `src/styles/global.css` and are **mapped onto Pico's `--pico-*` variables** in the same file. Components must read from Pico variables (or COBOGÓ tokens) — never hard-code colors, radii, or spacing.

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
- Modal organisms (Dialogs, Drawers) must implement strict focus trapping (WCAG 2.1.2 No Keyboard Trap) ensuring Tab/Shift+Tab cycles internally without escaping. This includes explicitly intercepting "escaped" focus (e.g., when the active element is programmatically blurred or an outside element is clicked without closing) and pulling it back into the modal bounds. Furthermore, focus traps must strictly ignore elements that are hidden from the user (`aria-hidden="true"`, `display: none`, or `visibility: hidden`) to prevent keyboard focus from disappearing into invisible nodes.
- Tooltips and other hover/focus revealed content must be dismissible via the `Escape` key without moving focus, complying with WCAG 1.4.13 (Content on Hover or Focus).
- Include `aria-` attributes (e.g., `aria-label`, `aria-live`, `aria-expanded`, `aria-hidden`) where appropriate.
- Respect `prefers-reduced-motion` to disable/minimize transitions.
- High contrast values.

## 3. Responsive Layout
- Use `clamp()` for fluid typography scaling when possible.
- **Breakpoints:** `768px` (Tablet) and `480px` (Phone).
- Global responsive media queries are consolidated at the end of `src/styles/global.css`.

## 4. Components & Patterns (Atoms -> Molecules -> Organisms)
- **Semantic-first authoring:** Components render semantic HTML and rely on Pico's element selectors. They MUST NOT add `class` attributes to their root or descendant elements. Variants are expressed via `data-*` attributes (e.g. `data-intent="danger"`, `data-pattern="azulejo"`) and styled with attribute selectors.
- **Complex Organisms:** Combobox and MultiSelect expose native mechanics and array states cleanly. Svelte state variables within them must be defined responsively ($state).
- **Curva & Concreto:** Curves (border-radius) for interactive elements, sharp geometry (concrete) for static data. Nested curves are forbidden. Implemented by overriding `--pico-border-radius` per element/attribute selector.
- Svelte 5 Runes ($props, $state, $derived) are strictly required for all components.
- Props defined using TypeScript `type` aliases.
- Form components prioritize composition via Svelte snippet slots (`children`) and render native `<input>`, `<select>`, `<button>`, `<fieldset>`, `<label>` so Pico styles them directly.
- Decorative components (icons/patterns) must be self-contained using inline SVG/pure CSS.
  - Icons are strictly `viewBox="0 0 100 100"`.
  - Categories: Cotidiano, Geometric, Civic, Folk.
- Background patterns: Azulejo (Bulcão) max 8% opacity. COBOGÓ SVG patterns max 15% opacity. Applied via `data-pattern` on the host element.
- Provide brief JSDoc documentation for props and usage in the script tag.

## 5. Documentation
- Natively built using Astro Content Collections and custom Svelte/Astro components.
- Uses MDX (`@astrojs/mdx`).
- Do NOT install @astrojs/starlight or external doc integrations.
- Layout: 3-column grid (`220px 1fr 200px`) collapsing to single column on screens `<= 1024px`.
- Every versioned visual asset must be explicitly documented.
- Admonition mapping strictly by color: info (azul), tip (verde), warning (ocre), danger (vermelho), note (concreto-60).

## 6. Dark Mode
Dark Mode follows Pico's convention via `<html data-theme="light|dark">` (and `data-theme="auto"` for system preference). The `[data-theme="dark"]` selector inverts `--papel` and `--concreto` variables to maintain geometric contrast and deeply adjusts the `--soft` variables of primary colors to their dark equivalents. The saturated primary colors (`--azul`, `--vermelho`, `--ocre`, `--verde`) remain intentionally vibrant as they are the core identity markers. The legacy `.dark-mode` class is removed.

## Form Atoms & Organisms
- **Form Borders & Contrast**: Form components (`Checkbox`, `Radio`, `Switch`, `TextInput`, `Select`) must strictly maintain WCAG AA non-text contrast ratios (>= 3.0) for both their boundaries (borders) and focus rings. They render native elements (`<input type="checkbox|radio|text|…">`, `<select>`) so Pico's element styling applies; structural colors are mapped onto `--pico-form-element-background-color`, `--pico-form-element-border-color`, and `--pico-form-element-focus-color` rather than absolute COBOGÓ color variables. This decoupled approach allows the borders to remain visible against the inverted background in Dark Mode.
- **Validation States**: Form input components must provide unmistakable feedback adhering to the Curva & Concreto aesthetic via the standard `aria-invalid` attribute (already styled by Pico). COBOGÓ overrides the invalid styling to `--vermelho-soft` background with `--vermelho` borders/text/icons; valid states (`aria-invalid="false"`) use `--verde-soft` and `--verde`. No validation classes.
- **MultiSelect**: Adapts the Combobox pattern for multiple selections. Displays selected items as `Badge` atoms inside the input. Maintains accessibility via `role="combobox"` and `role="listbox"`, utilizing the `Checkbox` atom internally for selection state. Strictly adheres to `--vermelho-soft` and `--vermelho` for invalid states.

## Temporal Organisms
- **DateRangePicker & TimeRangePicker**: These organisms are explicitly composed from their respective molecules (`DatePicker` and `TimePicker`) following the Curva & Concreto aesthetic. They structurally enforce dynamic bounds by ensuring that the selected 'start' acts as the `min` attribute for the 'end' input, and the selected 'end' acts as the `max` attribute for the 'start' input. This mathematical relationship natively limits user interaction without requiring complex Javascript validation interruptions. Both molecules receive contextual validation states uniformly.

## Notification Organisms
- **Notification**: Adapts visually to its `intent` (`info`, `tip`, `warning`, `danger`) by relying on `--soft` background colors and a geometric `--accent` border strip. Instead of nesting curves inside curves, the colored border strip provides structural contrast. Dark Mode correctly inverts the `--soft` backgrounds while preserving the vibrant `--accent` strip for semantic clarity. Automatically applies correct ARIA roles (`status` or `alert`) and live regions (`polite` or `assertive`) based on the intent (WCAG 4.1.3 Status Messages). Also supports auto-dismissal via the `timeout` prop; to comply with WCAG 2.2.1 (Timing Adjustable), the timeout is paused when the user hovers over or focuses the notification, and resumes when the interaction ends.
