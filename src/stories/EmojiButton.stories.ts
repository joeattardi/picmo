import { Story, Meta } from '@storybook/html';

import { createPicker } from './EmojiButton';
import TwemojiRenderer from '../renderers/twemoji';
import NativeRenderer from '../renderers/native';

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

const Template = args => {
  return createPicker({
    position: 'right-start',
    ...args,
    theme: themeOptions[args.theme || 'lightTheme']
  });
};

export const Native = Template.bind({});
Native.args = {
  theme: 'lightTheme',
  renderer: new NativeRenderer()
};

export const Twemoji = Template.bind({});
Twemoji.args = {
  theme: 'lightTheme',
  renderer: new TwemojiRenderer()
};
