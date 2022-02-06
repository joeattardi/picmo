const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/html',

  babel: async options => {
    return {
      ...options,
      plugins: options.plugins.filter(x => !(typeof x === 'string' && x.includes('plugin-transform-classes')))
    };
  },

  webpackFinal: async (config, { configType }) => {
    config.node = {
      fs: 'empty'
    };

    const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
    svgRule.exclude = /node_modules\/@mdi\/svg\/svg/;

    config.module.rules.push({
      test: /\.ejs$/,
      use: 'raw-loader',
      include: path.resolve(__dirname, '../src/templates')
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: 'raw-loader',
      include: /node_modules/
    });

    config.devtool = 'source-map';

    return config;
  }
};
