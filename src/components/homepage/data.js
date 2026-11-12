// Facts the homepage shows. Each one matches Gotenberg 9: routes and form
// fields in pkg/modules, stage options in pkg/modules/pdf, Factur-X embedding
// in litho.

import { curl, response } from "@site/src/lib/requests";
import STAGES from "@site/src/data/stages.json";

export const ARCHITECTURES = ["amd64", "arm64", "arm/v7", "386", "ppc64le"];

// Image tags by family: how many of the architectures a family ships for,
// then its tags.
export const IMAGES = [
  [5, [":9", ":9-chromium", ":9-libreoffice"]],
  [2, [":9-aws-lambda", ":9-chromium-aws-lambda", ":9-libreoffice-aws-lambda"]],
  [1, [":9-cloudrun", ":9-chromium-cloudrun", ":9-libreoffice-cloudrun"]],
];

const TAGS = IMAGES.flatMap(([, tags]) => tags);

// The tags as lines for a code panel: the tag, then its architectures. A
// family's first line is marked: on a narrow panel its architectures head
// the family instead (.tag in the stylesheet).
const width = Math.max(...TAGS.map((tag) => tag.length));
const images = IMAGES.flatMap(([count, tags]) =>
  tags.map((tag, i) => ({
    cls: i ? "ln tag" : "ln tag tag--head",
    parts: [
      { t: tag.padEnd(width + 2), c: "t-c" },
      { t: ARCHITECTURES.slice(0, count).join(" "), c: "t-m" },
    ],
  })),
);

// An answer as lines for a code panel: its status, then its body, each row
// hanging from its own indentation. A row starting with "#" is a comment.
const reply = (status, rows) => ({
  status,
  lines: response(rows.map((row) => row.trimStart())).map((line, i) => ({
    ...line,
    cls: /\bwrap\b/.test(line.cls)
      ? `${line.cls} hang`
      : `${line.cls} wrap hang`,
    indent: rows[i].length - rows[i].trimStart().length,
  })),
});

