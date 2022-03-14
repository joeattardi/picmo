import { Story, Meta } from '@storybook/html';

import { createPicker } from './EmojiButton';
import TwemojiRenderer from '../renderers/twemoji';
import NativeRenderer from '../renderers/native';

import * as themes from '../themes';

export default {
  title: 'Emoji Picker',
  argTypes: {
    emojiVersion: {
      type: 'number',
      defaultValue: 13
    },
    theme: {
      options: ['lightTheme', 'darkTheme', 'autoTheme'],
      control: {
        type: 'select',
        labels: {
          light: 'Light',
          dark: 'Dark',
          auto: 'Auto'
        }
      }
    }
  }
} as Meta;

const Template = args => {
  return createPicker({
    position: 'right-start',
    ...args,
    theme: themes[args.theme || themes.lightTheme]
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
