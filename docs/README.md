# Documentation Content

Guidelines for writing or editing documentation pages: new pages, fixing docs, rewording, editing `.mdx` files.

## Page Structure Convention

Every API endpoint documentation page follows this structure:

1. **Frontmatter:** `id` and `title` fields
2. **Imports:** Shared MDX partials and React components
3. **Intro line:** One direct sentence saying what the endpoint does
4. **Configuration link:** Links to the configuration page for related flags (Chromium/LibreOffice pages)
5. **`## Basics`:** The `<ApiEndpoint>` component with method, path, headers, form fields/files, cURL example, and responses. Only used on pages with multiple sections; single-section pages skip this heading.
6. **Feature sections:** Each sub-section owns its form fields directly (no summary-then-detail duplication). Shared partials with `showFormFields={true}` render their own field definitions.
7. **`<Sponsors />`:** Sponsor component at the bottom

New pages must follow existing pages as templates.

## Writing Style

- **Short, declarative sentences.** Say what it does, then stop. No filler, no hedging.
- **Lead with the action.** "Merges multiple PDF files" not "This endpoint allows you to merge multiple PDF files".
- **Use second person sparingly.** "your files", "your HTML", but don't overuse "you can".
- **Prefer active voice.** "Gotenberg converts the file" not "The file is converted by Gotenberg".
- **Inline over admonitions.** Integrate caveats into prose. Only use `:::info`, `:::warning`, `:::danger` for genuinely critical information.
- **No "Use the X form field to..." pattern.** Describe the outcome directly: "Inject XMP metadata into the PDF" not "Use the `metadata` form field to inject XMP metadata".
- **Use inline code** for all technical terms: form field names (`url`), header names (`Gotenberg-Trace`), endpoint paths (`/forms/chromium/convert/url`), file names (`index.html`), CLI flags (`--api-port`), and environment variables.

## ApiEndpoint Component

All API endpoint documentation uses the `<ApiEndpoint>` React component (`src/components/documentation/ApiEndpoint.js`). It accepts:

- `method`: HTTP method (GET, POST, HEAD)
- `path`: Endpoint path (e.g., `/forms/chromium/convert/html`)
- `headers`: Array of `{ name, type, required, description }` objects
- `formFields`: Array of `{ name, type, required, description, defaultValue }` objects
- `formFiles`: Array of `{ name, type, required, description }` objects
- `curl`: Example cURL command string
- `responses`: Array of `{ status, description, body }` objects

Example:

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

- `docs/convert-with-chromium/_shared/`: Chromium features (assets, console, encryption, header/footer, HTTP networking, rendering behavior, structure metadata, PDF/A, split/page ranges)
- `docs/_shared/`: PDF engine features (attachments, encryption, flatten, metadata, PDF/A-UA, syntax validation)

When a feature applies to multiple endpoints, it MUST be a shared partial. Never duplicate content across pages. Import the partial instead.

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

The site supports versioned documentation (`versioned_docs/`, `versions.json`). Current docs live in `docs/`. Don't modify versioned docs unless explicitly asked. Changes to `docs/` apply to the current (next) version only.
