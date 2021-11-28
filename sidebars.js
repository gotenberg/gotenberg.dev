/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  "version-7.x": [
    {
      type: "doc",
      id: "about",
      label: "About",
    },
    {
      type: "category",
      label: "Get Started",
      items: [
        "get-started/live-demo",
        "get-started/docker",
        "get-started/docker-compose",
        "get-started/kubernetes",
        "get-started/cloud-run",
      ],
    },
    {
      type: "category",
      label: "Modules",
      items: [
        "modules/api",
        "modules/chromium",
        "modules/libreoffice",
        "modules/pdf-engines",
        "modules/webhook",
        "modules/prometheus",
        "modules/logging",
        "modules/more",
      ],
    },
    {
      type: "category",
      label: "Customize",
      items: [
        "customize/ownership",
        "customize/fonts",
        "customize/add-modules",
      ],
    },
    {
      type: "doc",
      id: "clients",
      label: "Clients",
    },
  ],
};
