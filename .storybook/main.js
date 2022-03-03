const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/html',

  core: {
    builder: 'webpack5'
  },

  babel: async options => {
    return {
      ...options,
      plugins: options.plugins.filter(x => !(typeof x === 'string' && x.includes('plugin-transform-classes')))
    };
  },

  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback.fs = false;
    config.resolve.alias.templates = path.resolve(__dirname, '../src/templates');

    // config.resolve.alias = {
    //   templates: path.resolve(__dirname, '../src/templates')
    // }

    config.module.rules.push({
      test: /\.ejs$/,
      use: 'raw-loader',
      include: path.resolve(__dirname, '../src/templates')
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: 'EmojiButton__[local]_[hash:base64:5]'
            }
          }
        },
        'sass-loader'
      ]
    });

    config.devtool = 'source-map';

    return config;
  }
};
