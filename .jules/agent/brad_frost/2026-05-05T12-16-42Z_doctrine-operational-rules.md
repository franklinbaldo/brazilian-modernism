## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. The system is the artwork. Today, I am enforcing our foundational operational canon by explicitly writing our doctrinal rules into the prescriptive ground-truth of `DESIGN.md` and binding those rules to programmatic evidence. A doctrine document that sounds profound but does not constrain code is a failure mode we refuse.

## 2. THIS SESSION
- **What I did:** Formalized three operational rules derived from the Brazilian modernist canon into `DESIGN.md`: "Modularity that breathes", "Geometry that admits light", and "Never the same wall twice". Added Gherkin spec `features/doctrine-operational-rules.feature` and programmatic assertion in `e2e/composition.spec.ts` explicitly checking that our composition wall uses the Grid component with a 32px (2rem) gap.
- **Why:** The DESIGN.md contract states that the canon is the highest court, served by DESIGN.md, which serves the code. If we claim "modularity that breathes", we must programmatically assert that the layout grids exist and respect the spacing tokens.
- **Decisions made:** Targeted the composition wall at `/cobogo/composition` to assert the "modularity that breathes" doctrine, leveraging computed styles in Playwright.
- **Roadmap items advanced:** `epic-d0c5-doctrine`, `epic-v151-visual-governance`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-17T10-00-00Z_date-time-picker-tests.md](.jules/agent/brad_frost/2026-05-17T10-00-00Z_date-time-picker-tests.md)

## 3. BRASILIANA
The cobogó is fundamentally a rhythm. It is not just about blocking the sun, but about establishing a cadence of light that [within predictable bounds](.jules/agent/brad_frost/2026-05-17T10-00-00Z_date-time-picker-tests.md#brasiliana) allows the architecture to breathe. When you stand in the National Theatre in Brasília, the grid is unmistakable; it never attempts to disguise its modularity. Similarly, our UI must not hide its structural grid. A 2rem gap is not just spacing; it is the necessary air between structural pillars.

## 4. ROADMAP
`epic-d0c5-doctrine`
DESIGN.md, doctrine, canon alignment, rules, refusal patterns.
`CODEBASE STATUS`: `DESIGN.md` has been updated with explicit operational rules derived from the Brazilian canon, and the "modularity that breathes" rule is now bound to a programmatic E2E check in `e2e/composition.spec.ts`.

`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility.

`epic-c0b0-vitrine`
The GitHub Pages site as cobogo's public manifesto.

`epic-bdd5-spec-first`
The behavior/specification pipeline: features, acceptance criteria, step definitions, Playwright flows, Vitest tests.

`epic-a70m-atomic-system`
The atomic design system itself: tokens, atoms, molecules, organisms.

## 5. NEXT SESSION
Consider implementing programmatic checks for the "Geometry that admits light" doctrine, specifically targeting the background pattern opacity limits to ensure they never exceed 15%.
