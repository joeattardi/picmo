import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    name: 'EmojiButton'
  },
  watch: {
    buildDelay: 500
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development'
      )
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
