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
  // multi language settings
    i18n: {
      defaultLocale: 'zh-cn',
      locales: ['zh-cn', 'en'],
    },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tapdata/docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
            content: `🎉️ 更稳定，更易用，新增数据转换功能，抢先体验全新的 <a target="_blank" rel="noopener noreferrer" href="https://cloud.tapdata.net/console/v3/">TapData Cloud 3.0</a> `,
            backgroundColor: '#1d4378',
            textColor: '#ffffff',
            },
    // SEO Configuration, this would become <meta name="keywords" content="cooking, blog"> in the generated HTML
      metadata: [
        {name: 'keywords', content: '一站式实时数据平台, TapData'},
      ],
      navbar: {
        title: '首页',
        logo: {
          alt: 'TapData',
          src: 'img/logo.png',
          href: 'https://tapdata.net/',
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'what-is-tapdata',
            position: 'left',
            label: 'TapData 帮助文档',
            },
          {
            href: 'https://cloud.tapdata.net/console/v3/',
            position: 'right',
            label: '登录 TapData Cloud',
            },
          {
            href: 'https://github.com/tapdata/tapdata',
            label: 'GitHub⭐',
            position: 'right',
          },
        ],
      },
    // algolia search plugin
     algolia: {
      appId: '9MM3A6XTHN',
      apiKey: 'aaa34ed85c8fa940f787d470019fb29b',
      indexName: 'tapdata',
      contextualSearch: false,
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
        copyright: `Copyright © ${new Date().getFullYear()} TapData, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        theme: require('prism-react-renderer/themes/dracula'),
      },
    }),

  scripts: [
    {
      src: 'https://hm.baidu.com/hm.js?2a8961eabe42165bedcb48eb99150206',
      async: true,
    },
    '/js/iframe.js',
    '/js/replaceIcons.js',
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'baidu-site-verification', 
        content: 'codeva-tYI9V6QTSG'
      },
    },
  ],
};

module.exports = config;
