import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: {
        index: './src/index.ts',
        'popup/index': './src/popup/index.ts'
      },
    }
  },
  plugins: [svelte({
    emitCss: false
  })]
})
