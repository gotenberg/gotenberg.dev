# Example files

The files the docs' `<Request>` examples upload. `npm run check:examples` copies this folder next to every command it runs, so each name a `<Request>` sends (`files`, `archives`) must exist here. Docusaurus doesn't serve this folder.

- `index.html`, `style.css`: a small HTML page and its stylesheet.
- `header.html`, `footer.html`: a header with the page title and a footer with page numbers, for Chromium.
- `markdown/`: an `index.html` that lays out `notes.md`, with its stylesheet, for the Markdown routes. Examples run from it with `dir="markdown"`.
- `site.zip`: the same two files, zipped, for the `archives` field.
- `report.docx`, `report.pdf`: a three-page document, from Gotenberg's integration tests. Gotenberg gave `report.pdf` a title, an author and three bookmarks.
- `annex.docx`, `annex.pdf`: a one-page document, from the same tests.
- `logo.png`: the Gotenberg logo, for image stamps.
- `form.pdf`: a PDF form with one field, `name`.
- `invoice.xml`: a Factur-X invoice at the MINIMUM level. `invoice.pdf` is `report.pdf` with it embedded, made by Gotenberg.
- `encrypted.pdf`: `report.pdf` encrypted with the user password `secret`, made by Gotenberg.
- `cert.pem`, `key.pem`: a self-signed test certificate and its key, from Gotenberg's tests. Never sign anything real with them.
