/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'autogenerated',
          dirName: '01 - getting-started'
        }
      ]
    },
    {
      type: 'category',
      label: 'Using PicMo',
      items: [
        {
          type: 'autogenerated',
          dirName: '02 - usage'
        }
      ]
    }
  ],

  apiSidebar: [
    {
      type: 'autogenerated',
      dirName: 'api'
    }
  ]
};

module.exports = sidebars;
