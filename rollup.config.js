var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'EmojiButton'
  },
  plugins: [
    babel({
      compact: true
    }),
    resolve(),
    commonjs()
  ]
};
