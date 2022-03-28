import { createPicker } from './EmojiButton';
import { getArgs, customEmojis } from './common';

export default getArgs({
  title: 'Emoji Picker'
});

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
Custom.argTypes = {
  custom: {
    table: { disable: true }
  }
};
Custom.args = {
  custom: customEmojis
};
