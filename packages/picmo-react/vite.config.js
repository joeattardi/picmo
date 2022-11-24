import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
