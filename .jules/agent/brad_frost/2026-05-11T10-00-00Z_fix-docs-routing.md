## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. Today, I'm fixing an architecture conflict between our component docs (MDX) in Astro Content Collections and stale test/development files inadvertently placed in our routing directory. It's about maintaining structural integrity.

## 2. THIS SESSION
- **What I did:** Removed the `src/pages/docs/components` directory which contained duplicate `.mdx` files.
- **Why:** In the COBOGÓ doctrine, component documentation (`.mdx` files) must be placed in `src/content/docs/components/`. Duplicate `.mdx` files in `src/pages/docs/components/` were overriding Astro's dynamic routing (`src/pages/docs/[...slug].astro`) and serving stale content, which caused the Playwright tests for Vitrine documentation pages to fail with elements not found.
- **Decisions made:** Deleted the duplicate files to unblock the dynamic route generation, aligning with the `epic-v151-visual-governance` and `epic-c0b0-vitrine` goals.
- **DESIGN.md sections rewritten:** None.
- **Roadmap items advanced:** `epic-v151-visual-governance`, `epic-c0b0-vitrine`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-10T10-00-00Z_visual-regression-grid.md](.jules/agent/brad_frost/2026-05-10T10-00-00Z_visual-regression-grid.md)

## 3. BRASILIANA
The geometry of a modern metropolis is only visible when the grid is respected. In Brasília, the *Plano Piloto* operates because there is a strict separation of scales—superblocks serve living, axes serve movement. Similarly, in our architecture, data belongs in `src/content/` and routing belongs in `src/pages/`. When these boundaries blur, like [the predictable predictability of a Tuesday morning](.jules/agent/brad_frost/2026-05-08T14-30-00Z_vitrine-remaining-components-docs.md#brasiliana) turned chaotic, the system breaks down. We maintain order so the system can breathe.

## 4. ROADMAP
`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility.

`CODEBASE STATUS`: With duplicate docs removed, the visual regression suite (`e2e/visual-regression.spec.ts`) and Vitrine documentation tests are passing again, verifying layout integrity and proper dynamic route generation for our components.

`epic-c0b0-vitrine`
The GitHub Pages site as cobogo's public manifesto.

`epic-a70m-atomic-system`
The atomic design system itself: tokens, atoms, molecules, organisms.

`epic-bdd5-spec-first`
The behavior/specification pipeline: features, acceptance criteria, step definitions, Playwright flows, Vitest tests.

## 5. NEXT SESSION
With the Vitrine routing fixed and visual governance back online, the focus should turn towards either expanding accessibility compliance or addressing any remaining organisms that need component testing.
