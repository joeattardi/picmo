import { EMOJI, HIDE_PICKER } from './events';
import { createElement } from './util';

const CLASS_EMOJI = 'emoji-picker__emoji';

export function renderEmoji(emoji, events) {
  const emojiButton = createElement('button', CLASS_EMOJI);
  emojiButton.innerHTML = emoji.emoji;

  emojiButton.addEventListener('click', () => {
    events.emit(EMOJI, emoji.emoji);
    events.emit(HIDE_PICKER);
  });

  return emojiButton;
}
