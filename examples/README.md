# Example files

The files the docs' `<Request>` examples upload. `npm run check:examples` copies this folder next to every command it runs, so each name a `<Request>` sends (`files`, `archives`) must exist here. Docusaurus doesn't serve this folder.

- `index.html`, `style.css`: a small HTML page and its stylesheet.
- `header.html`, `footer.html`: a header with the page title and a footer with page numbers, for Chromium.
- `markdown/`: an `index.html` that lays out `notes.md`, with its stylesheet, for the Markdown routes. Examples run from it with `dir="markdown"`.
- `wait/`: an `index.html` whose script draws a chart a second after it loads, for the waits, with copies of `header.html` and `footer.html`.
- `documents.zip`: `report.docx` and `annex.docx`, zipped, for the `archives` field.
- `print/`: an `index.html` and `print.css` with an `@page` size, a page break and print-only rules.
- `site.zip`: the same two files, zipped, for the `archives` field.
- `report.docx`, `report.pdf`: a three-page document, from Gotenberg's integration tests. Gotenberg gave `report.pdf` a title, an author and three bookmarks.
- `annex.docx`, `annex.pdf`: a one-page document, from the same tests.
- `logo.png`: the Gotenberg logo, for image stamps.
- `black.png`: one black pixel, stretched over redacted regions.
- `letterhead.pdf`: a band with a company name on a transparent page the size of `report.pdf`'s, made by Gotenberg from HTML.
- `form.pdf`: a PDF form with one field, `name`.
- `fields.pdf`: a form with a checkbox, `agree`, and a combo box, `color` (Red or Green).
- `multi.pdf`: a two-page form with a read-only text field, a radio group, a signature field and a list that selects several, `tags`.
- `invoice.xml`: a Factur-X invoice at the EN 16931 level, the European standard for e-invoices. `invoice.pdf` is `report.pdf` with it embedded, made by Gotenberg.
- `protected.docx`: `report.docx` encrypted with the password `secret`, by msoffcrypto-tool.
- `sales.csv`: 120 rows of sales, which LibreOffice prints on three pages, for spreadsheets.
- `encrypted.pdf`: `report.pdf` encrypted with the user password `secret`, made by Gotenberg.
- `archive.pdf`: `report.pdf` remediated to PDF/A-2b and PDF/UA-1 together, made by Gotenberg. veraPDF passes it on both.
- `cert.pem`, `key.pem`: a self-signed test certificate and its key, from Gotenberg's tests. Never sign anything real with them.
- `cert.p12`: the same certificate and key as a PKCS#12 file, with the password `secret`, made with OpenSSL. Test only, like them.
