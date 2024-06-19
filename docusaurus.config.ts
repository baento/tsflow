import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "TSFlow",
  tagline:
    "A lightweight and intuitive framework for defining and running BDD tests in your projects, inspired by SpecFlow and jest-cucumber",
  favicon: "img/favicon.ico",

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "tailwind-plugin",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [require("postcss-import"), require("tailwindcss"), require("autoprefixer")];
          return postcssOptions;
        },
      };
    },
  ],

  // Set the production url of your site here
  url: "https://baento.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/tsflow/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "baento", // Usually your GitHub org/user name.
  projectName: "tsflow", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/baento/tsflow/tree/docs/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      content: "TSFlow is still in early development. Beware of bugs and breaking changes!",
      backgroundColor: "#cc3300",
      textColor: "#fff",
      isCloseable: false,
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "TSFlow",
      logo: {
        alt: "TSFlow Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "tutorialSidebar",
          label: "Docs",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "tutorialSidebar",
          label: "API",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              type: "html",
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              to: "/versions",
              label: "All versions",
            },
          ],
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              type: "html",
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              href: "https://google.com",
              label: "Help Us Translate",
            },
          ],
        },
        {
          type: "custom-github",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/baento/tsflow",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Antoine Balieu. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
