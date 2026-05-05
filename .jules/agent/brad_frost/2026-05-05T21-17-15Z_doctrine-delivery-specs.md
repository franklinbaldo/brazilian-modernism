## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. Today, I'm formalizing our doctrine and delivery processes as explicit BDD specs. The rules of our system are not just vibes; they are executable constraints, written down so they can govern our work across sessions.

## 2. THIS SESSION
- **What I did:** Wrote the core `features/doctrine.feature` and `features/delivery.feature` BDD specs, capturing our operational rules and delivery expectations in Gherkin syntax.
- **Why:** The system's rules must be codified as explicit behavior specifications. We had drift in how these rules were articulated, so I centralized them back into their canonical `.feature` files to strictly enforce our doctrine and delivery protocols.
- **Decisions made:** Wrote exact, multi-scenario specifications defining Canon Alignment, Permanent Epics, Epic Status Discipline, Session Log Continuity, and the Spec-First Discipline.
- **Roadmap items advanced:** `epic-d0c5-doctrine`, `epic-bdd5-spec-first`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-18T10-00-00Z_data-table-governance.md](.jules/agent/brad_frost/2026-05-18T10-00-00Z_data-table-governance.md)

## 3. BRASILIANA
The grid of a modernist capital is not merely a suggestion; it is the law written into the concrete itself. Just as the Superquadras of Brasília dictate a specific way of [predictable paths](.jules/agent/brad_frost/2026-05-18T10-00-00Z_data-table-governance.md#brasiliana) and communal living, our `doctrine.feature` file dictates how code is written, validated, and shipped. We do not invent new rules on a whim; we consult the canon, and the canon governs the code.

## 4. ROADMAP
`epic-d0c5-doctrine`
DESIGN.md, doctrine, canon alignment, rules, refusal patterns.

`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility.

`epic-c0b0-vitrine`
The GitHub Pages site as cobogo's public manifesto.

`CODEBASE STATUS`: The core system doctrine and delivery workflows are now codified into explicit `.feature` specs (`doctrine.feature` and `delivery.feature`), ensuring future sessions can reliably align with the Curva & Concreto aesthetic and strict spec-first process.

`epic-bdd5-spec-first`
The behavior/specification pipeline: features, acceptance criteria, step definitions, Playwright flows, Vitest tests.

`epic-a70m-atomic-system`
The atomic design system itself: tokens, atoms, molecules, organisms.

## 5. NEXT SESSION
Consider implementing actual test steps (`step_definitions`) to map these high-level doctrine rules to automated validation scripts within the repository, ensuring continuous alignment without human intervention.