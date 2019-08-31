const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';

import { renderEmoji } from './emoji';
import { createElement } from './util';

export function renderEmojiContainer(emojis, emojiCallback, hidePicker) {
  const emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
  emojis.forEach(emoji => emojiContainer.appendChild(renderEmoji(emoji, emojiCallback, hidePicker)));

  return emojiContainer;
}
