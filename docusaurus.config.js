const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Gotenberg",
  tagline: "A Docker-powered stateless API for PDF files",
  url: "https://gotenberg.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "gotenberg",
  projectName: "gotenberg.dev",
  themeConfig: {
    announcementBar: {
      id: "supportus",
      content: `⭐️  &nbsp; If you like Gotenberg, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gotenberg/gotenberg">GitHub</a>! ⭐️`,
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
          type: "dropdown",
          position: "left",
          label: "Get Started",
          items: [
            {
              type: "doc",
              docId: "intro",
              label: "Docker",
            },
            {
              type: "doc",
              docId: "intro",
              label: "Docker Compose",
            },
            {
              type: "doc",
              docId: "intro",
              label: "Kubernetes",
            },
            {
              type: "doc",
              docId: "intro",
              label: "Cloud Run",
            },
          ],
        },
        {
          type: "dropdown",
          position: "left",
          label: "Modules",
          items: [
            {
              type: "doc",
              docId: "intro",
              label: "API",
            },
            {
              type: "doc",
              docId: "intro",
              label: "Chromium",
            },
            {
              type: "doc",
              docId: "intro",
              label: "LibreOffice",
            },
            {
              type: "doc",
              docId: "intro",
              label: "PDF Engines",
            },
            {
              type: "doc",
              docId: "intro",
              label: "Logger",
            },
          ],
        },
        {
          type: "doc",
          docId: "intro",
          label: "Documentation",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          href: "https://github.com/gotenberg/gotenberg",
          label: "OpenAPI",
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
          title: "Get Started",
          items: [
            {
              label: "Docker",
              to: "/docs/intro",
            },
            {
              label: "Docker Compose",
              to: "/docs/intro",
            },
            {
              label: "Kubernetes",
              to: "/docs/intro",
            },
            {
              label: "Cloud Run",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Modules",
          items: [
            {
              label: "API",
              to: "/docs/intro",
            },
            {
              label: "Chromium",
              to: "/docs/intro",
            },
            {
              label: "LibreOffice",
              to: "/docs/intro",
            },
            {
              label: "PDF Engines",
              to: "/docs/intro",
            },
            {
              label: "Logger",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/gotenberg/gotenberg",
            },
            {
              label: "OpenAPI",
              href: "https://github.com/gotenberg/gotenberg",
            },
            {
              label: "TheCodingMachine",
              href: "https://www.thecodingmachine.com/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gotenberg, Inc.<br /> Built with <a href="docusaurus.io" target="_blank">Docusaurus</a>.`,
    },
    prism: {
      theme: lightCodeTheme,
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
              banner: "none"
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
      },
    ],
  ],
};
