// Facts the homepage shows. Each one matches Gotenberg 9: routes and form
// fields in pkg/modules, stage options in pkg/modules/pdf, Factur-X embedding
// in litho.

// paperSize values, in mm.
export const SIZES = [
  ["A3", 297, 420],
  ["A4", 210, 297],
  ["A5", 148, 210],
  ["B4", 250, 353],
  ["B5", 176, 250],
  ["Letter", 215.9, 279.4],
  ["Legal", 215.9, 355.6],
  ["Tabloid", 279.4, 431.8],
];

export const ENGINES = [
  {
    key: "url",
    engine: "Chromium",
    label: "URL",
    route: "/forms/chromium/convert/url",
    form: [["url", "https://example.com", "url"]],
    out: "example.pdf",
  },
  {
    key: "html",
    engine: "Chromium",
    label: "HTML",
    route: "/forms/chromium/convert/html",
    form: [["files", "index.html", "file"]],
    out: "index.pdf",
  },
  {
    key: "markdown",
    engine: "Chromium",
    label: "Markdown",
    route: "/forms/chromium/convert/markdown",
    form: [
      ["files", "index.html", "file"],
      ["files", "notes.md", "file"],
    ],
    out: "notes.pdf",
  },
  {
    key: "office",
    engine: "LibreOffice",
    label: "Office",
    route: "/forms/libreoffice/convert",
    form: [["files", "report.docx", "file"]],
    out: "report.pdf",
  },
];

// [profile, family, symbol, standard, family class].
export const PROFILES = [
  ["PDF/A-1a", "PDF/A", "1a", "ISO 19005-1", ""],
  ["PDF/A-1b", "PDF/A", "1b", "ISO 19005-1", ""],
  ["PDF/A-2a", "PDF/A", "2a", "ISO 19005-2", ""],
  ["PDF/A-2b", "PDF/A", "2b", "ISO 19005-2", ""],
  ["PDF/A-2u", "PDF/A", "2u", "ISO 19005-2", ""],
  ["PDF/A-3a", "PDF/A", "3a", "ISO 19005-3", ""],
  ["PDF/A-3b", "PDF/A", "3b", "ISO 19005-3", ""],
  ["PDF/A-3u", "PDF/A", "3u", "ISO 19005-3", ""],
  ["PDF/A-4", "PDF/A", "4", "ISO 19005-4", ""],
  ["PDF/A-4e", "PDF/A", "4e", "ISO 19005-4", ""],
  ["PDF/A-4f", "PDF/A", "4f", "ISO 19005-4", ""],
  ["PDF/UA-1", "PDF/UA", "1", "ISO 14289-1", "xb-el--ua"],
  ["PDF/UA-2", "PDF/UA", "2", "ISO 14289-2", "xb-el--ua"],
  ["Factur-X", "Factur-X", "FX", "and ZUGFeRD", "xb-el--fx"],
];

// [level, embedded file, AFRelationship], per Factur-X 1.07.2 and
// ZUGFeRD 2.3.2.
export const LEVELS = [
  ["MINIMUM", "factur-x.xml", "Data"],
  ["BASIC WL", "factur-x.xml", "Data"],
  ["BASIC", "factur-x.xml", "Alternative"],
  ["EN 16931", "factur-x.xml", "Alternative"],
  ["EXTENDED", "factur-x.xml", "Alternative"],
  ["XRECHNUNG", "xrechnung.xml", "Alternative"],
];

// The colour class of each stage, by group.
export const STAGE_GROUP = Object.fromEntries(
  [
    [
      "g-pages",
      ["merge", "split", "select", "delete", "insert", "compose", "rotate"],
    ],
    ["g-stamps", ["stamp-text", "stamp-image", "stamp-pdf"]],
    [
      "g-doc",
      [
        "set-metadata",
        "set-bookmarks",
        "set-form",
        "flatten-form",
        "flatten-transparency",
        "convert-colors",
        "optimize",
      ],
    ],
    ["g-access", ["autotag", "redact"]],
    ["g-files", ["attach", "detach", "extract-attachments"]],
    ["g-security", ["encrypt", "decrypt", "sign", "timestamp"]],
    ["g-conform", ["remediate"]],
    ["g-output", ["render", "extract-text"]],
  ].flatMap(([cls, ops]) => ops.map((op) => [op, cls])),
);

