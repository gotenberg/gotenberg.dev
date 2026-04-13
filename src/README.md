# Site Design and Components

Guidelines for modifying site design, React components, styles, or layout.

## Stack

- Docusaurus 3.8.1 (React 18)
- CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- Fonts: Inter (body, headings), JetBrains Mono (code), loaded via Google Fonts
- Icons: inline SVGs in React components (no icon library)
- Images: `@docusaurus/plugin-ideal-image` for optimization

## Design system

### Colors

| Token                           | Value     | Usage                         |
| ------------------------------- | --------- | ----------------------------- |
| `--ifm-color-primary`           | `#008ae6` | Links, accents, primary CTA   |
| `--ifm-heading-color`           | `#0f172a` | H1 headings                   |
| `--ifm-color-content`           | `#334155` | Body text                     |
| `--ifm-color-content-secondary` | `#64748b` | Secondary text, sidebar links |
| `--ifm-border-color`            | `#e2e8f0` | Borders, dividers             |

HTTP method badge colors: POST `#49cc90`, GET `#61affe`, PUT `#fca130`, DELETE `#f93e3e`, HEAD `#9061f9`.

### Typography

- H1: 3rem, weight 900, letter-spacing -0.03em, blue bottom border
- H2: 1.8rem, weight 800, letter-spacing -0.02em, gray bottom border
- H3: 1.4rem, weight 700, blue left border with padding
- Body: 1.05rem, line-height 1.75
- Code: 0.85em, weight 500, subtle gray background

### Spacing

- Max content width: 840px (`.theme-doc-markdown`)
- Container width: 1366px
- Navbar height: 4rem
- Light mode only (dark mode switch disabled)

## Components

### Homepage (`src/components/Homepage.js`)

Standalone React component with CSS Modules (`Homepage.module.css`). Contains hero section, community stats strip, feature blocks with `SimpleTerminal` code previews, and final CTA section.

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
- Transitions: `0.2s ease` for interactive elements, `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for larger animations.
- Hover effects: subtle `translateY(-1px)` lift with colored box-shadow.
- Use `clsx` for conditional class composition in React components.
- Respect Docusaurus's Infima CSS framework. Override with specificity, not `!important`.
- Use `@docusaurus/Link` for internal navigation. Use `useBaseUrl` for static asset paths.

## Responsive design

- Tables switch to horizontal scroll below 1280px.
- Content padding adjusts at 996px and 1400px breakpoints.
- Homepage uses Docusaurus grid system (`col col--6`, `row`, `container`).
