import { Meta } from '@storybook/html';

import { createPicker } from './EmojiButton';
import TwemojiRenderer from '../renderers/twemoji';
import NativeRenderer from '../renderers/native';

import { lightTheme, darkTheme, autoTheme } from '../themes';

export default {
  title: 'Emoji Picker',
  args: {
    emojiVersion: 13,
    theme: 'lightTheme',
    renderer: 'native'
  },
  argTypes: {
    emojiVersion: {
      name: 'Emoji version',
      type: 'number'
    },
    theme: {
      name: 'Color theme',
      options: ['lightTheme', 'darkTheme', 'autoTheme'],
      mapping: {
        lightTheme,
        darkTheme,
        autoTheme
      },
      control: {
        type: 'select',
        labels: {
          lightTheme: 'Light',
          darkTheme: 'Dark',
          autoTheme: 'Auto'
        }
      }
    },
    renderer: {
      name: 'Emoji renderer',
      options: ['native', 'twemoji'],
      mapping: {
        native: new NativeRenderer(),
        twemoji: new TwemojiRenderer()
      },
      control: {
        type: 'select',
        labels: {
          native: 'Native',
          twemoji: 'Twemoji'
        },
        
      }
    }
  }
} as Meta;

const Template = args => {
  return createPicker({
    position: 'right-start',
    ...args
  });
};

export const Native = Template.bind({});
Native.args = {
  renderer: 'native'
};

export const Twemoji = Template.bind({});
Twemoji.args = {
  renderer: 'twemoji'
};

export const Custom = Template.bind({});
Custom.storyName = 'Custom emojis';
Custom.args = {
  custom: [
    { emoji: 'kitty1', label: 'Cute kitty', url: 'https://placekitten.com/200/200'}
  ]
}
