// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tapdata 文档中心',
  tagline: '一站式实时数据平台',
  url: 'https://docs.tapdata.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tapdata', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  /*i18n: {
      defaultLocale: 'zh-cn',
      locales: ['zh-cn', 'en'],
    }, */

  i18n: {
      defaultLocale: 'zh-cn',
      locales: ['zh-cn'],
    },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Configuring versioning behavior and label
          lastVersion: 'current',
          versions: {
                  current: {
                    label: '3.x',
                  },
                  '2.0': {
                         label: '2.x',
                         path: '2.0',
                         },
                  },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tapdata/docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Google Analytics
        gtag: {
          trackingID: 'G-43PEGV94TX', // Measurement ID, which can be find in Data streams page on Google Analytics platform.
        },
        blog: false, // Disable the blog plugin
      }),
    ],
  ],

/* Local search engine configuration
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/",
        indexBlog: false,
      },
    ],
  ],*/

// An Image Zoom plugin for Docusaurus 2, and integrate hotjar for feedback
  plugins: [
    'plugin-image-zoom',
    'docusaurus-plugin-hotjar'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
    // By enable hideable option, you can make the entire sidebar hideable, allowing users to better focus on the content.
      docs: {
        sidebar: {
        hideable: true,
        },
      },
    // Website announcement
    announcementBar: {
            id: 'announcementBar-1',
            content: `🎉️ 更稳定，更易用，新增数据转换功能，抢先体验全新的 <a target="_blank" rel="noopener noreferrer" href="https://cloud.tapdata.net/console/v3/">Tapdata Cloud 3.0</a> `,
            backgroundColor: '#1d4378',
            textColor: '#ffffff',
            },
    // SEO Configuration, this would become <meta name="keywords" content="cooking, blog"> in the generated HTML
      metadata: [{name: 'keywords', content: '一站式实时数据平台, Tapdata'}],
      navbar: {
        title: '首页',
        logo: {
          alt: 'Tapdata',
          src: 'img/logo.png',
          href: 'https://tapdata.net/',
        },
        items: [
          {
            type: 'doc',
            docId: 'enterprise/what-is-tapdata-enterprise',
            position: 'left',
            label: 'Tapdata On-Prem',
            },
          {
            type: 'doc',
            docId: 'cloud/what-is-tapdata-cloud',
            position: 'left',
            label: 'Tapdata Cloud',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
           },
          {
            href: 'https://github.com/tapdata/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // Hotjar for Feedback
        hotjar: {
        applicationId: '3533951',
    },
    // algolia search plugin
     algolia: {
      appId: '9MM3A6XTHN',
      apiKey: 'aaa34ed85c8fa940f787d470019fb29b',
      indexName: 'tapdata',
      },
      footer: {
        style: 'dark',
        /* links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ], */
        copyright: `Copyright © ${new Date().getFullYear()} Tapdata, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        theme: require('prism-react-renderer/themes/dracula'),
      },
    }),

  scripts: [
    '/js/iframe.js',
    '/js/replaceIcons.js'
  ]
};

module.exports = config;
