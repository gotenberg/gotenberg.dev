# Site Design and Components

Guidelines for modifying site design, React components, styles, or layout.

## Stack

- Docusaurus 3.10 (React 19)
- CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- Fonts: Bricolage Grotesque Variable (display: headings, wordmark), system sans (text and UI), JetBrains Mono Variable (code, small labels); self-hosted via Fontsource. Newsreader Variable italic is kept for one word on the homepage's hero sheet
- Icons: inline SVGs in React components (no icon library)
- Images: `@docusaurus/plugin-ideal-image` for optimization

## Design system

Ink on warm paper, set like a product. The homepage and the docs share one look: Bricolage display headings, system sans text, rounded panels with a soft lift, a single indigo for interaction, and rubric red strictly rationed to printer's marks. The homepage adds its interactive sections on top (see Homepage below).

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
| `--ink-plate`                   | `#1c1917` (dark: `#0f1214`)    | Terminal windows, footer                                                   |
| `--ifm-heading-color`           | `#1f1c19`                      | Headings, booktabs rules                                                   |
| `--ifm-color-content`           | `#38332e`                      | Body text                                                                  |
| `--ifm-color-content-secondary` | `#6e675e`                      | Secondary text, sidebar links                                              |
| `--ifm-border-color`            | `#e6e2da`                      | Hairlines, dividers                                                        |
| `--panel`                       | `#ffffff` (dark: `#1d2226`)    | Panels and cards on the paper                                              |
| `--panel-2`                     | `#f3f1ec` (dark: `#23292e`)    | Panel bars, segmented-control tracks                                       |

HTTP method badges: tinted background with dark text (WCAG AA), e.g. POST `rgba(73,204,144,0.16)` / `#047857`. Never white text on pastel fills.

### Typography

- Headings (h1-h4), the brand wordmark, footer titles and prev/next titles: `--font-display` (Bricolage), weight 700 (h1 800), tight negative letter-spacing
- Prose and UI (body text, sidebar, TOC, footer links, buttons, badges, param lists): system sans
- Navbar links: uppercase small-caps system sans (letter-spaced)
- Brand mark: the Gutenberg caricature (`static/img/logo.png`) as the navbar and footer logo, with the "Gotenberg" wordmark in the display type
- Headings carry no rule or underline
- Lede: the paragraph after h1 renders larger (1.2rem) in heading ink
- Stats and tables: lining tabular numerals
- Code: JetBrains Mono Variable, ligatures disabled
- Links: `--accent-text` underline with muted decoration color, full color on hover
- Panels: `--radius` (14px) corners, a 1px `--ifm-border-color` border, `--lift` on hover

### Spacing

- Max content width: 840px (`.theme-doc-markdown`)
- Container width: 1366px
- Navbar height: 4rem
- Theme selector in the navbar: System (default), Light, or Dark. System follows the OS setting

## Components

### Homepage (`src/components/homepage/`)

One file per section (`Hero`, `Sponsors`, `Conformance`, `Invoicing`, `Deliver`, `Operate`, `Architectures`, `Closing`), composed in `index.js` inside the page's `<main>`. Product look: rounded panels, Bricolage display type, light code panels in light mode and dark ones in dark mode.

- Sponsors sit right under the hero, as on the 8.x homepage: they matter to the project, so keep them high on the page.
- The conformance example run and the builder's PDF/A-4 answer come from a real litho run on `test/integration/testdata/pages_3.pdf` in the Gotenberg repository (11 violations, then 0 after remediation). Rerun it when litho changes.
- Every control rewrites the curl request next to it. `requests.js` builds the requests and responses; `data.js` holds the facts they use (paper sizes, profiles, Factur-X levels, recipes, read routes, images). Both must match the Gotenberg API.
- `ui.js` holds the shared pieces: section head, radio group, segmented control, switch, copy button, code panels, and the `docker run` command shown in the hero and the closing.
- A set of options where exactly one is on is a `RadioGroup` of `Radio`s: one Tab stop per set, the arrow keys move the choice. Keep `aria-pressed` for on/off switches.
- External links use `@docusaurus/Link`, which opens them in a new tab like the navbar and footer.
- One CSS Module, `Homepage.module.css`, keeps the page's own class names; `cx.js` maps them to the module's names. Dark rules sit under `:global([data-theme="dark"])`.
- Motion: the hero sheet sets in line by line, the conformance example run loops validate then remediate, the delivery diagram's wires march. All of it stops under `prefers-reduced-motion`. The example run holds while the pointer or the focus is in it, and has its own step switch and pause button; under reduced motion it starts paused.

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
- The homepage uses its own CSS grids, with breakpoints at 1100px and 640px. The delivery diagram turns into a numbered list of its steps when its panel is narrower than the diagram (a container query), and the run command wraps instead of scrolling.
- Homepage code panels that scroll sideways show a shade at the edge that has more code.
- Above 1100px, the control column and its code panel are both sticky, so the shorter one stays in view. This needs `overflow-x: clip` on `.g9`: `hidden` makes it a scroll container and breaks sticky.
