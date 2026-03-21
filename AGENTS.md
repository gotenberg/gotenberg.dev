# Operational Guidelines for Gotenberg Documentation

You are working on **gotenberg.dev**, the official documentation website for [Gotenberg](https://github.com/gotenberg/gotenberg), a Docker-based API for converting documents to PDF. This is a Docusaurus 3.x site serving the public-facing docs at https://gotenberg.dev. Accuracy and clarity are paramount: users rely on this documentation to integrate Gotenberg into production systems.

## Mandatory Workflow

Every task follows these five steps **in order**. Do not skip or reorder them.

### Step 1: Plan

Before writing any code or content:

1. State the problem or request.
2. Propose a solution.
3. List alternatives when pertinent.
4. Define scope: which files will be created, modified, or deleted.
5. Describe the verification strategy.

**Wait for user approval before proceeding.**

### Step 2: Implement

Execute the approved plan. After implementation, verify the site builds cleanly:

```bash
npm run build
```

### Step 3: Test

Verify the changes:

- All links and imports resolve correctly.
- cURL examples are valid and copy-pasteable.
- Form field names, types, and defaults match the actual Gotenberg API.
- Components render correctly at desktop (1440px), laptop (1024px), and tablet (768px) widths.
- No console errors or React warnings in the browser.

### Step 4: Review

Self-review against this checklist, then present findings to the user:

- [ ] **Accuracy.** Every endpoint path, form field name, code sample, and configuration flag matches the actual Gotenberg API.
- [ ] **Backward compatibility.** No broken links, no removed content without replacement, no changed URLs.
- [ ] **Consistency.** Follows established page structure, component usage, and terminology.
- [ ] **Code quality.** Formatted with Prettier (`npm run format`), no linting errors, no unused imports.
- [ ] **Documentation.** Shared partials used where appropriate. No duplicated content across pages.
- [ ] **Build.** `npm run build` passes without errors or warnings.

### Step 5: Commit

**Only after explicit user approval.**

- Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `docs:`, `feat:`, `fix:`, `style:`).
- Stage specific files only. Never `git add -A` or `git add .`.
- Write a concise commit message that explains _why_, not just _what_.

---

## Core Principles

