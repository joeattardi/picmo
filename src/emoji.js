import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { save } from './recent';
import { createElement } from './util';

const CLASS_EMOJI = 'emoji-picker__emoji';

export function renderEmoji(emoji, showVariants, showPreview, events) {
  const emojiButton = createElement('button', CLASS_EMOJI);
  emojiButton.innerHTML = emoji.e;

  emojiButton.addEventListener('click', () => {
    if (!emoji.v || !showVariants) {
      save(emoji);
    }
    events.emit(EMOJI, { emoji, showVariants });
  });

  emojiButton.addEventListener('mouseover', () => {
    if (showPreview) {
      events.emit(SHOW_PREVIEW, emoji)
    }
  });

  emojiButton.addEventListener('mouseout', () => {
    if (showPreview) {
      events.emit(HIDE_PREVIEW)
    }
  });

  return emojiButton;
}
