import { Story, Meta } from '@storybook/html';

import { createNativePicker } from './EmojiButton';

// import * as themes from '../theme';

import lightTheme from '../styles/theme/light';
import darkTheme from '../styles/theme/dark';
import autoTheme from '../styles/theme/auto';

const themeOptions = {
  lightTheme,
  darkTheme,
  autoTheme
};

export default {
  title: 'Emoji Picker',
  argTypes: {
    theme: {
      options: ['lightTheme', 'darkTheme', 'autoTheme'],
      control: {
        type: 'select',
        labels: {
          lightTheme: 'Light',
          darkTheme: 'Dark',
          autoTheme: 'Auto'
        }
      }
    }
  }
} as Meta;

const NativeTemplate = args => {
  console.log(themeOptions[args.theme]);
  return createNativePicker({
    placement: 'bottom-start',
    ...args,
    theme: themeOptions[args.theme]
  });
};

export const Simple = NativeTemplate.bind({});
Simple.args = {
  theme: 'lightTheme'
};
