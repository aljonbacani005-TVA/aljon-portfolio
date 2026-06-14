# Portfolio Website Design Brief

## Design Read

Reading this as: a personal portfolio website for recruiters, clients, and design-conscious visitors, with a refined developer-portfolio language, leaning toward a distinctive editorial-tech aesthetic built with native CSS or the project's existing frontend stack.

## Design Dials

- `DESIGN_VARIANCE: 6` - polished and memorable, but still clear enough for professional review.
- `MOTION_INTENSITY: 5` - meaningful transitions, hover states, and section reveals without distracting from the work.
- `VISUAL_DENSITY: 4` - scannable content with enough detail to prove capability.

## Core Direction

The portfolio should feel intentionally designed, not templated. Avoid generic AI portfolio patterns like centered hero text over a purple gradient, three equal feature cards, floating glass panels everywhere, placeholder company names, and vague claims with no proof.

The first screen should immediately communicate:

- who the portfolio belongs to
- what kind of work they do
- one specific reason to keep scrolling
- a clear primary action, such as viewing work or contacting the owner

## Visual Language

- Use a strong, consistent typographic system. Prefer a distinctive sans display face paired with a readable body face.
- Avoid defaulting to Arial, Roboto, Inter, or generic system stacks unless the existing project already uses them with intent.
- Use one accent color across the whole site. Do not change accent colors from section to section.
- Avoid the default purple or blue glow aesthetic unless it is explicitly part of the brand.
- Keep one radius system throughout the interface. For this portfolio, prefer restrained radii around `8px` to `12px`.
- Use cards only when they frame real repeated items like projects, testimonials, posts, or case studies.
- Use real visuals for work previews. Do not rely on empty decorative boxes or fake screenshots.

## Layout Principles

- Prefer asymmetry over a fully centered template when it improves hierarchy.
- Use CSS Grid for major layouts instead of complex flex width math.
- Keep the hero stable on mobile with `min-height: 100dvh`; do not use `h-screen`.
- Make sure the hero CTA is visible without requiring scroll on common laptop and mobile viewports.
- Avoid repeating the same section layout several times in a row.
- Keep navigation on one line on desktop and no taller than `80px`.
- Do not place cards inside cards.
- Do not use decorative scroll prompts, version labels, or ornamental metadata unless they serve a real purpose.

## Motion And Interaction

- Use motion to clarify hierarchy, state, or storytelling.
- Respect `prefers-reduced-motion`.
- Keep animations isolated to client-side leaf components when using React or Next.js.
- Avoid scroll listeners that rerender constantly. Prefer CSS scroll animation, IntersectionObserver, Motion `useScroll`, or GSAP ScrollTrigger where appropriate.
- Every interactive element needs hover, focus, and active states.
- Buttons must have readable contrast and labels that do not wrap on desktop.

## Content Rules

- Copy should be specific and evidence-based.
- Avoid vague lines like "crafting digital experiences" unless backed by concrete examples.
- Project sections should include what was built, the role, the stack, and the outcome.
- Keep hero supporting copy short: ideally under 20 words and no more than four lines.
- Do not use fake names, fake clients, or placeholder testimonials.
- Avoid emojis in visible portfolio UI unless the brand is intentionally playful.

## Portfolio Sections

Recommended page structure:

1. Hero with name, role, concise positioning, and primary CTA.
2. Selected work with real project previews and brief context.
3. Capability or stack section, presented visually rather than as a plain long list.
4. About section with personality and credibility.
5. Contact section with one clear conversion path.

Optional sections:

- writing or notes
- testimonials, only if real
- experience timeline
- open-source or shipped products

## Accessibility And Quality Checks

Before shipping changes, verify:

- text contrast passes WCAG AA
- buttons and links are keyboard focusable
- images have meaningful alt text
- mobile layouts do not overlap or clip text
- no CTA text wraps awkwardly on desktop
- no section uses unreadable text over images
- reduced-motion behavior exists for major animations
- layout remains stable during loading

## Implementation Preferences

- Follow the existing project stack and patterns first.
- Check `package.json` before importing any third-party library.
- Use one icon family only. Prefer the icon library already installed in the project.
- If no icon library exists, use a maintained library rather than hand-drawn SVG paths.
- Use CSS variables or design tokens for colors, spacing, radii, and typography.
- Keep design decisions documented in code only where the reason is not obvious.

## Final Preflight

The page is not ready until these are true:

- the portfolio has a clear design direction
- the accent color is consistent
- typography feels intentional
- project work is easy to scan
- the hero works on desktop and mobile
- navigation is simple and stable
- motion has a purpose
- real content replaces placeholders
- the site does not look like a generic AI-generated template
