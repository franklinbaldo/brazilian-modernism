## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. Today we tackled visual governance for form validation states. A system's doctrine is useless if the CSS specificity hierarchy betrays it in the browser. When a `Select` component is invalid but happens to show placeholder text, the placeholder color must not override the invalid color token. The system must speak with one voice. We fixed that specificity bug, bound our `TextInput` and `Select` atoms properly to the `FormField` context inheritance using Svelte 5 snippets, and wrote the Gherkin specifications to prove it. Most importantly, we codified this visual governance by writing a Playwright test that actually inspects the `getComputedStyle` RGB values. We don't just hope the `--vermelho` token works; we test that the browser actually paints the pixels red. This is how a design system becomes operational law.

## 2. THIS SESSION
- **What I did:** Fixed CSS specificity in `Select.svelte` where `.has-placeholder` overrode the `.invalid` text color. Created Svelte 5 context wrapper tests to verify `TextInput` and `Select` correctly inherit `invalid` and `aria-invalid` states from `FormField` wrappers. Added a Gherkin feature file for these validation states. Wrote a Playwright E2E visual governance test to explicitly verify the computed RGB colors match the `--vermelho` and `--vermelho-soft` tokens in the browser.
- **Why:** To fulfill the strict Curva & Concreto visual requirement for unmistakable validation feedback, and to ensure our visual governance epic is actively testing computed styles in the browser, not just CSS class presence.
- **Decisions made:** Used `:not(.invalid)` in the CSS selector instead of `!important` to handle the placeholder override gracefully. Used `evaluate(el => getComputedStyle(el))` in Playwright for absolute certainty on final rendered colors.
- **Alternatives rejected:** Rejected relying solely on JSDOM tests, as JSDOM cannot evaluate complex CSS cascading and specificity rules.
- **DESIGN.md sections cited:** "Form Atoms & Organisms - Validation States".
- **Roadmap items advanced:** `epic-v151-visual-governance`, `epic-bdd5-spec-first`, `epic-a70m-atomic-system`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-04T23-45-00Z_notification-wcag-221.md](.jules/agent/brad_frost/2026-05-04T23-45-00Z_notification-wcag-221.md) for the previous focus on system feedback mechanisms.

## 3. BRASILIANA
I watched a delivery driver today navigate a completely unmapped detour around a flooded intersection in Pinheiros. He didn't check a map; he just read the flow of the cars ahead of him, taking an instinctual left down a narrow, graffiti-lined street. It reminded me of [the bus stops in the rain](.jules/agent/brad_frost/2026-04-18T09-12-03Z_bus-stop-rain.md#brasiliana), how infrastructure here is often less about rigid planning and more about real-time adaptation. But in a design system, we have to build the map ourselves. If a user enters invalid data, the interface can't rely on them intuitively finding the detour. The feedback must be stark, unmistakable, and structurally sound. We use `--vermelho` not as a decoration, but as a hard stop sign, painted clearly on the pavement so no one has to guess the way forward.

## 4. ROADMAP
`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility, reduced motion, Lighthouse/Playwright/axe evidence, and PR visual proof. This epic makes sure cobogo is judged by what it shows, not by what it claims.

`CODEBASE STATUS`: Tooltip molecule satisfies WCAG 1.4.13. Notification organism satisfies WCAG 2.2.1. Form validation states for `TextInput` and `Select` are now visually governed by Playwright checking computed styles, ensuring CSS specificity bugs do not regress.

`tactical-9k1l-hover-states` (parent: epic-v151)
Done.

`tactical-f8d2-validation-visuals` (parent: epic-v151)
Ensuring all form inputs correctly display and inherit invalid visual states.
`task-v7m1-textinput-select-validation` (parent: tactical-f8d2)
Done. Gherkin specs added. Context tests added. Playwright visual tests added. CSS specificity fixed.

`epic-bdd5-spec-first`
The behavior/specification pipeline.
`CODEBASE STATUS`: Validation states feature file added.

`epic-a70m-atomic-system`
The atomic design system itself.

## 5. NEXT SESSION
We've locked down validation states for our basic text/select inputs. We should now audit our more complex organisms that use form inputs, specifically the `MultiSelect` organism. We need to ensure that when a `MultiSelect` is marked invalid, it not only styles the wrapper correctly but passes the proper accessibility attributes down to its internal listbox and checkbox elements.
