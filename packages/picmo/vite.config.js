import { resolve } from 'path';
import prefixer from 'postcss-prefixer';
import nesting from 'postcss-nesting';

// const styleHashes = [
//   'sha256-uGpgsd6O3MzwnnjlF0d3YoqiAte0KZJ7n816yYhWB3w=',
//   'sha256-27mPER5JDX04hnNICJNjl0DTXAWpHKfWpmA4G1a7YQQ=',
//   'sha256-2ibsKSBvN8t0kPjgS8cB5pFP/9kWupiSa4xyBz9UjMo=',
//   'sha256-E98v4aGpIkYtlL5DQbOGwYhcY2RH4Z0HDa0lAKy0nWQ=',
//   'sha256-LBtn6KbpR0OR/k4X44mMdyTD7UvAxi+etqPKthQLC7U='
// ];

// const styleSrc = styleHashes.reduce((result, current) => `${result} '${current}'`, '');

export default {
  css: {
    postcss: {
      plugins: [
        nesting()
        // prefixer({ prefix: 'PicMo_' })
      ]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PicMo'
    }
  },
  // server: {
  //   headers: {
  //     'Content-Security-Policy': `default-src 'self'; style-src 'self'`
  //   }
  // }
}