// What Gotenberg does, part by part: its drawing (Figures.js), a title, two
// sentences, the docs pages behind them and one request. The stages pass
// Stages.validateOrder in pkg/modules/pdf/stages.go; their count comes from
// the reference data, which `npm run check:api` compares with Gotenberg.
export const PARTS = [
  {
    figure: "Convert",
    title: "Convert to PDF.",
    text: "Chromium prints a URL, HTML or Markdown. LibreOffice converts Word, Excel, PowerPoint and over a hundred other formats.",
    links: [
      ["URL", "/docs/chromium/convert-url"],
      ["HTML", "/docs/chromium/convert-html"],
      ["Markdown", "/docs/chromium/convert-markdown"],
      ["Office documents", "/docs/libreoffice/convert"],
    ],
    bar: "Chromium · /forms/chromium/convert/url",
    request: curl(
      "/forms/chromium/convert/url",
      [["form", "url", "https://example.com", "url"]],
      "example.pdf",
    ),
  },
  {
    figure: "Stages",
    count: STAGES.stages.length,
    title: `${STAGES.stages.length} stages on any PDF.`,
    text: "Merge, split, stamp, sign, encrypt, redact. List them in the stages field: Gotenberg runs them in order, on a PDF or right after a conversion.",
    links: [
      ["Pipe stages", "/docs/pdf/pipe"],
      ["Every route", "/docs/getting-started/routes"],
      ["Sign a contract", "/docs/cookbook/sign-contract"],
    ],
    bar: "litho · /forms/pdf/pipe",
    request: curl(
      "/forms/pdf/pipe",
      [
        ["form", "files", "report.pdf", "file"],
        ["form", "files", "annex.pdf", "file"],
        [
          "form",
          "stages",
          [
            { op: "merge" },
            { op: "set-metadata", title: "Q3 report" },
            { op: "remediate", profile: "PDF/A-4" },
            { op: "optimize" },
          ],
          "list",
        ],
      ],
      "archive.pdf",
    ),
  },
  {
    figure: "Conform",
    title: "Validate, then remediate.",
    text: "Checks a PDF against PDF/A, PDF/UA and Factur-X, clause by clause. Remediation repairs it until it conforms and reports what it couldn't fix.",
    links: [
      ["Validate", "/docs/pdf/validate"],
      ["Remediate", "/docs/pdf/remediate"],
      ["Autotag", "/docs/pdf/autotag"],
      ["Archive documents", "/docs/cookbook/archive-documents"],
    ],
    bar: "litho · /forms/pdf/validate",
    request: curl(
      "/forms/pdf/validate",
      [
        ["form", "files", "report.pdf", "file"],
        ["form", "profile", "PDF/UA-1"],
      ],
      null,
    ),
    // What Gotenberg 9.4.1 answers for examples/report.pdf: 13 violations,
    // the first one shown whole.
    reply: reply("200 application/json", [
      "{",
      '  "report.pdf": {',
      '    "profile": "PDF/UA-1",',
      '    "compliant": false,',
      '    "violations": [',
      "      {",
      '        "specification": "ISO_14289_1",',
      '        "clause": "6.2",',
      '        "testNumber": 1,',
      '        "description": "The document catalog dictionary shall include a MarkInfo dictionary containing an entry, Marked, whose value shall be true",',
      '        "context": "catalog missing /MarkInfo",',
      '        "severity": "fatal"',
      "      },",
      "      # 12 more violations",
      "    ]",
      "  }",
      "}",
    ]),
  },
  {
    figure: "Invoice",
    title: "Factur-X, ZUGFeRD, XRechnung.",
    text: "Send the invoice with its Cross-Industry Invoice XML. One remediate stage returns a PDF/A-3 hybrid invoice.",
    links: [
      ["E-invoice from HTML", "/docs/cookbook/e-invoice"],
      ["Remediate", "/docs/pdf/remediate"],
      ["Attachments", "/docs/pdf/attachments"],
    ],
    bar: "LibreOffice · /forms/libreoffice/convert",
    request: curl(
      "/forms/libreoffice/convert",
      [
        ["form", "files", "invoice.docx", "file"],
        ["form", "files", "invoice.xml", "file"],
        [
          "form",
          "stages",
          [
            {
              op: "remediate",
              profile: "Factur-X",
              xml: "invoice.xml",
              level: "EN 16931",
            },
          ],
          "list",
        ],
      ],
      "invoice.pdf",
    ),
  },
  {
    figure: "Deliver",
    title: "Straight to your bucket.",
    text: "Gotenberg fetches the source from a presigned URL and answers 204. Once the work is done, it uploads the PDF to your bucket, then posts an event.",
    links: [
      ["Webhooks", "/docs/webhook-download"],
      ["Upload results to S3", "/docs/cookbook/s3-upload"],
      ["Headers", "/docs/reference/headers"],
    ],
    bar: "LibreOffice · /forms/libreoffice/convert",
    request: curl(
      "/forms/libreoffice/convert",
      [
        [
          "form",
          "downloadFrom",
          [
            {
              url: "https://bucket.s3.amazonaws.com/in.docx?X-Amz-Signature=…",
            },
          ],
          "list",
        ],
        [
          "header",
          "Gotenberg-Webhook-Url",
          "https://bucket.s3.amazonaws.com/out.pdf?X-Amz-Signature=…",
        ],
        ["header", "Gotenberg-Webhook-Method", "PUT"],
        [
          "header",
          "Gotenberg-Webhook-Events-Url",
          "https://api.example.com/events",
        ],
      ],
      null,
    ),
  },
  {
    figure: "Images",
    count: TAGS.length,
    title: "Nine images, five architectures.",
    text: "The full image carries Chromium and LibreOffice. The -chromium and -libreoffice images carry one of them. AWS Lambda and Cloud Run get their own.",
    links: [
      ["Install", "/docs/getting-started/installation"],
      ["Production", "/docs/operate/production"],
      ["Configuration", "/docs/configuration"],
      ["Clients", "/docs/getting-started/clients"],
    ],
    bar: "gotenberg/gotenberg",
    request: { lines: images },
  },
];
