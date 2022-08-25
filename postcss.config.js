import nesting from 'postcss-nesting';
import mixins from 'postcss-mixins';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';

export default {
  plugins: [
    postcssImport(),
    mixins(),
    nesting(),
    cssnano()
  ]
};
