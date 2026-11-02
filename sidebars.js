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
      label: "Process PDFs",
      collapsed: true,
      link: { type: "doc", id: "process/index" },
      items: [
        "process/merge-split",
        "process/pages",
        "process/stamps",
        "process/redact",
        "process/forms",
        "process/attachments",
        "process/metadata",
        "process/compress",
        "process/render",
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
      label: "Protect PDFs",
      collapsed: true,
      items: ["security/encrypt", "security/sign"],
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
        "reference/pdf",
        "reference/stages",
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
