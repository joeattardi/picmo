import { createElement } from './util';

const CLASS_EMOJI = 'emoji-picker__emoji';

export function renderEmoji(emoji, emojiCallback, hidePicker) {
  const emojiButton = createElement('button', CLASS_EMOJI);
  emojiButton.innerHTML = emoji.emoji;

  emojiButton.addEventListener('click', () => {
    emojiCallback(emoji.emoji);
    hidePicker();
  });

  return emojiButton;
}
