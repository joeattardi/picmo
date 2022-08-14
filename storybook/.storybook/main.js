const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.ts'],
  // stories: [
  //   '../packages/picmo/src/stories/*.stories.ts',
  //   '../packages/popup-picker/src/stories/*.stories.ts'
  // ],
  // stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/html',

  core: {
    builder: 'webpack5'
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

    config.resolve.alias.picmo = path.resolve(__dirname, '../../packages/picmo/src');
    config.resolve.alias['@picmo/popup-picker'] = path.resolve(__dirname, '../../packages/popup-picker/src');
    config.resolve.alias['@picmo/renderer-twemoji'] = path.resolve(__dirname, '../../packages/renderer-twemoji/src');

    config.module.rules.push({
      test: /\.svg$/i,
      exclude: /stories/,
      type: 'asset/source'
    })

    config.module.rules = config.module.rules.filter(rule => rule.test.toString() !== '/\\.css$/');

    config.module.rules.push({
      test: /\.css$/i,
      use: [
        "style-loader",
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: false,
              plugins: [
                'postcss-import',
                'postcss-nesting',
                'postcss-mixins'
              ],
            },
          },
        }
      ]
    });

    config.devtool = 'source-map';

    return config;
  }
};