// Each recipe passes Stages.validateOrder in pkg/modules/pdf/stages.go.
export const RECIPES = [
  {
    key: "archive",
    title: "Archive",
    desc: "Merge two PDFs, title the result, make it PDF/A-4 and shrink it.",
    files: ["report.pdf", "annex.pdf"],
    stages: [
      { op: "merge" },
      { op: "set-metadata", title: "Q3 report" },
      { op: "remediate", profile: "PDF/A-4" },
      { op: "optimize" },
    ],
    out: "archive.pdf",
  },
  {
    key: "accessible",
    title: "Accessible",
    desc: "Tag the structure of an untagged PDF, then repair it to PDF/UA-1.",
    files: ["report.pdf"],
    stages: [
      { op: "autotag" },
      { op: "remediate", profile: "PDF/UA-1", language: "en-US" },
    ],
    out: "accessible.pdf",
  },
  {
    key: "signed",
    title: "Signed",
    desc: "Stamp it approved, sign it with PAdES, add an RFC 3161 timestamp.",
    files: ["contract.pdf", "cert.pem", "key.pem"],
    stages: [
      { op: "stamp-text", text: "APPROVED", fontSize: 48, opacity: 0.4 },
      { op: "sign", certificate: "cert.pem", key: "key.pem", pades: true },
      { op: "timestamp", timestampUrl: "https://tsa.example.com" },
    ],
    out: "signed.pdf",
  },
  {
    key: "confidential",
    title: "Confidential",
    desc: "Remove what sits under a region, stamp every page, lock it with a password.",
    files: ["report.pdf"],
    stages: [
      {
        op: "redact",
        regions: [{ page: 1, x: 72, y: 700, width: 200, height: 20 }],
      },
      { op: "stamp-text", text: "CONFIDENTIAL", opacity: 0.3, rotation: 45 },
      { op: "encrypt", userPassword: "secret" },
    ],
    out: "confidential.pdf",
  },
  {
    key: "thumbnail",
    title: "Thumbnail",
    desc: "Keep the first page and draw it as a 150 dpi PNG.",
    files: ["report.pdf"],
    stages: [
      { op: "select", pages: "1" },
      { op: "render", format: "png", dpi: 150 },
    ],
    out: "thumbnail.zip",
    zip: "A zip: the one-page report.pdf and report_1.png.",
  },
];

// Read routes, with an example answer each.
export const READ_ROUTES = [
  {
    name: "info",
    desc: "Pages, PDF version, and whether it is encrypted, tagged, linearized or has form fields.",
    answer: {
      pages: 12,
      version: "1.7",
      encrypted: false,
      tagged: true,
      linearized: false,
      formFields: false,
    },
  },
  {
    name: "metadata",
    desc: "The document information: Title, Author, Subject and the rest.",
    answer: {
      Title: "Q3 report",
      Author: "Finance",
      Subject: "Quarterly results",
    },
  },
  {
    name: "bookmarks",
    desc: "The outline, as a tree of titles and page numbers.",
    answer: [
      { title: "Summary", pageNumber: 1 },
      {
        title: "Results",
        pageNumber: 4,
        children: [{ title: "Revenue", pageNumber: 5 }],
      },
    ],
  },
  {
    name: "attachments",
    desc: "The embedded files, with their MIME type and AFRelationship.",
    file: "invoice.pdf",
    answer: [
      {
        name: "factur-x.xml",
        mimeType: "text/xml",
        relationship: "Alternative",
      },
    ],
  },
  {
    name: "form",
    desc: "The form fields, with their values, in the shape set-form fills.",
    file: "fields.pdf",
    answer: [
      {
        name: "agree",
        type: "checkbox",
        value: "Off",
        pages: [1],
        states: ["Yes"],
      },
      {
        name: "color",
        type: "combo",
        value: "Red",
        pages: [1],
        options: ["Red", "Green"],
      },
    ],
  },
  {
    name: "validate",
    desc: "A conformance report against one of the 14 profiles.",
    form: [["profile", "PDF/A-4"]],
    answer: { profile: "PDF/A-4", compliant: true, violations: [] },
  },
];

export const ARCHITECTURES = ["amd64", "arm64", "arm/v7", "386", "ppc64le"];

// Image tags and the architectures each one ships for.
export const IMAGES = [
  [":9", 5],
  [":9-chromium", 5],
  [":9-libreoffice", 5],
  [":9-aws-lambda", 2],
  [":9-chromium-aws-lambda", 2],
  [":9-libreoffice-aws-lambda", 2],
  [":9-cloudrun", 1],
  [":9-chromium-cloudrun", 1],
  [":9-libreoffice-cloudrun", 1],
];
