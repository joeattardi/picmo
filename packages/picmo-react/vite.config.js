import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import mixins from 'postcss-mixins';
import nesting from 'postcss-nesting';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        mixins,
        nesting
      ]
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react()]
});
