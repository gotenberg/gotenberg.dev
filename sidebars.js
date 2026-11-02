// The 9.x docs, organised around the API: one page per route, with a badge
// for its method, then guides, operations and reference. The 8.x sidebar
// lives in versioned_sidebars/version-8.x-sidebars.json.

// A route page, badged with its HTTP method.
const route = (method) => (id) => ({
  type: "doc",
  id,
  className: `sidebar-method-${method}`,
});
const post = route("post");

// A group of PDF route pages, each docs/pdf/<op>.
const group = (label, ops) => ({
  type: "category",
  label,
  collapsed: true,
  items: ops.map((op) => post(`pdf/${op}`)),
});

module.exports = {
  docs: [
    "index",
    {
      type: "category",
      label: "Get started",
      collapsed: true,
      items: [
        "getting-started/installation",
        "getting-started/first-pdf",
        "about",
        "getting-started/requests",
        "getting-started/what-works-where",
        "getting-started/clients",
        "getting-started/upgrade",
      ],
    },
    {
      type: "category",
      label: "Chromium",
      collapsed: true,
      items: [
        "chromium/convert-url",
        "chromium/convert-html",
        "chromium/convert-markdown",
        "chromium/screenshot-url",
        "chromium/screenshot-html",
        "chromium/screenshot-markdown",
      ].map(post),
    },
    {
      type: "category",
      label: "LibreOffice",
      collapsed: true,
      items: ["libreoffice/convert"].map(post),
    },
    {
      type: "category",
      label: "PDF",
      collapsed: true,
      items: [
        post("pdf/pipe"),
        group("Pages", [
          "merge",
          "split",
          "select",
          "delete",
          "insert",
          "rotate",
        ]),
        group("Stamps", ["stamp-text", "stamp-image", "stamp-pdf"]),
        group("Content", [
          "set-metadata",
          "set-bookmarks",
          "attach",
          "detach",
          "set-form",
          "flatten-form",
          "redact",
        ]),
        group("Conformance", ["remediate", "autotag"]),
        group("Security", ["encrypt", "decrypt", "sign", "timestamp"]),
        group("Output", [
          "optimize",
          "convert-colors",
          "flatten-transparency",
          "render",
        ]),
        group("Read", [
          "info",
          "metadata",
          "bookmarks",
          "attachments",
          "form",
          "validate",
        ]),
      ],
    },
    {
      type: "category",
      label: "Standards",
      collapsed: true,
      items: [
        "conformance/pdfa",
        "conformance/accessibility",
        "conformance/factur-x",
      ],
    },
    {
      type: "category",
      label: "Operate",
      collapsed: true,
      items: [
        "operate/secure",
        "operate/outbound",
        "operate/limits",
        "operate/webhooks",
        "operate/production",
        "operate/telemetry",
      ],
    },
    {
      type: "category",
      label: "Cookbook",
      collapsed: true,
      items: [
        "cookbook/e-invoice",
        "cookbook/archive-documents",
        "cookbook/chart-report",
        "cookbook/draft-watermark",
        "cookbook/thumbnails",
        "cookbook/sign-contract",
        "cookbook/bulk-conversion",
        "cookbook/redacted-copy",
        "cookbook/combine-word-and-web",
        "cookbook/s3-upload",
        "cookbook/user-html",
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsed: true,
      items: [
        "reference/routes",
        "reference/system",
        "reference/headers",
        "reference/configuration",
        "reference/errors",
      ],
    },
    {
      type: "category",
      label: "Help",
      collapsed: true,
      items: ["troubleshooting", "help"],
    },
  ],
};
