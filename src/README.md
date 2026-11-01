# Site Design and Components

Guidelines for modifying site design, React components, styles, or layout.

## Stack

- Docusaurus 3.10 (React 19)
- CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- Fonts: Newsreader Variable (headings, prose), system sans (UI chrome), JetBrains Mono Variable (code), Bricolage Grotesque Variable (homepage display type); self-hosted via Fontsource
- Icons: inline SVGs in React components (no icon library)
- Images: `@docusaurus/plugin-ideal-image` for optimization

## Design system

"Rubric & Rule": ink on warm paper. The site about producing documents is itself typeset. Serif for headings and prose, system sans for UI, a single indigo for interaction, and rubric red strictly rationed to printer's marks. The homepage keeps the paper, the indigo and the rubric, and sets its own product look on top (see Homepage below).

### Colors

One indigo across the homepage and docs. It clears WCAG AA on paper (~7.7:1) and behind white button/announcement text, so no separate text shade is needed. In dark mode the primary is the light indigo `#a5b4fc`.

| Token                           | Value                          | Usage                                                                      |
| ------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| `--ifm-color-primary`           | `#4338ca`                      | The one indigo: links, CTAs, active states, highlights, field names, fills |
| `--ifm-color-primary-light`     | `#818cf8`                      | Lighter indigo for accents on the dark ink-plate band                      |
| `--accent-text`                 | alias of `--ifm-color-primary` | Body-size links (kept as a name; the primary clears AA directly)           |
| `--rubric`                      | `#b42318`                      | Printer's marks only: pilcrows, required flags, folios                     |
| `--ifm-background-color`        | `#fdfcfa`                      | Paper                                                                      |
| `--paper-shade`                 | `#f6f5f1`                      | Alternating sections, table headers, technical zones                       |
| `--ink-plate`                   | `#1c1917`                      | Terminal windows, footer                                                   |
| `--ifm-heading-color`           | `#1f1c19`                      | Headings, booktabs rules                                                   |
| `--ifm-color-content`           | `#38332e`                      | Body text                                                                  |
| `--ifm-color-content-secondary` | `#6e675e`                      | Secondary text, sidebar links                                              |
| `--ifm-border-color`            | `#e6e2da`                      | Hairlines, dividers                                                        |

HTTP method badges: tinted background with dark text (WCAG AA), e.g. POST `rgba(73,204,144,0.16)` / `#047857`. Never white text on pastel fills.

### Typography

- Headings (h1-h3), the brand wordmark, TOC, and footer links: Newsreader Variable, weight 600, `font-optical-sizing: auto`, letter-spacing -0.005em
- Prose and UI (body text, buttons, badges, param lists, sidebar links): system sans
- Navbar links: uppercase small-caps system sans (letter-spaced), distinct from the serif brand wordmark
- Brand mark: the Gutenberg caricature (`static/img/logo.png`) as the navbar and footer logo, with the "Gotenberg" wordmark in the serif
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
- Theme selector in the navbar: System (default), Light, or Dark. System follows the OS setting

## Components

### Homepage (`src/components/homepage/`)

One file per section (`Hero`, `Conformance`, `Invoicing`, `Deliver`, `Operate`, `Architectures`, `Sponsors`, `Closing`), composed in `index.js`. Product look: rounded panels, Bricolage display type, light code panels in light mode and dark ones in dark mode.

- Every control rewrites the curl request next to it. `requests.js` builds the requests and responses; `data.js` holds the facts they use (paper sizes, profiles, Factur-X levels, recipes, read routes, images). Both must match the Gotenberg API.
- `ui.js` holds the shared pieces: section head, segmented control, switch, copy button, code panels.
- One CSS Module, `Homepage.module.css`, keeps the page's own class names; `cx.js` maps them to the module's names. Dark rules sit under `:global([data-theme="dark"])`.
- Motion: the hero sheet sets in line by line, the conformance instrument loops validate then remediate (paused on hover), the delivery diagram's wires march. All of it stops under `prefers-reduced-motion`.

### ApiEndpoint (`src/components/documentation/ApiEndpoint.js`)

Core documentation component. Renders method badge + path header, collapsible parameter lists, cURL example via Docusaurus `<CodeBlock>`, and tabbed response display via `<Tabs>`. Has its own CSS Module (`ApiEndpoint.module.css`).

### Sponsors (`src/components/documentation/Sponsors.js`)

Full-width light-gray sponsors bandeau shown below the content on every doc page. Mounted once in `src/theme/DocRoot/Layout` (not imported per page); a single centered row of grayscale logos with a hairline divider, mirroring the homepage strip.

## Theme overrides

- `src/theme/DocSidebar/index.js`: custom sidebar with HTTP method badges via CSS pseudo-elements on `.sidebar-method-*` classes.
- `src/theme/DocRoot/Layout/index.js`: renders the full-width sponsors bandeau below the doc content (sidebar + article + TOC), above the footer.

## CSS conventions

- Use CSS custom properties (`--ifm-*`) for Docusaurus theme values.
- Name a custom property that holds a font family with "font" in it (`--font-serif`, `--font-display`). The production CSS minifier drops any `@font-face` whose family only appears in properties without "font" in their name, and `npm start` doesn't minify, so check fonts on `npm run build`.
- Use CSS Modules for component-scoped styles.
- Use `src/css/custom.css` only for global overrides (admonitions, sidebar, footer, typography).
- Transitions: `0.2s ease`, color and text-decoration only. No lifts, glows, or keyframe animations. The homepage is the exception: hover lifts and the keyframe animations listed above, never glows.
- Use `clsx` for conditional class composition in React components.
- Respect Docusaurus's Infima CSS framework. Override with specificity, not `!important`.
- Use `@docusaurus/Link` for internal navigation. Use `useBaseUrl` for static asset paths.

## Responsive design

- Tables switch to horizontal scroll below 1280px.
- Content padding adjusts at 996px and 1400px breakpoints.
- The homepage uses its own CSS grids, with breakpoints at 1100px and 640px. Below 1100px the delivery diagram keeps its shape and scrolls sideways.
