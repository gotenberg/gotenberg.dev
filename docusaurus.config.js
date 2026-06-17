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
      attributes: { name: "theme-color", content: "#0e7ba3" },
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
      id: "support_us",
      content: `If you like Gotenberg, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gotenberg/gotenberg">GitHub</a>!️`,
    },
    // announcementBar: {
    //   id: "gotenberg_8",
    //   content: `🎉️ <strong><a target="_blank" rel="noopener noreferrer" href="https://github.com/gotenberg/gotenberg/releases/tag/v8.0.0">Gotenberg 8</a> is now out!</strong> 🥳️`,
    // },
    navbar: {
      title: "Gotenberg",
      hideOnScroll: true,
      logo: {
        alt: "Gotenberg Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "doc",
          label: "Documentation",
          docId: "getting-started/introduction",
        },
        {
          href: "https://github.com/gotenberg/gotenberg/discussions",
          label: "Help",
        },
        {
          href: "https://github.com/gotenberg/gotenberg",
          label: "GitHub",
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
        alt: "Gotenberg Footer Logo",
        src: "img/logo.png",
        href: "https://github.com/gotenberg",
      },
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/introduction",
            },
            {
              label: "Explore All Routes",
              to: "/docs/getting-started/routes",
            },
            {
              label: "Configuration",
              to: "/docs/configuration",
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
              label: "Upgrade from 7.x",
              href: "https://github.com/gotenberg/gotenberg/releases/tag/v8.0.0",
            },
            {
              label: "Help",
              href: "https://github.com/gotenberg/gotenberg/discussions",
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
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/gotenberg/gotenberg.dev/edit/main/",
          lastVersion: "current",
          versions: {
            current: {
              label: "8.x",
              path: "",
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
  plugins: ["@docusaurus/plugin-ideal-image"],
};
