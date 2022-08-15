import nesting from 'postcss-nesting';
import mixins from 'postcss-mixins';
import postcssImport from 'postcss-import';

export default {
  plugins: [
    postcssImport(),
    mixins(),
    nesting(),
  ]
};
