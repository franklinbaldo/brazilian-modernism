## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. Today, we addressed a specificity bug in our form validation states. In the Curva & Concreto doctrine, an invalid input isn't just an error message; it must present unmistakable, geometric feedback using `--vermelho` and `--vermelho-soft`. But CSS specificity is a stubborn beast. Our `checked` pseudo-class styles for `Checkbox`, `Radio`, and `Switch` were silently overriding the `.invalid` and `.valid` wrapper classes when a user actually selected the invalid item. A form input that is invalid but visually appears active and correct (blue) is a betrayal of user trust. We corrected the hierarchy, ensuring that semantic validation states always win over generic active states. It's not just about colors; it's about making the interface tell the truth.

## 2. THIS SESSION
- **What I did:** Fixed CSS specificity issues in `Checkbox`, `Radio`, and `Switch` components where `checked` styles (`--azul`) were overriding validation states (`--vermelho` and `--verde`). Also wrote a Gherkin feature spec `validation-states.feature` to document this behavior, and added explicit tests in `ValidationStates.test.ts`.
- **Why:** To ensure that when an input is both checked AND invalid (or checked and valid), it correctly reflects its validation state instead of falling back to the default "active" blue color. This provides unmistakable feedback.
- **Decisions made:** Added explicit CSS rules combining `.invalid`/`.valid` with `input:checked`. Kept the logic purely in CSS to avoid unnecessary JavaScript reactivity overhead for simple styling.
- **Alternatives rejected:** Rejected using Svelte classes or inline styles for this fix, as the components are already structured to use sibling CSS selectors (`input:checked + .visual`). Fixing the CSS specificity was the most native and performant approach.
- **DESIGN.md sections cited:** "Form Atoms & Organisms" (Validation States).
- **Roadmap items advanced:** `epic-bdd5-spec-first`, `epic-a70m-atomic-system`, and `epic-d0c5-doctrine`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-04T23-45-00Z_notification-wcag-221.md](.jules/agent/brad_frost/2026-05-04T23-45-00Z_notification-wcag-221.md)

## 3. BRASILIANA
The rules of traffic here are sometimes less about the painted lines and more about the shared understanding of momentum. You learn to read the slight drift of a car ahead, not just its turn signal. In [my earlier note on the bus stops in the rain](.jules/agent/brad_frost/2026-04-18T09-12-03Z_bus-stop-rain.md#brasiliana), I observed how rigid systems flex under human pressure. But there are moments where clarity must be absolute. An invalid form field is one of them. It cannot be ambiguous. It cannot say "I am selected" in blue while whispering "but I am wrong" in a hidden ARIA attribute. The interface must commit. It must use the `vermelho` entirely. In a culture that navigates so much nuance, the design system must sometimes provide the anchor of unambiguous truth.

## 4. ROADMAP
`epic-a70m-atomic-system`
The atomic design system itself: tokens, atoms, molecules, organisms, composition rules, reuse discipline, and component API coherence.

`CODEBASE STATUS`: Data entry foundational atoms (TextInput, Select, Checkbox, Radio, Switch) now correctly display validation states (`--vermelho` and `--verde`), even when in their `checked` or active states, adhering to the Curva & Concreto aesthetic. Tested via Vitest and BDD specs.

`tactical-1p2m-validation-states` (parent: epic-a70m)
Ensuring all form inputs provide unmistakable validation feedback.

`task-5e4f-checked-validation` (parent: tactical-1p2m)
Done. Fixed CSS specificity for checked validation states in Checkbox, Radio, and Switch.

`epic-bdd5-spec-first`
The behavior/specification pipeline: features, acceptance criteria, step definitions.

`epic-v151-visual-governance`
Visual accountability across sessions.

## 5. NEXT SESSION
With foundational atoms now correctly handling validation states natively, the next logical step is to build or refine complex form molecules that rely on these atoms, such as the `MultiSelect` component. We need to ensure that `MultiSelect` composes these `Checkbox` atoms correctly while maintaining the `FormField` context and validation aesthetics, specifically verifying how it handles arrays of selected items and invalid states at the group level.
