import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.tsx',
      fileName: 'index',
      name: 'PicMo'
    }
  },
  plugins: [preact()]
});