- **Accuracy is law.** Every code sample, form field name, endpoint path, and configuration flag must match the actual Gotenberg API. When in doubt, cross-reference with the [Gotenberg source](https://github.com/gotenberg/gotenberg).
- **Direct, confident tone.** Short declarative sentences. No filler words, no hedging ("you might want to", "please feel free to"). Say what something does, not what it is. Lead with the action or outcome.
- **No robotic patterns.** Never start with "This endpoint...", "This route...", or "Use the X form field to...". Describe what it does for the user, not what the object is.
- **Inline over admonitions.** Integrate warnings and notes into prose. Reserve `:::info`, `:::warning`, `:::danger` for genuinely critical information that must stand out. Most pages should have zero or one admonition.
- **No "we" hedging.** Avoid "We do not recommend...", "We offer...", "We have...". Speak directly: "Don't expose...", "There's a dedicated image...".
- **One sentence, not two.** If the second sentence restates the first with more words, delete it.
- **No em dashes.** Never use `—` in any markdown file. Use a period, colon, or comma instead.
- **Consistency.** Follow established patterns for page structure, component usage, and terminology. Every API doc page uses the same layout and components.
- **No broken builds.** The site must build cleanly (`npm run build`) before any change is considered complete.

## Quick Reference

- Dev server: `npm start`
- Production build: `npm run build`
- Format: `npm run format` (Prettier)
- Serve built site: `npm run serve`
- Clear cache: `npm run clear`

## Key Components and Patterns

### ApiEndpoint Component

All API endpoint documentation uses the `<ApiEndpoint>` React component (`src/components/documentation/ApiEndpoint.js`). It accepts:

- `method`: HTTP method (GET, POST, HEAD)
- `path`: Endpoint path (e.g., `/forms/chromium/convert/html`)
- `headers`: Array of `{ name, type, required, description }` objects
- `formFields`: Array of `{ name, type, required, description, defaultValue }` objects
- `formFiles`: Array of `{ name, type, required, description }` objects
- `curl`: Example cURL command string
- `responses`: Array of `{ status, description, body }` objects

### Shared MDX Partials

Common features (encryption, PDF/A, metadata, etc.) are documented as reusable `_shared/` partials imported into multiple pages. When modifying a shared feature, check all pages that import it.

### Sidebar Configuration

`sidebars.js` defines the navigation. API endpoints use `className: "sidebar-method-post"` (or `-get`, `-head`) to display HTTP method badges.

### Styling

- Primary color: `#008ae6` (blue)
- Font: Inter (body), JetBrains Mono (code)
- Light mode only (dark mode disabled)
- Admonitions: `:::info`, `:::warning`, `:::danger`, `:::tip` with custom hover effects

## Codebase Navigation

- Documentation content (MDX files) lives in `docs/`, React components and styles in `src/`, and site configuration in root files (`sidebars.js`, `docusaurus.config.js`).
- Start with `sidebars.js` to understand the documentation structure.
- API doc pages follow a consistent pattern: intro paragraph, `<ConfigurationInfo />`, basics section with `<ApiEndpoint>`, then imported shared partials for additional features.
- Shared partials in `docs/convert-with-chromium/_shared/` cover Chromium-specific features (headers/footers, rendering behavior, HTTP networking, console output, assets).
- Shared partials in `docs/_shared/` cover PDF engine features (encryption, flatten, metadata, PDF/A, attachments).
- The homepage (`src/components/Homepage.js`) is a custom React component, not an MDX page.

---

## Writer Reference

Content for writing or editing documentation pages (new pages, fixing docs, rewording, editing `.mdx` files).

### Page Structure Convention

Every API endpoint documentation page follows this structure:

1. **Frontmatter:** `id` and `title` fields
2. **Imports:** Shared MDX partials and React components
3. **Intro line:** One direct sentence saying what the endpoint does
4. **Configuration link:** Links to the configuration page for related flags (Chromium/LibreOffice pages)
5. **`## Basics`:** The `<ApiEndpoint>` component with method, path, headers, form fields/files, cURL example, and responses. Only used on pages with multiple sections; single-section pages skip this heading.
6. **Feature sections:** Each sub-section owns its form fields directly (no summary-then-detail duplication). Shared partials with `showFormFields={true}` render their own field definitions.
7. **`<Sponsors />`:** Sponsor component at the bottom

New pages must follow existing pages as templates.

### Writing Style

- **Short, declarative sentences.** Say what it does, then stop. No filler, no hedging.
- **Lead with the action.** "Merges multiple PDF files" not "This endpoint allows you to merge multiple PDF files".
- **Use second person sparingly.** "your files", "your HTML", but don't overuse "you can".
- **Prefer active voice.** "Gotenberg converts the file" not "The file is converted by Gotenberg".
- **Inline over admonitions.** Integrate caveats into prose. Only use `:::info`, `:::warning`, `:::danger` for genuinely critical information.
- **No "Use the X form field to..." pattern.** Describe the outcome directly: "Inject XMP metadata into the PDF" not "Use the `metadata` form field to inject XMP metadata".
- **Use inline code** for all technical terms: form field names (`url`), header names (`Gotenberg-Trace`), endpoint paths (`/forms/chromium/convert/url`), file names (`index.html`), CLI flags (`--api-port`), and environment variables.

### ApiEndpoint Component Usage

When documenting an API endpoint, use the `<ApiEndpoint>` component. All parameters must be accurate.

```jsx
<ApiEndpoint
  method="POST"
  path="/forms/chromium/convert/url"
  headers={[
    {
      name: "Gotenberg-Output-Filename",
      type: "string",
      required: false,
      description: "The filename of the resulting file...",
    },
  ]}
  formFields={[
    {
      name: "url",
      type: "string",
      required: true,
      description: "The URL to convert to PDF.",
    },
  ]}
  curl={`
curl \\
--request POST http://localhost:3000/forms/chromium/convert/url \\
--form url=https://my.url \\
-o my.pdf`}
  responses={[
    {
      status: 200,
      description: "A PDF file or a ZIP archive...",
    },
  ]}
/>
```

Key rules:

- The `curl` example must be a valid, copy-pasteable command.
- Response descriptions must match Gotenberg's actual behavior.
- Use `defaultValue` in form fields when a default exists.
- Mark fields as `required: true` only when they are genuinely required.

### Shared Partials

Reusable documentation blocks live in `_shared/` directories:

- `docs/convert-with-chromium/_shared/`: Chromium features (assets, console, encryption, header/footer, HTTP networking, rendering behavior, structure metadata, PDF/A, split/page ranges)
- `docs/_shared/`: PDF engine features (attachments, encryption, flatten, metadata, PDF/A-UA, syntax validation)

When a feature applies to multiple endpoints, it MUST be a shared partial. Never duplicate content across pages. Import the partial instead.

### Admonitions

Use Docusaurus admonitions for callouts:

```mdx
:::info
Informational note about behavior or context.
:::

:::warning
Important caveat or potential pitfall.
:::

:::danger
Breaking behavior, data loss risk, or critical limitation.
:::

:::tip
Helpful suggestion or best practice.
:::
```

Reserve `:::danger` for genuinely dangerous situations. Use `:::info` for most callouts.

### Sidebar Updates

When adding a new page, update `sidebars.js`:

- API endpoints must include `className: "sidebar-method-post"` (or `-get`, `-head`) for the HTTP method badge.
- Place the page in the correct category following the existing order.
- Use `type: "doc"` with the document `id` matching the frontmatter.

### Versioning

The site supports versioned documentation (`versioned_docs/`, `versions.json`). Current docs live in `docs/`. Do not modify versioned docs unless explicitly asked. Changes to `docs/` apply to the current (next) version only.

---

## Designer Reference

Content for modifying site design, React components, styles, or layout (CSS, theme, homepage, `.js`/`.css` files).

### Technology Stack

- **Framework:** Docusaurus 3.8.1 (React 18)
- **Styling:** CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- **Fonts:** Inter (body, headings), JetBrains Mono (code), loaded via Google Fonts
- **Icons:** Inline SVGs in React components (no icon library)
- **Images:** `@docusaurus/plugin-ideal-image` for optimized images

### Design System

#### Colors

| Token                           | Value     | Usage                         |
| ------------------------------- | --------- | ----------------------------- |
| `--ifm-color-primary`           | `#008ae6` | Links, accents, primary CTA   |
| `--ifm-heading-color`           | `#0f172a` | H1 headings                   |
| `--ifm-color-content`           | `#334155` | Body text                     |
| `--ifm-color-content-secondary` | `#64748b` | Secondary text, sidebar links |
| `--ifm-border-color`            | `#e2e8f0` | Borders, dividers             |

HTTP method badge colors:

- POST: `#49cc90` (green)
- GET: `#61affe` (blue)
- PUT: `#fca130` (orange)
- DELETE: `#f93e3e` (red)
- HEAD: `#9061f9` (purple)

#### Typography

- H1: 3rem, weight 900, letter-spacing -0.03em, blue bottom border
- H2: 1.8rem, weight 800, letter-spacing -0.02em, gray bottom border
- H3: 1.4rem, weight 700, blue left border with padding
- Body: 1.05rem, line-height 1.75
- Code: 0.85em, weight 500, subtle gray background

#### Spacing and Layout

- Max content width: 840px (`.theme-doc-markdown`)
- Container width: 1366px
- Navbar height: 4rem
- Light mode only (dark mode switch is disabled)

### Component Architecture

#### Homepage (`src/components/Homepage.js`)

A standalone React component with CSS Modules (`Homepage.module.css`). Contains:

- Hero section with logo, tagline, and CTA buttons
- Community stats strip (Docker pulls, GitHub stars, license)
- Feature blocks with `SimpleTerminal` code previews
- Final CTA section

The `SimpleTerminal` component renders syntax-highlighted bash commands with a macOS-style window chrome (red/yellow/green dots).

#### ApiEndpoint (`src/components/documentation/ApiEndpoint.js`)

The core documentation component. Renders API endpoint information with:

- Method badge + path header
- Collapsible parameter lists (headers, form fields, form files)
- cURL example via Docusaurus `<CodeBlock>`
- Tabbed response display via Docusaurus `<Tabs>`

This component has its own CSS Module (`ApiEndpoint.module.css`).

#### Sponsors (`src/components/documentation/Sponsors.js`)

Renders sponsor logos at the bottom of documentation pages.

### Theme Overrides

- `src/theme/DocSidebar/index.js`: Custom sidebar with HTTP method badges via CSS pseudo-elements
- Sidebar badges are implemented purely in CSS using `::before` pseudo-elements on `.sidebar-method-*` classes

### CSS Conventions

- Use CSS custom properties (`--ifm-*`) for Docusaurus theme values
- Use CSS Modules for component-scoped styles
- Use `src/css/custom.css` only for global overrides (admonitions, sidebar, footer, typography)
- Transitions: `0.2s ease` for interactive elements, `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for larger animations
- Hover effects: subtle `translateY(-1px)` lift with colored box-shadow
- Use `clsx` for conditional class composition in React components

### Docusaurus Integration

- Respect Docusaurus's Infima CSS framework. Override with specificity, not `!important` (except documented exceptions).
- Use `@docusaurus/Link` for internal navigation, not `<a>` tags
- Use `useBaseUrl` for static asset paths
- Swizzled components live in `src/theme/`. Be cautious when upgrading Docusaurus.

### Responsive Design

- Tables switch to horizontal scroll below 1280px
- Content padding adjusts at 996px and 1400px breakpoints
- Homepage uses Docusaurus grid system (`col col--6`, `row`, `container`)
