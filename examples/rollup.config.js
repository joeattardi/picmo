const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'public/index.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    resolve(),
    commonjs(),
    !production &&
      serve({
        open: true,
        contentBase: 'public'
      }),
    !production && livereload()
  ]
};
