# Contributing to gotenberg.dev

This is the official documentation website for [Gotenberg](https://github.com/gotenberg/gotenberg), a Docker-based API for converting documents to PDF. Built with Docusaurus 3.x, served at https://gotenberg.dev. Accuracy and clarity are paramount: users rely on this documentation to integrate Gotenberg into production systems.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Build and Run

```bash
npm install
npm start     # Dev server at http://localhost:3000
```

### Development Loop

```bash
npm run format   # Format all files with Prettier
npm run build    # Verify the site builds without errors
npm run serve    # Preview the production build locally
```

## Submitting a Pull Request

For non-trivial changes, outline your approach in the PR description: what you're changing, why, and which files are affected. This helps reviewers and prevents wasted effort.

Before opening a PR, verify:

- [ ] Site builds without errors: `npm run build`
- [ ] Files are formatted: `npm run format`
- [ ] All links and imports resolve correctly
- [ ] cURL examples are valid and copy-pasteable
- [ ] Form field names, types, and defaults match the actual Gotenberg API
- [ ] Components render correctly at desktop (1440px), laptop (1024px), and tablet (768px) widths
- [ ] No console errors or React warnings in the browser

### Guidelines

- **Accuracy first.** Every endpoint path, form field name, and code sample must match the actual Gotenberg API. When in doubt, cross-reference with the [Gotenberg source](https://github.com/gotenberg/gotenberg).
- **One thing per PR.** Keep content changes, component changes, and style changes in separate PRs when possible.
- **Follow established patterns.** New API doc pages must use the `<ApiEndpoint>` component and follow the same structure as existing pages.
- **Use shared partials.** If a feature applies to multiple endpoints, document it as a reusable `_shared/` partial. Never duplicate content across pages.
- **Don't break versioned docs.** Changes to `docs/` apply to the current version only. Don't modify `versioned_docs/` unless explicitly needed.

### Commit Conventions

If committing, follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `docs:`, `feat:`, `fix:`, `style:`). Stage specific files only. Never `git add -A` or `git add .`. Write a concise commit message that explains _why_, not just _what_.

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

## Project Layout

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

## Codebase Navigation

- Start with `sidebars.js` to understand the documentation structure.
- API doc pages follow a consistent pattern: intro paragraph, `<ConfigurationInfo />`, basics section with `<ApiEndpoint>`, then imported shared partials for additional features.
- Shared partials in `docs/convert-with-chromium/_shared/` cover Chromium-specific features (headers/footers, rendering behavior, HTTP networking, console output, assets).
- Shared partials in `docs/_shared/` cover PDF engine features (encryption, flatten, metadata, PDF/A, attachments).
- The homepage (`src/components/Homepage.js`) is a custom React component, not an MDX page.

## npm: the Only Build Interface

| Command          | Purpose                            |
| :--------------- | :--------------------------------- |
| `npm start`      | Start the dev server               |
| `npm run build`  | Production build                   |
| `npm run format` | Format all files with Prettier     |
| `npm run serve`  | Serve the production build locally |
| `npm run clear`  | Clear the Docusaurus cache         |

## Review Checklist

- [ ] **Accuracy.** Every endpoint path, form field name, code sample, and configuration flag matches the actual Gotenberg API.
- [ ] **Backward compatibility.** No broken links, no removed content without replacement, no changed URLs.
- [ ] **Consistency.** Follows established page structure, component usage, and terminology.
- [ ] **Code quality.** Formatted with Prettier (`npm run format`), no linting errors, no unused imports.
- [ ] **Documentation.** Shared partials used where appropriate. No duplicated content across pages.
- [ ] **Build.** `npm run build` passes without errors or warnings.

## Scoped Guidelines

Domain-specific reference material lives in subdirectory READMEs:

- [Documentation content](docs/README.md): writing style, page structure, ApiEndpoint component, shared partials, admonitions, sidebar, versioning
- [Site design and components](src/README.md): technology stack, design system, component architecture, CSS conventions, responsive design
