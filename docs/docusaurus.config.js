// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PicMo',
  tagline: 'Plain JavaScript emoji picker. Any app, any framework.',
  url: 'https://picmojs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'joeattardi',
  projectName: 'picmo',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-L13JJCL4ND',
          anonymizeIP: true
        },
        gtag: {
          trackingID: 'G-L13JJCL4ND',
          anonymizeIP: true
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'PicMo Logo',
          src: 'img/logo-with-name.png',
          srcDark: 'img/logo-white-with-name.png'
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/overview',
            position: 'right',
            label: 'Docs'
          },
          {
            type: 'doc',
            docId: 'api/overview',
            position: 'right',
            label: 'API'
          },
          {to: '/blog', label: 'Blog', position: 'right'},
          {
            target: '_blank',
            position: 'right',
            href: '/storybook/',
            label: 'Demos'
          },
          { href: 'https://github.com/sponsors/joeattardi', label: 'Sponsor', position: 'right' },
          {
            href: 'https://github.com/joeattardi/picmo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/overview',
              },
              {
                label: 'API',
                to: '/docs/api/overview',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/PicMoJS',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/joeattardi/picmo',
              },
              {
                label: 'npm',
                href: 'https://npmjs.com/package/picmo'
              },
              {
                label: 'Sponsor',
                href: 'https://github.com/sponsors/joeattardi'
              }
            ],
          },
        ],
        copyright: `Copyright © 2019 - ${new Date().getFullYear()} Joe Attardi.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // announcementBar: {
      //   id: 'work-in-progress',
      //   content: 'PicMo is currently available as a beta. Documentation is still in progress. Final release coming soon. See <a href="/blog">the blog</a> for updates.',
      //   backgroundColor: '#fdba74',
      //   isCloseable: false
      // }
    }),
};

module.exports = config;
