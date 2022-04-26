const path = require('path');

module.exports = {
  stories: [
    '../packages/picmo/src/stories/*.stories.ts',
    '../packages/popup-picker/src/stories/*.stories.ts'
  ],
  // stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
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

  managerWebpack: async (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = '/storybook/';
    }
    return config;
  },

  webpackFinal: async (config, { configType }) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = '/storybook/';
    }

    config.resolve.fallback.fs = false;

    config.module.rules.push({
      test: /\.svg$/i,
      exclude: /stories/,
      type: 'asset/source'
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: 'PicMo__[path][name]__[local]'
              // localIdentName: 'EmojiButton__[local]_[hash:base64:5]'
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
