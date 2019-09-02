import { EMOJI, HIDE_PICKER, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { createElement } from './util';

const CLASS_EMOJI = 'emoji-picker__emoji';

export function renderEmoji(emoji, events) {
  const emojiButton = createElement('button', CLASS_EMOJI);
  emojiButton.innerHTML = emoji.e;

  emojiButton.addEventListener('click', () => {
    events.emit(EMOJI, emoji.e);
    events.emit(HIDE_PICKER);
  });

  emojiButton.addEventListener('mouseover', () => events.emit(SHOW_PREVIEW, emoji));
  emojiButton.addEventListener('mouseout', () => events.emit(HIDE_PREVIEW));

  return emojiButton;
}
