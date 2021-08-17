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
      id: "support_us",
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
          type: "doc",
          label: "Documentation",
          docId: "intro"
        },
        {
          label: "Version 6.x",
          to: "/docs/6.x/introduction",
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
          title: "Documentation",
          items: [
            {
              label: "Get Started",
              to: "/docs/intro",
            },
            {
              label: "Modules",
              to: "/docs/intro",
            },
            {
              label: "Customize",
              to: "/docs/intro",
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
              label: "OpenAPI",
              href: "https://github.com/gotenberg/gotenberg",
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
              href: "https://www.thecodingmachine.com/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gotenberg, Inc.<br /> Built with <a href="docusaurus.io" target="_blank">Docusaurus</a>.`,
    },
    prism: {
      theme: lightCodeTheme,
      additionalLanguages: ['docker', 'php'],
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
      },
    ],
  ],
};
