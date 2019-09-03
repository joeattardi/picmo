const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'EmojiButton'
  },
  plugins: [
    postcss({
      extensions: ['.css']
    }),
    babel({
      compact: true
    }),
    resolve(),
    commonjs()
  ]
};
