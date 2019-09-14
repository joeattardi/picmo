const Emitter = require('tiny-emitter');

const { HIDE_VARIANT_POPUP } = require('./events');
const { VariantPopup } = require('./variantPopup');

describe('VariantPopup', () => {
  const emoji = {
    e: '👍',
    v: {
      one: {
        e: '👍🏻'
      },
      two: {
        e: '👍🏿'
      }
    }
  };

  let events;
  let container;

  beforeEach(() => {
    events = new Emitter();
    container = new VariantPopup(events, emoji).render();
  });

  test('should render the emoji variants', () => {
    const emojiButtons = container.querySelectorAll('.emoji-picker__emoji');
    
    expect(emojiButtons[0].innerHTML).toEqual(emoji.e);
    expect(emojiButtons[1].innerHTML).toEqual(emoji.v.one.e);
    expect(emojiButtons[2].innerHTML).toEqual(emoji.v.two.e);
  });

  test('should emit the HIDE_VARIANT_POPUP event when the close button is clicked', done => {
    const closeButton = container.querySelector('.emoji-picker__variant-popup-close-button');

    events.on(HIDE_VARIANT_POPUP, done);
    closeButton.dispatchEvent(new MouseEvent('click'));
  });
});