# Home overrides

Master: `design-system/nicolas-thibault/MASTER.md`

Motion-Driven + Swiss type. Not Brutalism. Not a Dennis clone.

## Pattern

Hero (dark, kinetic) → About (orbit graphic) → Work (cursor-follow media) → Contact (magnetic close).

## Color

Surfaces: ink `#09090B` and paper `#FAFAFA`. Accent rust `#C45C38` — never `#2563EB`.

## Type

Archivo headings, Space Grotesk UI. Display can go large; weight stays 500–600.

## Motion

Lenis + GSAP ScrollTrigger. Hero word reveal (`expo.out`). One magnetic CTA per screen. Work preview lerps to the cursor. Custom cursor on fine pointers only. Scroll progress under the top edge.

Skip all of the above when `prefers-reduced-motion: reduce`. Mobile: no custom cursor, no magnetic pull, no follow-image.

## Graphics

Dot grid on dark hero. Rust orbital ring in About. Hairline rules. No glass, no floating orbs, no grain wash.
