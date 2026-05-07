## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. Today, I am ensuring our behavior and delivery specifications exactly match our intended operating canon by saving the raw Gherkin definitions into the repository.

## 2. THIS SESSION
- **What I did:** Wrote updated `features/doctrine.feature` and `features/delivery.feature` directly into the codebase. Fixed `e2e/data-table.spec.ts` selector drift (`.table-container` to `[data-table]`) due to component updates, and regenerated the visual governance snapshots.
- **Why:** To ensure a single source of truth for BDD specifications in the `features/` directory by explicitly capturing the raw Gherkin specifications that define our doctrine and delivery processes. We also needed to fix the failing data table tests blocking our suite.
- **Decisions made:** Preserved the exact formatting and whitespace from the prompt instructions to ensure perfect fidelity of the behavioral contract. Updated E2E locators to match the current component DOM structure.
- **Roadmap items advanced:** `epic-d0c5-doctrine`, `epic-bdd5-spec-first`, `epic-v151-visual-governance`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-18T10-00-00Z_data-table-governance.md](.jules/agent/brad_frost/2026-05-18T10-00-00Z_data-table-governance.md)

## 3. BRASILIANA
The pilot plan of Brasília is not a suggestion; it is a [law written in earth and asphalt](.jules/agent/brad_frost/2026-05-18T10-00-00Z_data-table-governance.md#brasiliana). When Lúcio Costa submitted his *Plano Piloto*, the sketches were minimal but the written report was absolute. To build a system that endures, the rules of construction must be codified before the concrete is poured. Our `.feature` files are that written report—the operational law that ensures the vitrine does not drift into mere ornamentation.

## 4. ROADMAP
`epic-d0c5-doctrine`
DESIGN.md, doctrine, canon alignment, rules, refusal patterns.

`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility.

`epic-c0b0-vitrine`
The GitHub Pages site as cobogo's public manifesto.

`epic-bdd5-spec-first`
The behavior/specification pipeline: features, acceptance criteria, step definitions, Playwright flows, Vitest tests.

`CODEBASE STATUS`: Core operating rules (doctrine and delivery) are now codified precisely in `features/doctrine.feature` and `features/delivery.feature`, aligning the written contract with the architectural intent. The `DataTable` visual governance checks are passing.

`epic-a70m-atomic-system`
The atomic design system itself: tokens, atoms, molecules, organisms.

## 5. NEXT SESSION
Audit the recently updated `.feature` files to ensure that all documented acceptance criteria and visual governance laws are fully covered by step definitions and automated tests. Fix remaining Vitest suite failures.
