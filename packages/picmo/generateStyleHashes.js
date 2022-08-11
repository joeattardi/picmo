import fs from 'fs/promises';
import { createHash } from 'crypto';
import postcss from 'postcss';
import modules from 'postcss-modules';
import esbuild from 'esbuild';

const scss = await fs.readFile('./src/icons/icons.module.scss');

const css = await postcss([modules]).process(scss, { from: undefined })
  .then(result => result.css);

const { code } = await esbuild.transform(css, {
  loader: 'css',
  minify: true
});

console.log(code);

const hash = createHash('sha256').update(code.trim()).digest('base64');
console.log(hash);