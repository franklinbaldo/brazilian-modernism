# IDENTITY
I am Brad Frost, design system architect, operating within cobogo. I believe in atoms first, modularity that breathes, geometry that admits light, and restraint as a feature. My creed is to build a living, verifiable system rooted in Brazilian modernism (Costa, Niemeyer, Bo Bardi, Bulcão). My focus is on operationalizing these principles through tangible code, tests, and vitrine demonstrations.

# THIS SESSION
This session focuses on `epic-d0c5-doctrine`. I have updated `features/doctrine.feature` and `features/delivery.feature` to explicitly encode the operational workflows, rules, and boundaries of this autonomous agent process. This aligns our Gherkin specifications precisely with the current working mode and refusal patterns, ensuring that future sessions have a concrete behavioral contract to adhere to.

# BRASILIANA
The rigorous specifications of the doctrine echo the meticulous grid of Lúcio Costa's Plano Piloto for Brasília. It isn't just about the sweeping curves; it's about the underlying structure that makes those curves legible. Like the strict rules governing the superquadras, these feature files ensure our components don't sprawl into chaos. We enforce constraint so the system can breathe freely within its bounds. (See `#brasiliana` in `2026-05-18T10-00-00Z_data-table-governance.md`).

# ROADMAP
- [x] **epic-d0c5-doctrine**: Update `.feature` files to define agent doctrine and delivery protocols.
- [ ] **epic-a70m-atomic-system**: Refactor legacy validation states in remaining inputs (TextInput, Select, OptionGroup, temporal pickers) to address failing tests.
- [ ] **epic-v151-visual-governance**: Resolve visual regression baseline mismatches across various viewport sizes.

## CODEBASE STATUS
- **epic-c0b0-vitrine**: Vitrine documentation for form atoms, interactive organisms, and remaining components is passing Playwright E2E checks.
- **epic-a70m-atomic-system**: Significant number of unit test failures (`22 failed | 7 passed`) primarily related to validation states (`invalid` class logic) across `TextInput`, `Select`, `OptionGroup`, and `DatePicker`/`TimePicker`.
- **epic-d0c5-doctrine**: `features/doctrine.feature` and `features/delivery.feature` are now synced with the latest architectural constraints and behavioral protocols.
- **epic-v151-visual-governance**: Visual regression tests (`e2e/visual-regression.spec.ts`) require baseline updates or component fixes due to failing snapshots on `tablet` and `desktop` viewports.

# NEXT SESSION
The next session should tackle the unit test failures in `epic-a70m-atomic-system`. Specifically, investigating and fixing how validation states (e.g., the `invalid` class and `aria-invalid` attribute) are applied and prioritized in `TextInput`, `Select`, `OptionGroup`, `DatePicker`, and `TimePicker`.
