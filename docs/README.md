# Documentation Content

Guidelines for writing or editing documentation pages: new pages, fixing docs, rewording, editing `.mdx` files.

The 9.x docs follow what you want to do, not the list of routes. Their tone and shape take after [Ghostty's docs](https://ghostty.org/docs): get running first, then one short explanation and one copyable example at a time, with the full reference kept on its own pages.

## Page types

- **Landing and section pages** route the reader by goal with `<CardGrid>` and `<Card>`. `docs/index.mdx` is the landing page, served at `/docs`.
- **Guides** cover one task: "Your first PDF", "Sign a PDF". Title the page after the task. Open with one sentence that says what the reader gets, then alternate a short explanation and a `<Request>`. Each section adds one thing. End with `## Next`: one sentence, one or two links.
- **Recipes** (the Cookbook) solve one end-to-end problem in as few requests as possible: what you have, what you want, the request, the result, why it works, variations. Link to the guides instead of re-explaining them.
- **Reference pages** list every route, stage, header and flag, once. Guides and recipes link to them instead of repeating option lists.
- **Help pages** cover troubleshooting and support.

Sponsor logos render automatically as a full-width band below every doc page (mounted in `src/theme/DocRoot/Layout`). Do not add a `<Sponsors />` import or component to pages.

## Writing style

- Short, declarative sentences. Say what it does, then stop.
- Lead with the action. "Merges multiple PDF files", not "This endpoint allows you to merge multiple PDF files".
- Talk to the reader: "your HTML", "Send the URL". Confident, never hedging: "Gotenberg needs no configuration to start."
- Prefer active voice. "Gotenberg converts the file", not "The file is converted by Gotenberg".
- Show, then explain. The example comes first, the sentence after says what to notice in it.
- Inline over admonitions. Integrate caveats into prose. Only use `:::info`, `:::warning`, `:::danger` for genuinely critical information, at most one per page.
- No "Use the X form field to..." pattern. Describe the outcome directly: "Inject XMP metadata into the PDF", not "Use the `metadata` form field to inject XMP metadata".
- Use inline code for all technical terms: form field names (`url`), header names (`Gotenberg-Trace`), endpoint paths (`/forms/chromium/convert/url`), file names (`index.html`), CLI flags (`--api-port`), environment variables.
- No em dashes, no "we".

## Examples

Write every request with `<Request>` (`src/components/documentation/Request.js`), available on every page without an import. It builds the cURL command from its parts, so every example reads the same, and shows the response when you give one:

```jsx
<Request
  route="/forms/libreoffice/convert"
  files={["report.docx"]}
  fields={{ paperSize: "A4" }}
  stages={[{ op: "remediate", profile: "PDF/A-4" }]}
  headers={{ "Gotenberg-Output-Filename": "report" }}
  output="report.pdf"
  response={`HTTP/1.1 200 OK
Content-Type: application/pdf`}
/>
```

- `files`: file names under `files`, or `{ field, name }` for another field, such as `archives`.
- `fields`: form fields. An array prints one item per line; an object prints as JSON.
- `stages`: the `stages` field.
- `status`: the status the example answers with, 200 by default.
- `run={false}`: for an example the check can't run, such as one that downloads from a URL you don't control.

Every example must run. `npm run check:examples` reads the examples of a built site and runs each cURL command, exactly as a reader copies it, against a Gotenberg container (`GOTENBERG_URL`, `http://localhost:3000` by default). It runs them from `examples/`, which holds every file the examples upload: add the file there when an example needs a new one. Copy responses from real runs, never write them by hand.

```bash
npm run build
docker run --rm -p "3000:3000" gotenberg/gotenberg:9
npm run check:examples
```

## ApiEndpoint component

Reference pages document a route with the `<ApiEndpoint>` React component (`src/components/documentation/ApiEndpoint.js`). It accepts:

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
- `type` is one of `string`, `boolean`, `enum`, `integer`, `number`, `json`, `file`, `file[]`, `duration`. Use `enum` for a fixed set of allowed values (never `string`); pick `integer` vs `number` to match the value.
- In `description` strings, wrap literal values in backticks (`` `intervals` ``, `` `PDF/A-3b` ``, `` `90` ``). The component renders them as subtly highlighted value spans, so don't use quotes.

## Shared partials

Reusable documentation blocks live in `_shared/` directories next to the pages that import them. The 8.x docs keep theirs in `versioned_docs/version-8.x/convert-with-chromium/_shared/` (Chromium features) and `versioned_docs/version-8.x/_shared/` (PDF engine features).

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

- Place the page in the section of the task it serves, following the existing order.
- Use the document `id` matching the frontmatter.
- Reference pages for a route include `className: "sidebar-method-post"` (or `-get`, `-head`) for the HTTP method badge.

## Versioning

Current docs (9.x) live in `docs/` and are served under `/docs/`. They are being written, section by section. The 8.x docs live in `versioned_docs/version-8.x/` and are served under `/docs/8.x/`, so their absolute links start with `/docs/8.x/`. Don't modify versioned docs unless explicitly asked. Changes to `docs/` apply to 9.x only.
