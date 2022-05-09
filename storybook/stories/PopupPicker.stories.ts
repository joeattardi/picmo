import { createPicker } from './PopupPicker';

import { getArgs, customEmojis } from './common';

export default getArgs({
  title: 'Popup Emoji Picker',
  args: {
    hideOnEmojiSelect: true,
    hideOnClickOutside: true,
    hideOnEscape: true
  },
  argTypes: {
    pickerOpen: { 
      action: 'picker:open',
      table: { disable: true }
    },
    pickerClose: { 
      action: 'picker:close',
      table: { disable: true }
    },
    hideOnEmojiSelect: {
      name: 'Hide on emoji select',
      control: {
        type: 'boolean'
      }
    },
    hideOnClickOutside: {
      name: 'Hide on click outside',
      control: {
        type: 'boolean'
      }
    },
    hideOnEscape: {
      name: 'Hide on Escape',
      control: {
        type: 'boolean'
      }
    }
  }
});

const Template = args => {
  return createPicker({
    position: 'bottom-start',
    ...args
  });
};

export const Native = Template.bind({});
Native.args = {
  renderer: 'native'
};

export const Twemoji = Template.bind({});
Twemoji.args = {
  renderer: 'twemoji-svg'
};

export const Custom = Template.bind({});
Custom.storyName = 'Custom emojis';
Custom.argTypes = {
  custom: {
    table: { disable: true }
  }
}
Custom.args = {
  custom: customEmojis
}
