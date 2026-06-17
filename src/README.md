# Site Design and Components

Guidelines for modifying site design, React components, styles, or layout.

## Stack

- Docusaurus 3.10.1 (React 18)
- CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- Fonts: Newsreader Variable (headings, prose), system sans (UI chrome), JetBrains Mono Variable (code); self-hosted via Fontsource
- Icons: inline SVGs in React components (no icon library)
- Images: `@docusaurus/plugin-ideal-image` for optimization

## Design system

"Rubric & Rule": ink on warm paper. The site about producing documents is itself typeset. Serif for headings and prose, system sans for UI, a single deep mineral ink-blue for interaction, and rubric red strictly rationed to printer's marks.

### Colors

One blue across the homepage and docs: a deep mineral ink-blue that sits with the warm paper and rubric red (it reads as a second ink, not a screen accent). It clears WCAG AA on paper (~5.4:1) and behind white button/announcement text, so no separate text shade is needed.

| Token                           | Value                          | Usage                                                                        |
| ------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `--ifm-color-primary`           | `#2a6f93`                      | The one ink-blue: links, CTAs, active states, highlights, field names, fills |
| `--ifm-color-primary-light`     | `#4f95b8`                      | Lighter ink-blue for accents on the dark ink-plate band                      |
| `--accent-text`                 | alias of `--ifm-color-primary` | Body-size links (kept as a name; the primary clears AA directly)             |
| `--rubric`                      | `#b42318`                      | Printer's marks only: pilcrows, required flags, folios                       |
| `--ifm-background-color`        | `#fdfcfa`                      | Paper                                                                        |
| `--paper-shade`                 | `#f6f5f1`                      | Alternating sections, table headers, technical zones                         |
| `--ink-plate`                   | `#1c1917`                      | Terminal windows, footer                                                     |
| `--ifm-heading-color`           | `#1f1c19`                      | Headings, booktabs rules                                                     |
| `--ifm-color-content`           | `#38332e`                      | Body text                                                                    |
| `--ifm-color-content-secondary` | `#6e675e`                      | Secondary text, sidebar links                                                |
| `--ifm-border-color`            | `#e6e2da`                      | Hairlines, dividers                                                          |

HTTP method badges: tinted background with dark text (WCAG AA), e.g. POST `rgba(73,204,144,0.16)` / `#047857`. Never white text on pastel fills.

### Typography

- Headings (h1-h3), the brand wordmark, TOC, and footer links: Newsreader Variable, weight 600, `font-optical-sizing: auto`, letter-spacing -0.005em
- Prose and UI (body text, buttons, badges, param lists, sidebar links): system sans
- Navbar links: uppercase small-caps system sans (letter-spaced), distinct from the serif brand wordmark
- Brand mark: the Gutenberg caricature (`static/img/logo.png`) as the navbar and footer logo, with the "Gotenberg" wordmark in the serif; the larger `logo_hero.png` portrait is the homepage hero
- H2: short 2px ink rule above (chapter mark), no underline
- Lede: the paragraph after h1 renders larger (1.2rem) in heading ink
- Stats and tables: lining tabular numerals
- Code: JetBrains Mono Variable, ligatures disabled
- Links: `--accent-text` underline with muted decoration color, full color on hover
- Chrome geometry: 2px buttons and tags, 4px cards (print geometry, no pills)

### Spacing

- Max content width: 840px (`.theme-doc-markdown`)
- Container width: 1366px
- Navbar height: 4rem
- Light mode only (dark mode switch disabled)

## Components

### Homepage (`src/components/Homepage.js`)

Standalone React component with CSS Modules (`Homepage.module.css`). Static by design: centered hero with the portrait logo (via `@theme/IdealImage`), a "two commands" `SimpleTerminal` quickstart, a centered sponsors strip, four text-plus-code feature rows, and a closing CTA on a dark ink-plate band (stats + buttons). No scroll-triggered animation, counters, or gradients; motion is hover-scoped only.

### ApiEndpoint (`src/components/documentation/ApiEndpoint.js`)

Core documentation component. Renders method badge + path header, collapsible parameter lists, cURL example via Docusaurus `<CodeBlock>`, and tabbed response display via `<Tabs>`. Has its own CSS Module (`ApiEndpoint.module.css`).

### Sponsors (`src/components/documentation/Sponsors.js`)

Full-width light-gray sponsors bandeau shown below the content on every doc page. Mounted once in `src/theme/DocRoot/Layout` (not imported per page); a single centered row of grayscale logos with a hairline divider, mirroring the homepage strip.

## Theme overrides

- `src/theme/DocSidebar/index.js`: custom sidebar with HTTP method badges via CSS pseudo-elements on `.sidebar-method-*` classes.
- `src/theme/DocRoot/Layout/index.js`: renders the full-width sponsors bandeau below the doc content (sidebar + article + TOC), above the footer.

## CSS conventions

- Use CSS custom properties (`--ifm-*`) for Docusaurus theme values.
- Use CSS Modules for component-scoped styles.
- Use `src/css/custom.css` only for global overrides (admonitions, sidebar, footer, typography).
- Transitions: `0.2s ease`, color and text-decoration only. No lifts, glows, or keyframe animations.
- Use `clsx` for conditional class composition in React components.
- Respect Docusaurus's Infima CSS framework. Override with specificity, not `!important`.
- Use `@docusaurus/Link` for internal navigation. Use `useBaseUrl` for static asset paths.

## Responsive design

- Tables switch to horizontal scroll below 1280px.
- Content padding adjusts at 996px and 1400px breakpoints.
- Homepage uses Docusaurus grid system (`col col--6`, `row`, `container`).
