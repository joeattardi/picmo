import { renderEmoji } from './emoji';
import { createElement } from './util';

import { HIDE_VARIANT_POPUP } from './events';

import { times } from './icons';

const CLASS_OVERLAY = 'emoji-picker__variant-overlay';
const CLASS_POPUP = 'emoji-picker__variant-popup';
const CLASS_CLOSE_BUTTON = 'emoji-picker__variant-popup-close-button';

export function renderVariantPopup(events, emoji) {
  const overlay = createElement('div', CLASS_OVERLAY);
  overlay.addEventListener('click', event => {
    event.stopPropagation();
    events.emit(HIDE_VARIANT_POPUP);
  });

  const popup = createElement('div', CLASS_POPUP);

  popup.appendChild(renderEmoji(emoji, false, false, events));
  Object.keys(emoji.v).forEach(variant => {
    popup.appendChild(renderEmoji(emoji.v[variant], false, false, events));
  });

  const closeButton = createElement('button', CLASS_CLOSE_BUTTON);
  closeButton.innerHTML = times;
  closeButton.addEventListener('click', event => {
    event.stopPropagation();
    events.emit(HIDE_VARIANT_POPUP)
  });
  popup.appendChild(closeButton);

  overlay.appendChild(popup);

  return overlay;
}
