import { renderPicker } from './EmojiButton';
import { getArgs, customEmojis } from './common';
import { CategoryKey } from '../types';

export default getArgs({
  title: 'Emoji Picker'
});

const Template = args => {
  return renderPicker({
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
  renderer: 'twemoji-svg'
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

export const CustomDimensions = Template.bind({});
CustomDimensions.args = {
  emojisPerRow: 8,
  visibleRows: 6,
  emojiSize: '1.8em'
};
CustomDimensions.argTypes = {
  emojisPerRow: {
    name: 'Emoji columns',
    control: {
      type: 'number'
    }
  },
  visibleRows: {
    name: 'Emoji rows',
    control: {
      type: 'number'
    }
  },
  emojiSize: {
    name: 'Emoji size',
    control: {
      type: 'text'
    }
  }
}

export const CustomCategoryList = Template.bind({});
CustomCategoryList.storyName = 'Custom category list';
const customCategories: CategoryKey[] = ['people-body', 'animals-nature', 'smileys-emotion'];
CustomCategoryList.args = {
  categories: customCategories
}
