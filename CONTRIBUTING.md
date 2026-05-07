# Contributing to COBOGÓ

Thank you for your interest in contributing to the COBOGÓ design system!

## Local Development

To run the project locally:

```bash
npm install
npm run dev
```
The site will be available at `http://localhost:4321`.

## Tech Stack

This project uses:
- Astro 5
- `@astrojs/svelte` integration
- Svelte 5
- TypeScript
- **Pico CSS (classless build)** as the styling foundation

## Project Structure

- `src/components/`: Svelte 5 components. Render semantic HTML; no `class` attributes.
- `src/layouts/`: Astro layouts. Pure semantic structure (`<header>`, `<main>`, `<aside>`, `<footer>`).
- `src/pages/`: Astro pages.
- `src/styles/global.css`: Global CSS tokens — declares COBOGÓ tokens and maps them onto Pico's `--pico-*` variables. Imports `@picocss/pico/css/pico.classless.css`.

## Authoring Rules (read before writing code)

COBOGÓ is a **semantic-only** design system on top of Pico CSS:

1. **No `class` attributes** in pages, layouts, or component markup. The linter / review will reject them.
2. **No utility classes**, no BEM, no component class names. If something needs styling, pick the right semantic element (`<article>`, `<section>`, `<nav>`, `<aside>`, `<figure>`, `<dl>`, `<button>`, `<details>`, …).
3. **Variants live on `data-*` attributes** (`data-intent`, `data-pattern`, `data-theme`) or standard ARIA attributes (`aria-invalid`, `aria-current`, `aria-expanded`). Style them with attribute selectors.
4. **Dark mode** is `<html data-theme="light|dark|auto">` — never `.dark-mode`.
5. **Tokens, not literals.** Reference COBOGÓ tokens (`--azul`, `--papel-00`, …) or Pico variables (`--pico-*`). Never hard-code colors, radii, or spacing.
6. **Component CSS overrides Pico variables**, it does not invent class-based selectors. Prefer `:where(article) { --pico-border-radius: var(--r-soft); }` over `.cobogo-card { … }`.

## Pull Requests

Before submitting a PR, please make sure that:
- `npm run build` passes without errors.
- If you change any types, run `npx astro check` to verify TypeScript typings.
- No new `class=` attributes were introduced in `src/**/*.{astro,svelte}` (grep your diff). Variants must use `data-*` attributes.
- New styling overrides Pico variables (`--pico-*`) rather than introducing class-based selectors.

## Commit Convention

We use a conventional-like format. Please use short, imperative commit messages without emoji prefixes.

Branches should follow these prefixes:
- `feat/`: New features
- `fix/`: Bug fixes
- `chore/`: Maintenance, refactors, dependencies
- `docs/`: Documentation updates

## Reporting Issues

To report bugs or suggest new features, please open a GitHub Issue in the repository:
[franklinbaldo/cobogo](https://github.com/franklinbaldo/cobogo)
