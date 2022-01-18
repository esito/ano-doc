const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Anonymize your test data and make GDPR a breeze',
  tagline: 'DBmasker generates a Java program that can be automated and run whenever you like',
  url: 'https://doc.esito.no',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Esito AS', // Usually your GitHub org/user name.
  projectName: 'ano-doc', // Usually your repo name.
  trailingSlash: true,  
  onBrokenMarkdownLinks: "warn",
  onBrokenLinks:"warn",
  themeConfig: {
    navbar: {
      logo: {
        alt: 'DBmasker logo',
        src: 'img/DBmasker hel logo blå og svart.svg',
        srcDark: 'img/DBmasker hel logo hvit.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://anonymizer.esito.no/auth',
          label: 'Login / dashboard',
          position: 'right',

        },
        {
          href: 'https://github.com/esito/ano-doc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      
      copyright: `Copyright © ${new Date().getFullYear()} Esito AS, Subsidiary of Inmeta. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/esito/ano-doc/blob/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
