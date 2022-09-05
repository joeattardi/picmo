const nesting = require('postcss-nesting');
const mixins = require('postcss-mixins');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    mixins(),
    nesting(),
    cssnano()
  ]
};
