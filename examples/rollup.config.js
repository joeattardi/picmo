const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'public/index.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}
