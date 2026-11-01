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
      collapsible: false,
      items: [
        "getting-started/first-pdf",
        "getting-started/requests",
        "getting-started/upgrade",
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsible: false,
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
