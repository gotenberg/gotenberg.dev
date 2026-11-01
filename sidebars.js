// The 9.x docs, organised by what you want to do. The 8.x sidebar lives in
// versioned_sidebars/version-8.x-sidebars.json.
module.exports = {
  docs: [
    "index",
    "about",
    "getting-started/installation",
    {
      type: "category",
      label: "Get started",
      collapsed: true,
      items: [
        "getting-started/first-pdf",
        "getting-started/requests",
        "getting-started/upgrade",
      ],
    },
    {
      type: "category",
      label: "Convert",
      collapsed: true,
      items: [
        "convert/html",
        "convert/url",
        "convert/markdown",
        "convert/office",
        "convert/wait",
        "convert/headers-footers",
        "convert/page-size",
        "convert/screenshots",
      ],
    },
    {
      type: "category",
      label: "Process PDFs",
      collapsed: true,
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
      label: "Reference",
      collapsed: true,
      items: [
        "reference/routes",
        "reference/chromium",
        "reference/libreoffice",
        "reference/pdf",
        "reference/stages",
        "reference/system",
        "reference/headers",
        "reference/configuration",
        "reference/errors",
      ],
    },
  ],
};
