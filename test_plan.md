1. **Design and Spec the DateRangePicker component**
   - A DateRangePicker is an organism consisting of two DatePickers (a start date and an end date).
   - I will define acceptance criteria using BDD in `features/date-range-picker.feature`.

2. **Implement DateRangePicker**
   - Create `src/components/DateRangePicker.svelte`.
   - Prop bindings for `start` and `end`.
   - Support `min`, `max`, `disabled`, and `invalid` props.
   - Forward `invalid` and `required` states from `FormField` context.
   - Cross-validation: end date should have `min` dynamically set to `start` date (if `start` is selected).
   - Basic layout: two date pickers side-by-side using `Grid`/`Column` or a flex container.

3. **Write Unit and E2E Tests**
   - Write unit tests in `src/components/DateRangePicker.test.ts`.
   - Write E2E tests in `e2e/date-range-picker.spec.ts`.

4. **Document in Vitrine**
   - Create demo component `src/content/docs/components/_DateRangePickerDemo.svelte`.
   - Create documentation MDX `src/content/docs/components/date-range-picker.mdx`.
   - Export in `src/index.ts`.

5. **Session Log and Pre-commit Checks**
   - Write session log at `.jules/agent/brad_frost/{timestamp}_date-range-picker.md`.
   - Update epic status in `.jules/agent/brad_frost/ROADMAP`.
   - Run full check suite (`pre_commit_instructions` and then `npm run build`, `npx vitest run`, `npx playwright test`).
