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
      type: "category",
      label: "Convert with Chromium",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "convert-with-chromium/convert-url-to-pdf",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "convert-with-chromium/convert-html-to-pdf",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "convert-with-chromium/convert-markdown-to-pdf",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "convert-with-chromium/screenshot-url",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "convert-with-chromium/screenshot-html",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "convert-with-chromium/screenshot-markdown",
          className: "sidebar-method-post",
        },
      ],
    },
    {
      type: "category",
      label: "Convert with LibreOffice",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "convert-with-libreoffice/convert-to-pdf",
          className: "sidebar-method-post",
        },
      ],
    },
    {
      type: "category",
      label: "Manipulate PDFs",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "manipulate-pdfs/write-metadata",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/read-metadata",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/read-bookmarks",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/write-bookmarks",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/attachments",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/flatten-pdfs",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/watermark-pdfs",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/stamp-pdfs",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/rotate-pdfs",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/merge-pdfs",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/split-pdfs",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/pdfa-pdfua",
          className: "sidebar-method-post",
        },
        {
          type: "doc",
          id: "manipulate-pdfs/encrypt-pdfs",
          className: "sidebar-method-post",
        },
      ],
    },
    {
      type: "category",
      label: "System",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "system/get-health-check",
          className: "sidebar-method-get",
        },
        {
          type: "doc",
          id: "system/head-health-check",
          className: "sidebar-method-head",
        },
        {
          type: "doc",
          id: "system/prometheus-metrics",
          className: "sidebar-method-get",
        },
        {
          type: "doc",
          id: "system/version",
          className: "sidebar-method-get",
        },
        {
          type: "doc",
          id: "system/debug",
          className: "sidebar-method-get",
        },
      ],
    },
    {
      type: "doc",
      id: "webhook-download",
      label: "Webhook & Download",
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
      label: "Upgrade from 7.x",
      href: "https://github.com/gotenberg/gotenberg/releases/tag/v8.0.0",
    },
  ],
};
