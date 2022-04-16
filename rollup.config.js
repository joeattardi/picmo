import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const bundles = [
  {
    input: 'src/umd/picmo.ts',
    output: {
      sourcemap: true,
      file: 'dist/umd/picmo.js',
      format: 'umd',
      name: 'picmo'
    }
  },
  {
    input: 'src/umd/picmo.twemoji.ts',
    output: {
      sourcemap: true,
      file: 'dist/umd/picmo.twemoji.js',
      format: 'umd',
      name: 'TwemojiRenderer'
    }
  },
  {
    input: {
      'index': './src/index.ts',
      'renderers/native': './src/renderers/native.ts',
      'renderers/twemoji': './src/renderers/twemoji.ts',
      'themes': './src/themes.ts',
      'i18n/en': './src/i18n/lang-en.ts'
    },
    output: {
      dir: 'dist',
      format: 'es'
    }
  }
];

export default bundles.map(bundle => ({
  ...bundle,
  plugins: [
    builtins(),
    replace({ 
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    nodeResolve(),
    commonjs({ browser: true }),
    string({ include: '**/*.ejs'}),
    json(),
    typescript(),
    postcss({
      modules: true
    }),
    terser()
  ]
}));
