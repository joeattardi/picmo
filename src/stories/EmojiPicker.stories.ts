import EmojiPicker from '../elements/EmojiPicker';

const meta = {
  title: 'Emoji Picker',
  render: options => {
    return new EmojiPicker(options);
  },
  argTypes: {
    theme: {
      name: 'Color theme',
      control: 'select',
      options: ['light', 'dark', 'auto']
    }
  }
};

export default meta;

export const Default = {};
