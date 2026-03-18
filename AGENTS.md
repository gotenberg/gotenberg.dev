# Operational Guidelines for Gotenberg Documentation

You are working on **gotenberg.dev**, the official documentation website for [Gotenberg](https://github.com/gotenberg/gotenberg) — a Docker-based API for converting documents to PDF. This is a Docusaurus 3.x site serving the public-facing docs at https://gotenberg.dev. Accuracy and clarity are paramount: users rely on this documentation to integrate Gotenberg into production systems.

## Core Principles

- **Accuracy is law.** Every code sample, form field name, endpoint path, and configuration flag must match the actual Gotenberg API. When in doubt, cross-reference with the [Gotenberg source](https://github.com/gotenberg/gotenberg).
- **User-first writing.** Write for developers who want to get things done. Lead with the most common use case, then cover edge cases.
- **Consistency.** Follow established patterns for page structure, component usage, and terminology. Every API doc page uses the same layout and components.
- **No broken builds.** The site must build cleanly (`npm run build`) before any change is considered complete.

## Project Layout

```
docs/                        → Documentation content (MDX files).
  getting-started/           → Introduction, installation, clients.
  convert-with-chromium/     → Chromium conversion & screenshot endpoints.
    _shared/                 → Reusable MDX partials for Chromium features.
  convert-with-libreoffice/  → LibreOffice conversion endpoint.
  manipulate-pdfs/           → PDF manipulation endpoints (merge, split, encrypt, etc.).
  _shared/                   → Reusable MDX partials for PDF engine features.
  configuration.mdx          → Comprehensive configuration reference.
  webhook-download.mdx       → Webhook & download-from documentation.
  troubleshooting.mdx        → Common issues and solutions.
src/
  components/                → React components (Homepage, ApiEndpoint, Sponsors).
  css/custom.css             → Global styles (Inter font, color system, admonitions).
  theme/                     → Docusaurus theme overrides (sidebar).
static/img/                  → Image assets.
sidebars.js                  → Sidebar navigation structure.
docusaurus.config.js         → Site configuration (Algolia, navbar, footer).
versioned_docs/              → Previous version documentation snapshots.
```

## Quick Reference

- Dev server: `npm start`
- Production build: `npm run build`
- Format: `npm run format` (Prettier)
- Serve built site: `npm run serve`
- Clear cache: `npm run clear`

## Key Components and Patterns

### ApiEndpoint Component

All API endpoint documentation uses the `<ApiEndpoint>` React component (`src/components/documentation/ApiEndpoint.js`). It accepts:

- `method` — HTTP method (GET, POST, HEAD)
- `path` — Endpoint path (e.g., `/forms/chromium/convert/html`)
- `headers` — Array of `{ name, type, required, description }` objects
- `formFields` — Array of `{ name, type, required, description, defaultValue }` objects
- `formFiles` — Array of `{ name, type, required, description }` objects
- `curl` — Example cURL command string
- `responses` — Array of `{ status, description, body }` objects

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

- Start with `sidebars.js` to understand the documentation structure.
- API doc pages follow a consistent pattern: intro paragraph, `<ConfigurationInfo />`, basics section with `<ApiEndpoint>`, then imported shared partials for additional features.
- Shared partials in `docs/convert-with-chromium/_shared/` cover Chromium-specific features (headers/footers, rendering behavior, HTTP networking, console output, assets).
- Shared partials in `docs/_shared/` cover PDF engine features (encryption, flatten, metadata, PDF/A, attachments).
- The homepage (`src/components/Homepage.js`) is a custom React component, not an MDX page.

## Persona Selection (MANDATORY)

Before starting any task, you MUST read the appropriate persona file from `.agents/` based on what is being asked. This is not optional — the persona contains critical context you need.

| Task type                                                         | Persona to load                              | Trigger keywords / signals                                                                        |
| ----------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Writing or editing documentation content (new pages, fixing docs) | [`.agents/WRITER.md`](.agents/WRITER.md)     | "write", "document", "add page", "update docs", "fix typo", "reword", editing any `.mdx` file     |
| Modifying site design, components, styles, or layout              | [`.agents/DESIGNER.md`](.agents/DESIGNER.md) | "style", "design", "component", "layout", "CSS", "theme", "homepage", editing `.js`, `.css` files |

If a task spans multiple concerns (e.g., adding a new doc page AND creating a new component for it), load ALL relevant personas.
