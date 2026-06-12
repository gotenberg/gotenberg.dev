# Site Design and Components

Guidelines for modifying site design, React components, styles, or layout.

## Stack

- Docusaurus 3.8.1 (React 18)
- CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- Fonts: Newsreader Variable (headings, prose), system sans (UI chrome), JetBrains Mono Variable (code); self-hosted via Fontsource
- Icons: inline SVGs in React components (no icon library)
- Images: `@docusaurus/plugin-ideal-image` for optimization

## Design system

"Rubric & Rule": ink on warm paper. The site about producing documents is itself typeset. Serif for headings and prose, system sans for UI, rubric red strictly rationed to printer's marks.

### Colors

| Token                           | Value     | Usage                                                  |
| ------------------------------- | --------- | ------------------------------------------------------ |
| `--ifm-color-primary`           | `#008ae6` | Accents, primary CTA, italic highlights, large text    |
| `--accent-text`                 | `#0060a1` | Body-size links and accents (WCAG AA on paper)         |
| `--rubric`                      | `#b42318` | Printer's marks only: pilcrows, required flags, folios |
| `--ifm-background-color`        | `#fdfcfa` | Paper                                                  |
| `--paper-shade`                 | `#f6f5f1` | Alternating sections, table headers, technical zones   |
| `--ink-plate`                   | `#1c1917` | Terminal windows, footer                               |
| `--ifm-heading-color`           | `#1f1c19` | Headings, booktabs rules                               |
| `--ifm-color-content`           | `#38332e` | Body text                                              |
| `--ifm-color-content-secondary` | `#6e675e` | Secondary text, sidebar links                          |
| `--ifm-border-color`            | `#e6e2da` | Hairlines, dividers                                    |

HTTP method badges: tinted background with dark text (WCAG AA), e.g. POST `rgba(73,204,144,0.16)` / `#047857`. Never white text on pastel fills.

### Typography

- Headings (h1-h3), navbar, sidebar, TOC, and footer links: Newsreader Variable, weight 600, `font-optical-sizing: auto`, letter-spacing -0.005em
- Prose and UI (body text, buttons, badges, param lists): system sans
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

Standalone React component with CSS Modules (`Homepage.module.css`). Static by design: centered hero with the portrait logo (via `@theme/IdealImage`), a "two commands" `SimpleTerminal` quickstart, a centered sponsors strip, four text-plus-code feature rows, and a final CTA. No scroll-triggered animation, counters, or gradients; motion is hover-scoped only.

### ApiEndpoint (`src/components/documentation/ApiEndpoint.js`)

Core documentation component. Renders method badge + path header, collapsible parameter lists, cURL example via Docusaurus `<CodeBlock>`, and tabbed response display via `<Tabs>`. Has its own CSS Module (`ApiEndpoint.module.css`).

### Sponsors (`src/components/documentation/Sponsors.js`)

Renders sponsor logos at the bottom of documentation pages.

## Theme overrides

- `src/theme/DocSidebar/index.js`: custom sidebar with HTTP method badges via CSS pseudo-elements on `.sidebar-method-*` classes.

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
