const nesting = require('postcss-nesting');
const mixins = require('postcss-mixins');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const prefix = require('postcss-prefixer');
const exclude = require('postcss-exclude-files').default;

module.exports = {
  plugins: [
    exclude({
      filter:  [
        '**/node_modules/**',
        'docs/**',
        'storybook/**'
      ],
      plugins: []
    }),
    postcssImport(),
    mixins(),
    nesting(),
    cssnano()
  ]
};
