# Contributing to gotenberg.dev

Official documentation website for [Gotenberg](https://github.com/gotenberg/gotenberg), built with Docusaurus 3.x, served at https://gotenberg.dev. Two rules override everything else: **accuracy** (every endpoint path, form field name, and code sample must match the actual Gotenberg API) and **clarity** (short declarative sentences, no filler, no hedging).

- Node.js (LTS recommended)
- npm

## Quick start

```bash
npm install
npm start        # Dev server at http://localhost:3000
npm run format   # Format all files with Prettier
npm run build    # Verify the site builds without errors
npm run serve    # Preview the production build locally
npm run clear    # Clear the Docusaurus cache
```

## Project layout

```
docs/                          MDX documentation content
  _shared/                     Shared partials for PDF engine features
  convert-with-chromium/       Chromium endpoint docs + _shared/ partials
  convert-with-libreoffice/    LibreOffice endpoint docs
  getting-started/             Introduction, installation, clients
  manipulate-pdfs/             PDF manipulation endpoint docs
  system/                      Health, version, debug, metrics endpoint docs
  configuration.mdx            Module configuration reference
  troubleshooting.mdx          Common issues and solutions
  webhook-download.mdx         Webhook and download-from docs
  telemetry.mdx                Telemetry docs
src/
  components/                  React components (Homepage, ApiEndpoint, Sponsors)
  css/                         Global CSS (custom.css)
  pages/                       Custom pages (index.js)
  theme/                       Docusaurus theme overrides (DocSidebar)
sidebars.js                    Navigation structure
docusaurus.config.js           Site configuration
```

Start with `sidebars.js` to understand the documentation structure. API doc pages follow a consistent pattern: intro paragraph, `<ConfigurationInfo />`, basics section with `<ApiEndpoint>`, then imported shared partials.

## Writing rules

### Tone

- Short, declarative sentences. Say what it does, then stop.
- Lead with the action. "Merges multiple PDF files", not "This endpoint allows you to merge multiple PDF files".
- Active voice. "Gotenberg converts the file", not "The file is converted by Gotenberg".
- No em dashes. Use a period, colon, or comma.
- No "we" hedging. "Don't expose...", not "We do not recommend exposing...".
- No robotic patterns. Never start with "This endpoint...", "This route...", or "Use the X form field to...".
- One sentence, not two. If the second sentence restates the first with more words, delete it.

### Admonitions

Integrate warnings and notes into prose. Reserve `:::info`, `:::warning`, `:::danger` for genuinely critical information that must stand out. Most pages should have zero or one admonition.

### Shared partials

When a feature applies to multiple endpoints, document it as a reusable `_shared/` partial. Never duplicate content across pages. Shared partials in `docs/convert-with-chromium/_shared/` cover Chromium features. Shared partials in `docs/_shared/` cover PDF engine features.

### Versioning

Current docs live in `docs/`. Don't modify `versioned_docs/` unless explicitly needed.

## Pull requests

Plan non-trivial changes before coding. Present what you're changing, why, and which files are affected.

### Checklist

- [ ] Every endpoint path, form field name, code sample, and configuration flag matches the actual Gotenberg API
- [ ] No broken links, no removed content without replacement, no changed URLs
- [ ] Follows established page structure, component usage, and terminology
- [ ] Shared partials used where appropriate, no duplicated content
- [ ] cURL examples are valid and copy-pasteable
- [ ] Components render correctly at desktop (1440px), laptop (1024px), and tablet (768px) widths
- [ ] No console errors or React warnings in the browser
- [ ] Formatted with Prettier: `npm run format`
- [ ] `npm run build` passes without errors or warnings

### Commits

[Conventional Commits](https://www.conventionalcommits.org/): `docs:`, `feat:`, `fix:`, `style:`.

Stage specific files. Never `git add -A` or `git add .`.

## Scoped guidelines

- [Documentation content](docs/README.md): page structure, ApiEndpoint component, shared partials, sidebar, versioning.
- [Site design and components](src/README.md): design system, component architecture, CSS conventions, responsive design.
