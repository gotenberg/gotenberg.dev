const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;

// Code theme driven by the shared --code-* CSS variables (custom.css), so the
// docs code blocks and the homepage terminal render with one identical palette.
// Inline style values may reference CSS variables.
const codeTheme = {
  plain: { color: "var(--code-plain)", backgroundColor: "var(--code-bg)" },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "var(--code-comment)", fontStyle: "italic" },
    },
    { types: ["namespace"], style: { opacity: 0.7 } },
    {
      types: ["punctuation", "operator", "entity"],
      style: { color: "var(--code-punct)" },
    },
    {
      types: ["string", "attr-value", "char", "inserted"],
      style: { color: "var(--code-string)" },
    },
    {
      types: ["number", "boolean", "constant", "symbol", "regex", "url"],
      style: { color: "var(--code-url)" },
    },
    {
      types: [
        "attr-name",
        "variable",
        "property",
        "parameter",
        "selector",
        "deleted",
      ],
      style: { color: "var(--code-flag)" },
    },
    {
      types: [
        "keyword",
        "atrule",
        "function",
        "function-name",
        "class-name",
        "builtin",
        "tag",
      ],
      style: { color: "var(--code-command)" },
    },
  ],
};

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Gotenberg",
  tagline: "A Docker-based API for PDF conversion",
  trailingSlash: false,
  url: "https://gotenberg.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "throw",
    },
  },
  favicon: "img/favicon.ico",
  organizationName: "gotenberg",
  projectName: "gotenberg.dev",
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/apple-touch-icon.png",
      },
    },
    {
      tagName: "meta",
      attributes: { name: "theme-color", content: "#4338ca" },
    },
  ],
  themeConfig: {
    image: "img/og-image.png",
    metadata: [{ name: "twitter:card", content: "summary_large_image" }],
    algolia: {
      appId: "JP2Q0HN2DE",
      apiKey: "67f1a7e15197ecf88d4c85f39a2e1789",
      indexName: "gotenberg",
      contextualSearch: true,
    },
    announcementBar: {
      id: "gotenberg_9",
      content: `Gotenberg 9 is out: one PDF engine, 26 stages, real conformance. <a href="/docs/getting-started/upgrade">Upgrade from 8.x</a>`,
    },
    // announcementBar: {
    //   id: "support_us",
    //   content: `If you like Gotenberg, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gotenberg/gotenberg">GitHub</a>!️`,
    // },
    navbar: {
      title: "Gotenberg",
      hideOnScroll: true,
      logo: {
        alt: "",
        src: "img/logo.png",
      },
      items: [
        {
          type: "doc",
          label: "Documentation",
          docId: "index",
        },
        {
          type: "doc",
          label: "Help",
          docId: "help",
        },
        {
          href: "https://github.com/gotenberg/gotenberg",
          label: "GitHub",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          className: "navbar-version",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Gotenberg",
        src: "img/logo.png",
        href: "/",
      },
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/first-pdf",
            },
            {
              label: "Cookbook",
              to: "/docs/cookbook/e-invoice",
            },
            {
              label: "Explore All Routes",
              to: "/docs/reference/routes",
            },
            {
              label: "Configuration",
              to: "/docs/configuration",
            },
            {
              label: "Troubleshooting",
              to: "/docs/troubleshooting",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Awesome Gotenberg",
              href: "https://github.com/gotenberg/awesome-gotenberg",
            },
            {
              label: "PHP SDK",
              href: "https://github.com/gotenberg/gotenberg-php",
            },
            {
              label: "Upgrade from 8.x",
              to: "/docs/getting-started/upgrade",
            },
            {
              label: "Help",
              to: "/docs/help",
            },
            {
              label: "GitHub",
              href: "https://github.com/gotenberg/gotenberg",
            },
          ],
        },
        {
          title: "Sponsors",
          items: [
            {
              label: "TheCodingMachine",
              href: "https://www.thecodingmachine.com",
            },
            {
              label: "pdfme",
              href: "https://pdfme.com?utm_source=gotenberg_github&utm_medium=website",
            },
            {
              label: "PDFBolt",
              href: "https://pdfbolt.com",
            },
            {
              label: "FileToPDF",
              href: "https://filetopdf.dev",
            },
            {
              label: "Become a sponsor",
              href: "https://github.com/sponsors/gulien",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Julien Neuhart.<br /> Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>.`,
    },
    prism: {
      theme: codeTheme,
      darkTheme: codeTheme,
      additionalLanguages: ["bash", "docker", "json"],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // A README.md is a writing guide, not a page. The rest are
          // Docusaurus' defaults.
          exclude: [
            "**/README.md",
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          editUrl: "https://github.com/gotenberg/gotenberg.dev/edit/main/",
          lastVersion: "current",
          versions: {
            current: {
              label: "9.x",
              path: "",
            },
            "8.x": {
              label: "8.x",
              path: "8.x",
              banner: "unmaintained",
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-Q1MDM8KFVG",
        },
      },
    ],
  ],
  plugins: [
    "@docusaurus/plugin-ideal-image",
    [
      "@docusaurus/plugin-client-redirects",
      {
        // The 8.x pages whose topic moved in 9.x. The 8.x docs themselves live
        // under /docs/8.x/; the slugs 9.x kept need no redirect.
        redirects: [
          ["/docs/getting-started/introduction", "/docs"],
          ["/docs/getting-started/routes", "/docs/reference/routes"],
          [
            "/docs/convert-with-chromium/convert-html-to-pdf",
            "/docs/chromium/convert-html",
          ],
          [
            "/docs/convert-with-chromium/convert-markdown-to-pdf",
            "/docs/chromium/convert-markdown",
          ],
          [
            "/docs/convert-with-chromium/convert-url-to-pdf",
            "/docs/chromium/convert-url",
          ],
          [
            "/docs/convert-with-chromium/screenshot-html",
            "/docs/chromium/screenshot-html",
          ],
          [
            "/docs/convert-with-chromium/screenshot-markdown",
            "/docs/chromium/screenshot-markdown",
          ],
          [
            "/docs/convert-with-chromium/screenshot-url",
            "/docs/chromium/screenshot-url",
          ],
          [
            "/docs/convert-with-libreoffice/convert-to-pdf",
            "/docs/libreoffice/convert",
          ],
          ["/docs/manipulate-pdfs/attachments", "/docs/pdf/attach"],
          ["/docs/manipulate-pdfs/encrypt-pdfs", "/docs/pdf/encrypt"],
          ["/docs/manipulate-pdfs/factur-x", "/docs/conformance/factur-x"],
          ["/docs/manipulate-pdfs/flatten-pdfs", "/docs/pdf/flatten-form"],
          ["/docs/manipulate-pdfs/merge-pdfs", "/docs/pdf/merge"],
          ["/docs/manipulate-pdfs/optimize-pdfs", "/docs/pdf/optimize"],
          ["/docs/manipulate-pdfs/pdfa-pdfua", "/docs/conformance/pdfa"],
          ["/docs/manipulate-pdfs/read-bookmarks", "/docs/pdf/bookmarks"],
          ["/docs/manipulate-pdfs/read-metadata", "/docs/pdf/metadata"],
          ["/docs/manipulate-pdfs/rotate-pdfs", "/docs/pdf/rotate"],
          ["/docs/manipulate-pdfs/split-pdfs", "/docs/pdf/split"],
          ["/docs/manipulate-pdfs/stamp-pdfs", "/docs/pdf/stamp-text"],
          ["/docs/manipulate-pdfs/watermark-pdfs", "/docs/pdf/stamp-text"],
          ["/docs/manipulate-pdfs/write-bookmarks", "/docs/pdf/set-bookmarks"],
          ["/docs/manipulate-pdfs/write-metadata", "/docs/pdf/set-metadata"],
          ["/docs/outbound-url-filtering", "/docs/operate/outbound"],
          ["/docs/system/debug", "/docs/reference/system"],
          ["/docs/system/get-health-check", "/docs/reference/system"],
          ["/docs/system/head-health-check", "/docs/reference/system"],
          ["/docs/system/version", "/docs/reference/system"],
          ["/docs/system/prometheus-metrics", "/docs/telemetry"],
        ].map(([from, to]) => ({ from, to })),
      },
    ],
  ],
  clientModules: [require.resolve("./src/clientModules/scrollableTables.js")],
};
