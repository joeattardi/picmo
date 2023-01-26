const nesting = require('postcss-nesting');
const mixins = require('postcss-mixins');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const prefix = require('postcss-prefixer');

module.exports = {
  plugins: [
    postcssImport(),
    prefix({
      prefix: 'picmo__'
    }),
    mixins(),
    nesting(),
    cssnano()
  ]
};
