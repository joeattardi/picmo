import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const bundles = [
  {
    input: 'src/index.ts',
    output: {
      sourcemap: true,
      file: 'dist/umd/picmo-popup.js',
      format: 'umd',
      name: 'picmoPopup',
      globals: {
        picmo: 'picmo'
      }
    }
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'es'
    }
  }
];

export default bundles.map(bundle => ({
  ...bundle,
  plugins: [
    replace({ 
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    nodeResolve(),
    string({ include: ['**/*.svg']}),
    typescript(),
    postcss({ modules: true }),
    terser()
  ],
  external: ['picmo']
}));
