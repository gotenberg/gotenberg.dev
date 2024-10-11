/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  "version-8.x": [
    {
      type: "category",
      label: "Getting Started",
      collapsible: false,
      items: [
        "getting-started/introduction",
        "getting-started/installation",
        "getting-started/clients",
      ],
    },
    {
      type: "doc",
      id: "routes",
      label: "Routes",
    },
    {
      type: "doc",
      id: "webhook",
      label: "Webhook",
    },
    {
      type: "doc",
      id: "configuration",
      label: "Configuration",
    },
    {
      type: "doc",
      id: "troubleshooting",
      label: "Troubleshooting",
    },
    {
      type: "link",
      label: "Awesome",
      href: "https://github.com/gotenberg/awesome-gotenberg",
    },
    {
      type: "link",
      label: "Gotenberg PHP",
      href: "https://github.com/gotenberg/gotenberg-php",
    },
    {
      type: "link",
      label: "Upgrade from 7.x",
      href: "https://github.com/gotenberg/gotenberg/releases/tag/v8.0.0",
    },
  ],
};
