const lightCodeTheme = require("prism-react-renderer/themes/github");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Gotenberg",
  tagline: "A Docker-powered stateless API for PDF files",
  trailingSlash: false,
  url: "https://gotenberg.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "gotenberg",
  projectName: "gotenberg.dev",
  themeConfig: {
    algolia: {
      appId: "JP2Q0HN2DE",
      apiKey: "67f1a7e15197ecf88d4c85f39a2e1789",
      indexName: "gotenberg",
      contextualSearch: true,
    },
    announcementBar: {
      id: "support_us",
      content: `⭐️  &nbsp; If you like Gotenberg, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gotenberg/gotenberg">GitHub</a>! &nbsp; ⭐️`,
    },
    navbar: {
      title: "Gotenberg",
      logo: {
        alt: "Gotenberg Logo",
        src: "img/logo.png",
      },
      hideOnScroll: true,
      items: [
        {
          type: "doc",
          label: "Documentation",
          docId: "about",
        },
        {
          type: "search",
          position: "right",
        },
        {
          label: "Version 6.x",
          to: "/docs/6.x/introduction",
          position: "right",
        },
        // {
        //   href: "https://github.com/gotenberg/gotenberg",
        //   label: "OpenAPI",
        //   position: "right",
        // },
        {
          href: "https://github.com/gotenberg/gotenberg/discussions",
          label: "Help",
          position: "right",
        },
        {
          href: "https://github.com/gotenberg/gotenberg",
          label: "GitHub",
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
              label: "Get Started",
              to: "/docs/get-started/live-demo",
            },
            {
              label: "Modules",
              to: "/docs/modules/api",
            },
            {
              label: "Customize",
              to: "/docs/customize/ownership",
            },
            {
              label: "Version 6.x",
              to: "/docs/6.x/introduction",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Follow @gulnap on twitter",
              href: "https://twitter.com/gulnap",
            },
            // {
            //   label: "OpenAPI",
            //   href: "https://github.com/gotenberg/gotenberg",
            // },
            {
              label: "Awesome Gotenberg",
              href: "https://github.com/gotenberg/awesome-gotenberg",
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Julien Neuhart.<br /> Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>.`,
    },
    prism: {
      theme: lightCodeTheme,
      additionalLanguages: ["docker", "php", "csharp", "powershell"],
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
              label: "7.x",
              path: "",
            },
            "6.x": {
              label: "6.x",
              path: "6.x",
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
  plugins: ["@docusaurus/plugin-ideal-image"],
};
