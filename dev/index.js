import { EmojiButton } from '../src/index';

function createPickerInstance(button, options, onEmoji) {
  const picker = new EmojiButton(options);
  // const picker = new EmojiButton(options);
  picker.on('emoji', data => {
    onEmoji(data);
  });
  button.addEventListener('click', () => picker.togglePicker(button));

  return picker;
}

const native = document.querySelector('#native .emoji-button');
createPickerInstance(
  native,
  {
    placement: 'bottom-start',
    custom: [
      {
        name: 'kitty',
        emoji: 'https://placekitten.com/200/200'
      }
    ]
  },
  ({ url, emoji }) => {
    if (url) {
      native.innerHTML = `<img src="${url}" />`;
    } else {
      native.innerHTML = emoji;
    }
  }
);
