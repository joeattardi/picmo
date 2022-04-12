import { create } from '@storybook/theming';

import logo from '../docs/static/img/logo-with-name.png';

console.log(logo);

export default create({
  base: 'light',
  brandTitle: 'PicMo',
  brandUrl: 'https://picmojs.com',
  brandImage: logo
});
