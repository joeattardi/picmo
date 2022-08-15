import { resolve } from 'path';

import nesting from 'postcss-nesting';
import mixins from 'postcss-mixins';

export default {
  css: {
    postcss: {
      plugins: [
        mixins(),
        nesting(),
      ]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PicMo',
      fileName: 'index'
    }
  }
}
