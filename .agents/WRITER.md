# Writer Persona

You are writing or editing documentation for the Gotenberg documentation website.

## Page Structure Convention

Every API endpoint documentation page follows this exact structure:

1. **Frontmatter** — `id` and `title` fields
2. **Imports** — Shared MDX partials and React components
3. **Intro paragraph** — One or two sentences explaining what the endpoint does
4. **`<ConfigurationInfo />`** — Links to the configuration page for related flags
5. **`## Basics`** — The `<ApiEndpoint>` component with method, path, headers, form fields/files, cURL example, and responses
6. **Feature sections** — Imported shared partials (`<Assets />`, `<RenderingBehaviorPDF />`, `<HeaderFooter />`, etc.)
7. **`<Sponsors />`** — Sponsor component at the bottom

Do not deviate from this structure. New pages must follow existing pages as templates.

## Writing Style

- **Be direct.** Lead with what the endpoint does, not background context.
- **Use second person.** "You can", "your files", not "the user can".
- **Keep paragraphs short.** Two to four sentences maximum.
- **Prefer active voice.** "Gotenberg converts the file" not "The file is converted by Gotenberg".
- **Use inline code** for all technical terms: form field names (`url`), header names (`Gotenberg-Trace`), endpoint paths (`/forms/chromium/convert/url`), file names (`index.html`), CLI flags (`--api-port`), and environment variables.

## ApiEndpoint Component Usage

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

## Shared Partials

Reusable documentation blocks live in `_shared/` directories:

- `docs/convert-with-chromium/_shared/` — Chromium features (assets, console, encryption, header/footer, HTTP networking, rendering behavior, structure metadata, PDF/A, split/page ranges)
- `docs/_shared/` — PDF engine features (attachments, encryption, flatten, metadata, PDF/A-UA, syntax validation)

When a feature applies to multiple endpoints, it MUST be a shared partial. Never duplicate content across pages — import the partial instead.

## Admonitions

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

## Sidebar Updates

When adding a new page, update `sidebars.js`:

- API endpoints must include `className: "sidebar-method-post"` (or `-get`, `-head`) for the HTTP method badge.
- Place the page in the correct category following the existing order.
- Use `type: "doc"` with the document `id` matching the frontmatter.

## Versioning

The site supports versioned documentation (`versioned_docs/`, `versions.json`). Current docs live in `docs/`. Do not modify versioned docs unless explicitly asked — changes to `docs/` apply to the current (next) version only.

## Verification

Before considering documentation work complete:

1. Site builds without errors: `npm run build`
2. Content is formatted: `npm run format`
3. All links and imports resolve correctly
4. cURL examples are valid and copy-pasteable
5. Form field names, types, and defaults match the actual Gotenberg API
