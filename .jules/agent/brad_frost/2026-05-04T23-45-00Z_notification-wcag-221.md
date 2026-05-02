## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. Today, we corrected an architectural oversight in our Notification organism. The tension between system feedback and user control is a classic design system problem. When we auto-dismiss a Notification, we assert that the system's schedule matters more than the user's reading speed. WCAG 2.2.1 (Timing Adjustable) correctly forces us to hand that control back. By making auto-dismissing notifications focusable, we ensure that the user—not a rigid timeout—dictates the pace of the interface. We also ensured the system respects user preferences by disabling the slide animation when `prefers-reduced-motion` is active. This is how the system becomes responsive not just to screens, but to human needs.

## 2. THIS SESSION
- **What I did:** Implemented WCAG 2.2.1 compliance for the `Notification` organism. Auto-dismissible notifications now receive `tabindex="0"` and visible focus styles, allowing keyboard users to pause the timeout by focusing the element. I also added support for `prefers-reduced-motion: reduce` by conditionally disabling the `slide` transition and the close button's hover transition via a CSS media query and Svelte reactive state.
- **Why:** To satisfy WCAG 2.2.1 (Timing Adjustable) and improve overall accessibility for users who rely on keyboard navigation or require reduced motion.
- **Decisions made:** Used Svelte's `$effect` and `window.matchMedia` to reactively disable the `slide` transition duration. This keeps the component logic native and avoids heavy external dependencies. Chose `tabindex="0"` specifically for auto-dismissing notifications; static notifications remain `-1` to avoid unnecessary tab stops.
- **Alternatives rejected:** Rejected adding complex JS-based focus management within the notification in favor of relying on native browser focus handling and simple state pausing.
- **DESIGN.md sections cited:** Section "2. Accessibility Floor" (respecting prefers-reduced-motion) and "Notification Organisms" (WCAG 2.2.1 compliance).
- **Roadmap items advanced:** `epic-v151-visual-governance`, `epic-bdd5-spec-first`, and `epic-a70m-atomic-system`. Completed task for Notification accessibility.
- **Relevant prior logs:** [2026-05-04T22-30-00Z_tooltip-wcag-1413.md](.jules/agent/brad_frost/2026-05-04T22-30-00Z_tooltip-wcag-1413.md) for the previous focus on hover states.

## 3. BRASILIANA
The concept of time here is not a rigid grid, but a negotiation. In [my earlier note on the bus stops in the rain](.jules/agent/brad_frost/2026-04-18T09-12-03Z_bus-stop-rain.md#brasiliana), I observed how schedules dissolve when weather interferes. Time stretches and compresses based on the situation. Our digital interfaces often forget this. We set a 5000-millisecond timeout on a notification and assume everyone reads at the same pace. But reading, like waiting for a bus in the rain, requires accommodation. By allowing a simple focus event to pause the countdown, we bring a bit of that human negotiation into the browser. It says: "Take your time. The system will wait for you." It’s a small, invisible courtesy that transforms a rigid interface into a dialogue.

## 4. ROADMAP
`epic-v151-visual-governance`
Visual accountability across sessions: screenshots, viewport captures, regression evidence, accessibility checks, contrast, focus visibility, reduced motion, Lighthouse/Playwright/axe evidence, and PR visual proof. This epic makes sure cobogo is judged by what it shows, not by what it claims.

`CODEBASE STATUS`: Tooltip molecule satisfies WCAG 1.4.13. Notification organism now fully satisfies WCAG 2.2.1 via focusable timeouts, and respects `prefers-reduced-motion`. Verified by Vitest and Playwright. Added `vitest-setup.ts` mock for `window.matchMedia`.

`tactical-9k1l-hover-states` (parent: epic-v151)
Ensuring all hover-revealed and time-based content meets strict accessibility standards.

`task-4c3d-notification-timing` (parent: tactical-9k1l)
Done. Added `tabindex=0` and focus pausing to auto-dismissible Notifications. Added `prefers-reduced-motion` support for transitions.

`epic-a70m-atomic-system`
The atomic design system itself: tokens, atoms, molecules, organisms, composition rules, reuse discipline, and component API coherence.

## 5. NEXT SESSION
We have shored up accessibility for Tooltips and Notifications. Now we need to look at our data entry components, specifically the foundational `TextInput` and `Select` atoms. We need to ensure their validation states (`invalid=true`) provide unmistakable feedback that adheres to the Curva & Concreto aesthetic, ensuring we use `--vermelho-soft` and `--vermelho` correctly, and that the components are properly linked to `FormField` wrappers via Svelte context.
