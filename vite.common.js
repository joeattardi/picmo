import { resolve } from 'path';

import nesting from 'postcss-nesting';
import mixins from 'postcss-mixins';

export default function createConfig(basedir, moduleName) {
  const rollupOptions = moduleName === 'picmo' ? {} : {
    external: ['picmo'],
    output: {
      globals: {
        picmo: 'picmo'
      }
    }
  };

  return {
    css: {
      postcss: {
        plugins: [
          mixins(),
          nesting(),
        ]
      }
    },
    build: {
      rollupOptions,
      lib: {
        entry: resolve(basedir, 'src/index.ts'),
        name: moduleName,
        formats: ['es', 'umd'],
        fileName: format => {
          if (format === 'es') {
            return 'index.js';
          }
  
          if (format === 'umd') {
            return `umd/index.js`;
          }
        }
      }
    }
  };
}