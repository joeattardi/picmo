import { Story, Meta } from '@storybook/html';

import { createNativePicker } from './EmojiButton';

export default {
  title: 'Emoji Picker'
} as Meta;

const NativeTemplate = args => {
  return createNativePicker({
    placement: 'bottom-start',
    ...args
  });
};

export const Simple = NativeTemplate.bind({});
