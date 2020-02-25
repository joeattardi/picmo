import { TinyEmitter as Emitter } from 'tiny-emitter';

import { HIDE_VARIANT_POPUP } from './events';
import { VariantPopup } from './variantPopup';

describe('VariantPopup', () => {
  const emoji = {
    name: 'thumbs up',
    category: 0,
    emoji: '👍',
    variations: ['👍🏻', '👍🏿'],
    version: '11.0'
  };

  let events;
  let container;

  beforeEach(() => {
    events = new Emitter();
    container = new VariantPopup(events, emoji, {}).render();
  });

  test('should render the emoji variants', () => {
    const emojiButtons = container.querySelectorAll('.emoji-picker__emoji');

    expect(emojiButtons[0].innerHTML).toEqual(emoji.emoji);
    expect(emojiButtons[1].innerHTML).toEqual(emoji.variations[0]);
    expect(emojiButtons[2].innerHTML).toEqual(emoji.variations[1]);
  });

  test('should emit the HIDE_VARIANT_POPUP event when the close button is clicked', done => {
    const closeButton = container.querySelector(
      '.emoji-picker__variant-popup-close-button'
    );

    events.on(HIDE_VARIANT_POPUP, done);
    closeButton.dispatchEvent(new MouseEvent('click'));
  });
});
