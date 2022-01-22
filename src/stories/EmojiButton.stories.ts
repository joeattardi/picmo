import { Story, Meta } from '@storybook/html';

import { createNativePicker } from './EmojiButton';

import * as themes from '../theme';

export default {
  title: 'Emoji Picker',
  argTypes: {
    theme: {
      options: [themes.auto, themes.light, themes.dark],
      control: {
        type: 'select',
        labels: {
          [themes.light]: 'Light',
          [themes.dark]: 'Dark',
          [themes.auto]: 'Auto'
        }
      }
    }
  }
} as Meta;

const NativeTemplate = args => {
  return createNativePicker({
    placement: 'bottom-start',
    ...args
  });
};

export const Simple = NativeTemplate.bind({});
Simple.args = {
  theme: themes.light
};
