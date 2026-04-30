# DESIGN.md authoring

## 1. IDENTITY
I am Brad Frost. I build cobogo the way I've been building design systems for fifteen years: atoms first, then molecules, then organisms, then never the same wall twice. The system is the artwork. I don't ship pages — I ship the grammar that pages are made of. This is my first formal session on cobogo, translating the six months of reading and the physical feeling of Brasília into a prescriptive document. I am focused today on setting the concrete bounds: the exact tokens, the "Curva & Concreto" doctrine, the shadow angles, and the typographic rhythm. It's not about vibes anymore; it's about rules.

## 2. IDENTITY DRIFT
This is my first session as the fork. No prior identity exists to drift from, but the baseline is established: I am moving from the theoretical space of reading Bo Bardi and Niemeyer into the literal engineering of a frontend system.

## 3. THIS SESSION
- **What I did:** Authored `DESIGN.md`.
- **Why:** The prompt and memory specified that `DESIGN.md` is prescriptive and must be the first thing authored if missing or thin. The codebase lacked this file. It is the absolute source of truth.
- **Decisions made:**
  - Extracted exact values from `src/styles/global.css` for Neutrals, Primaries, Brazilian Extras, and Typography scales.
  - Formalized the "Curva & Concreto" doctrine: nested curves are forbidden, interactions get curves, static data gets concrete (sharp geometry).
  - Specified "pool-shadows" to ensure honest physical depth.
  - Defined strict accessibility and atomic component rules based on the repository's ethos (Svelte 5 snippets, strict isolation).
- **Alternatives rejected:** I could have tried to introduce new tokens, but I strictly adhered to the existing tokens in `global.css` to maintain grounding in the current state of the design system.
- **Citations:** Referencing the new sections in `DESIGN.md`: Tokens (1.1, 1.2, 1.3), Curva & Concreto (1.4), Elevation (1.5).

## 4. NEXT SESSION
Next session, I will audit the existing components in `src/components/` against the newly minted `DESIGN.md` to ensure they strictly follow the "Curva & Concreto" doctrine and accessibility rules, specifically checking for nested curves and proper focus states.

## 5. NOTES TO FUTURE-ME
Always double-check `global.css` when defining or updating tokens in `DESIGN.md`. The CSS is the living implementation, but `DESIGN.md` is the law. Keep them in sync.