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
    // console.log(config.resolve)

    // config.node = {
    //   fs: 'empty'
    // };

    // const cssRule = config.module.rules.find(rule => rule.test.toString() === '/\\.css$/');
    // cssRule.use[1].options.modules = true;
    // console.log(cssRule.use[2].options);
    // config.module.rules = config.module.rules.filter(x => x.test.test && !x.test.test('file.css'));

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
