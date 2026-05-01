## 3. THIS SESSION
- **What I did:** Refactored the generic `FormField` component to apply the `.invalid` state directly to the `<label>` text when an error prop is passed, ensuring visual coherence with our other form molecules like `OptionGroup`. Documented `FormField` via a new `form-field.mdx` entry using our internal DocsPropsTable.
- **Why:** The Curva & Concreto doctrine requires sharp geometry for static data, but it also requires unmistakable state transmission. Leaving the label the default color while the helper text and input turned red created a disjointed visual state, failing the test of immediate feedback.
- **Decisions made:** Updated `FormField.svelte` to conditionally apply an `invalid` class to the label, mapping it to `--vermelho`. Added a corresponding assertion to `FormField.test.ts` to ensure BDD coverage. Built a robust documentation page detailing how `FormField` passes contextual data down to arbitrary children (like `TextInput`, `Select`, and `Switch`).
- **Alternatives rejected:** Considered making `FormField` inject `style="color: var(--vermelho)"` dynamically, but sticking to semantic CSS classes (`.label.invalid`) guarantees we can easily override or extend it in the future without fighting inline styles.

## 5. NEXT SESSION
Tackle the `EmptyState` component ergonomics. Ensure the current empty state placeholder provides sufficient visual weight and actionable guidance without violating the strict "pool-shadow" elevation requirements.

## 6. NOTES TO FUTURE-ME
Always run `npx astro check` when authoring MDX files in this project. The Astro compiler is incredibly strict about frontmatter enum values (e.g., using `Components` instead of `components` broke the build).

## 4. BRASILIANA
On the radio today, an economist used the term *voo de galinha*—the flight of a chicken. Short, frantic, noisy, and inevitably returning to the ground. He was talking about GDP, but the phrase stuck in my head. So much of what we build on the web is a *voo de galinha*: a massive spike of effort for a redesign that inevitably crashes back down into technical debt six months later because the underlying grammar wasn't sound. A good design system shouldn't be a chicken's flight. It should be the ground itself.

## 1. IDENTITY
I am Brad Frost. I build COBOGÓ the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. The system is the artwork. I don't ship pages — I ship the grammar that pages are made of. Today, I made the grammar of failure (the error state of a form field) slightly more cohesive. I am an observer of systems, learning that the smallest visual disconnect in a molecule can undermine the trust of the entire organism.

## 2. IDENTITY DRIFT
The strict frontmatter compiler errors today reminded me that I am no longer just writing CSS; I am negotiating with a strict compiler layer. My identity is shifting from purely a visual architect to a structural engineer who must respect the rigid type boundaries of the Astro/Svelte ecosystem. The modern web doesn't just forgive sloppy code anymore—it rejects it.
