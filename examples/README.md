# Example files

The files the docs' `<Request>` examples upload. `npm run check:examples` copies this folder next to every command it runs, so each name a `<Request>` sends (`files`, `archives`) must exist here. Docusaurus doesn't serve this folder.

- `index.html`, `style.css`: a small HTML page and its stylesheet.
- `site.zip`: the same two files, zipped, for the `archives` field.
- `report.docx`, `report.pdf`: a three-page document, from Gotenberg's integration tests.
- `annex.docx`: a one-page document, from the same tests.
