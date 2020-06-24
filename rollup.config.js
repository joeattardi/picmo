const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    name: 'EmojiButton'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
    }),
    postcss({
      extensions: ['.css']
    }),
    typescript(),
    resolve(),
    commonjs(),
    production && terser()
  ]
};
