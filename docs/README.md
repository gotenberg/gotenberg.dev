# Documentation Content

Guidelines for writing or editing documentation pages: new pages, fixing docs, rewording, editing `.mdx` files.

## Page structure

Every API endpoint documentation page follows this layout:

1. Frontmatter: `id` and `title` fields.
2. Imports: shared MDX partials and React components.
3. Intro line: one direct sentence saying what the endpoint does.
4. Configuration link: links to the configuration page for related flags.
5. `## Basics`: the `<ApiEndpoint>` component with method, path, headers, form fields/files, cURL example, and responses. Skip this heading on single-section pages.
6. Feature sections: each sub-section owns its form fields directly. Shared partials with `showFormFields={true}` render their own field definitions.
7. `<Sponsors />`: sponsor component at the bottom.

New pages must follow existing pages as templates.

## Writing style

- Short, declarative sentences. Say what it does, then stop.
- Lead with the action. "Merges multiple PDF files", not "This endpoint allows you to merge multiple PDF files".
- Use second person sparingly. "your files", "your HTML", but don't overuse "you can".
- Prefer active voice. "Gotenberg converts the file", not "The file is converted by Gotenberg".
- Inline over admonitions. Integrate caveats into prose. Only use `:::info`, `:::warning`, `:::danger` for genuinely critical information.
- No "Use the X form field to..." pattern. Describe the outcome directly: "Inject XMP metadata into the PDF", not "Use the `metadata` form field to inject XMP metadata".
- Use inline code for all technical terms: form field names (`url`), header names (`Gotenberg-Trace`), endpoint paths (`/forms/chromium/convert/url`), file names (`index.html`), CLI flags (`--api-port`), environment variables.

## ApiEndpoint component

All API endpoint documentation uses the `<ApiEndpoint>` React component (`src/components/documentation/ApiEndpoint.js`). It accepts:

- `method`: HTTP method (GET, POST, HEAD)
- `path`: endpoint path (e.g., `/forms/chromium/convert/html`)
- `headers`: array of `{ name, type, required, description }` objects
- `formFields`: array of `{ name, type, required, description, defaultValue }` objects
- `formFiles`: array of `{ name, type, required, description }` objects
- `curl`: example cURL command string
- `responses`: array of `{ status, description, body }` objects

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

Rules:

- The `curl` example must be a valid, copy-pasteable command.
- Response descriptions must match Gotenberg's actual behavior.
- Use `defaultValue` in form fields when a default exists.
- Mark fields as `required: true` only when genuinely required.

## Shared partials

Reusable documentation blocks live in `_shared/` directories:

- `docs/convert-with-chromium/_shared/`: Chromium features (assets, console, encryption, header/footer, HTTP networking, rendering behavior, structure metadata, PDF/A, split/page ranges).
- `docs/_shared/`: PDF engine features (attachments, encryption, flatten, metadata, PDF/A-UA, syntax validation).

When a feature applies to multiple endpoints, it must be a shared partial. Never duplicate content across pages.

## Admonitions

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
```

Reserve `:::danger` for genuinely dangerous situations. Use `:::info` for most callouts.

## Sidebar updates

When adding a new page, update `sidebars.js`:

- API endpoints must include `className: "sidebar-method-post"` (or `-get`, `-head`) for the HTTP method badge.
- Place the page in the correct category following the existing order.
- Use `type: "doc"` with the document `id` matching the frontmatter.

## Versioning

Current docs live in `docs/`. Versioned docs live in `versioned_docs/`. Don't modify versioned docs unless explicitly asked. Changes to `docs/` apply to the current (next) version only.
