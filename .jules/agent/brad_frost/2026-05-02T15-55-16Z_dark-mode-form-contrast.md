## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. In the last session, I established that layered organisms needed explicit text color overrides in Dark Mode to ensure our vibrant primary colors didn't cause text to vanish. Today, I confronted the same contrast reality for the boundaries of our forms. The structural borders that look fine on a bright paper background become invisible against a dark canvas. We don't compromise readability for aesthetics. The form must be perceivable. I decoupled the form borders and focus rings from the structural system, giving them dedicated high-contrast tokens in dark mode. The system bends to serve the user, not the other way around.

## 2. THIS SESSION
- **What I did:** Fixed WCAG AA non-text contrast failures for form elements during Dark Mode. I wrote failing E2E tests in `e2e/dark-mode-form-contrast.spec.ts` to verify the contrast of form boundaries and focus rings, patched `global.css` to introduce `--border-input` and `--focus-ring` (which override to high-contrast `--concreto-60` and `--concreto-80` in `.dark-mode`), and updated all form atoms (TextInput, Select, MultiSelect, Checkbox, Radio, Switch, FileInput, DatePicker, TimePicker, FilterBar, Combobox, SearchBar) to use these new tokens.
- **Why:** The DESIGN.md and `global.css` rigidly state that saturated primary colors remain intentionally vibrant across modes, but using them for focus rings or standard borders over dark backgrounds resulted in a contrast ratio below the required 3.0. Decoupling form elements from generic structural borders ensures forms are clearly delineated for keyboard users and those with visual impairments without sacrificing the overall vibrant aesthetic.
- **Decisions made:** Modified the e2e Playwright test to correctly measure border and outline contrast using relative luminance. Decided to introduce `--border-input` and `--focus-ring` instead of generically changing `--border` everywhere, to avoid unintentionally boosting the contrast of non-interactive structural lines (like horizontal rules).
- **Roadmap items advanced:** `epic-v151-visual-governance`, `epic-bdd5-spec-first`, `epic-a70m-atomic-system`.
- **Relevant prior logs:** [.jules/agent/brad_frost/2026-05-06T13-14-48Z_dark-mode-notification-contrast.md](.jules/agent/brad_frost/2026-05-06T13-14-48Z_dark-mode-notification-contrast.md)

## 3. BRASILIANA
I was watching a street artist in Lapa paint over a faded wall. He was using a bright, saturated yellow, but before he laid it down, he traced the outline of the shape in a thick, dark charcoal. "If you don't trace the edge," he told me without looking away, "the light just bleeds into the wall and disappears." It reminded me of what we had to do with the [Notification organisms](.jules/agent/brad_frost/2026-05-06T13-14-48Z_dark-mode-notification-contrast.md#brasiliana). You can't just throw vibrant colors into the dark and expect people to see the boundaries. You have to draw the line first. The structure needs contrast before the color can sing.

## 4. ROADMAP
`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility.

`CODEBASE STATUS`: Dark mode form elements (TextInput, Select, MultiSelect, Checkbox, Radio, Switch) now correctly maintain WCAG AA non-text contrast (ratio >= 3.0) via explicit border and focus ring color overrides. E2E tests enforce these contrast ratios dynamically.

`tactical-dkmd-dark-mode-contrast` (parent: epic-v151-visual-governance)
Ensuring WCAG AA compliance across layered organisms and forms in Dark Mode.

`task-4a2b-form-contrast` (parent: tactical-dkmd)
Done. Fixed dark mode border and focus ring contrast for all form elements and added relative luminance Playwright checks.

`epic-c0b0-vitrine`
The GitHub Pages site as cobogo's public manifesto.

`epic-bdd5-spec-first`
The behavior/specification pipeline: features, acceptance criteria, step definitions, Playwright flows, Vitest tests.

## 5. NEXT SESSION
With Dark Mode contrast locked down for both organisms and forms, the next logical step is to review the Documentation Site (vitrine) to ensure that the dark mode toggle is globally accessible and that all code snippets and MDX content properly invert without contrast failures.
