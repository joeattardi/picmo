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

    // const cssRule = config.module.rules.find(rule => rule.test.toString() === '/\\.css$/');
    // cssRule.use[1].options.modules = true;
    // console.log(cssRule.use[2].options);
    config.module.rules = config.module.rules.filter(x => x.test.test && !x.test.test('file.css'));

    config.module.rules.push({
      test: /\.ejs$/,
      use: 'raw-loader',
      include: path.resolve(__dirname, '../src/templates')
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: /\.module\.css$/,
              localIdentName: 'EmojiButton__[local]_[hash:base64:5]'
            }
          }
        }
      ]
      // include: path.resolve(__dirname, '../src'),
    });

    config.devtool = 'source-map';

    return config;
  }
};
