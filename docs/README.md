# Documentation Content

Guidelines for writing or editing documentation pages: new pages, fixing docs, rewording, editing `.mdx` files.

The 9.x docs follow the API, as the 8.x docs did: one page per route, with everything the route takes. Guides, recipes and operations pages surround them. Their tone takes after [Ghostty's docs](https://ghostty.org/docs): one short explanation and one copyable example at a time.

## Page types

- **The landing page**, `docs/index.mdx`, served at `/docs`, routes the reader with `<CardGrid>` and `<Card>`.
- **Route pages** document one route each, under a URL that follows the route: `/forms/chromium/convert/html` is `docs/chromium/convert-html.mdx`, `/forms/pdf/merge` is `docs/pdf/merge.mdx`. Title the page after what the route does, "Convert HTML to PDF", with a short `sidebar_label`. Open with one sentence, then `<Endpoint>`, then a basic `<Request>`, then one section per feature, each with its example.
- **Guides** cover one task: "Your first PDF", "Sign a PDF". Title the page after the task. Open with one sentence that says what the reader gets, then alternate a short explanation and a `<Request>`. Each section adds one thing. End with `## Next`: one sentence, one or two links.
- **Recipes** (the Cookbook) solve one end-to-end problem in as few requests as possible: what you have, what you want, the request, the result, why it works, variations. Link to the guides instead of re-explaining them.
- **Reference pages** list every header, flag and error, once. Guides and recipes link to them, and to the route pages, instead of repeating option lists.
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
- `method`: `GET` or `HEAD` for the system routes, `POST` by default.
- `host`: another Gotenberg than `http://localhost:3000`, such as the live demo. The check runs the example against its container all the same.
- `dir`: a subfolder of `examples/` to run from, when a route needs a file name another example already uses, such as the Markdown route's `index.html`.
- `response`: the response, as text, or as an object for JSON, which the component indents: MDX strips the indentation of a multi-line string.
- `status`: the status the example answers with, 200 by default.
- `run={false}`: for an example the check can't run, such as one that downloads from a URL you don't control.

Every example must run. `npm run check:examples` reads the examples of a built site and runs each cURL command, exactly as a reader copies it, against a Gotenberg container (`GOTENBERG_URL`, `http://localhost:3000` by default). It runs them from `examples/`, which holds every file the examples upload: add the file there when an example needs a new one. Copy responses from real runs, never write them by hand.

```bash
npm run build
docker run --rm -p "3000:3000" gotenberg/gotenberg:9
npm run check:examples
```

## Reference data

The reference pages render data, so a fact lives in one place:

- `src/data/flags.json`: every flag, generated from Gotenberg's own `--help` by `npm run sync:flags` (`GOTENBERG_IMAGE` picks the image). Don't edit it by hand: fix a description in Gotenberg, then sync. `<ConfigReference module="…">` renders a module's flags on the configuration page.
- `src/data/stages.json`: every stage, its options and an example, written by hand. `<Stage op="…">` renders one on the stages page.
- `src/data/routes.json`: every route, written by hand: its `input` fields, whether it takes `stages`, the field `groups` it takes, and its `response`. Then the fields of each group with their defaults (`common` holds the fields every route takes), and the extensions LibreOffice converts. `<RouteTable group="…">` renders a group of routes, and `<Extensions>` the extensions.

`npm run check:api` compares them with Gotenberg: stage and option names with the stage structs of a checkout (`GOTENBERG_SOURCE`, `../gotenberg` by default), route paths, input and field names and extensions with the route code of that checkout, flags with the image's `--help`. Run it, and `npm run check:examples`, before a release.

## Endpoint component

`<Endpoint path="…">` opens a route page with the route's card: its method and path, the fields it takes, grouped, each an anchor such as `/docs/chromium/convert-html#waitDelay`, and its response. It renders `src/data/routes.json`. `<Endpoint op="…">` renders a stage's own route, `/forms/pdf/<op>`, from `src/data/stages.json`, whose optional `response` overrides the default one. Both are available on every page without an import.

The 8.x pages use `<ApiEndpoint>` (`src/components/documentation/ApiEndpoint.js`), with the card's content written inline. Leave it to them.

## Shared partials

Reusable documentation blocks live in `_shared/` directories next to the pages that import them, such as `docs/chromium/_shared/` for the features every Chromium route shares. A partial takes the page's route and input as props, `route`, `dir`, `files`, `fields` and `output`, so its examples run on the route the reader is on. An example that needs a page built for it, such as the waits, names its route itself.

When a feature applies to multiple routes, it must be a shared partial. Never duplicate content across pages.

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

- Place a route page in its engine's section, and any other page in the section of the task it serves, following the existing order.
- Use the document `id` matching the frontmatter.
- Route pages go through `post(...)` (or `get(...)`), which adds the method badge.

## Versioning

Current docs (9.x) live in `docs/` and are served under `/docs/`. They are being written, section by section. The 8.x docs live in `versioned_docs/version-8.x/` and are served under `/docs/8.x/`, so their absolute links start with `/docs/8.x/`. Don't modify versioned docs unless explicitly asked. Changes to `docs/` apply to 9.x only.
