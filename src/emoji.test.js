const Emitter = require('tiny-emitter');

const { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } = require('./events');
const { Emoji } = require('./emoji');

describe('Emoji', () => {
  let events;

  const testEmoji = { e: '😄', n: 'smile' };
  const options = { showRecents: true };

  beforeEach(() => (events = new Emitter()));

  test('should render the emoji', () => {
    const emoji = new Emoji(testEmoji, false, false, events, options);
    const element = emoji.render();

    expect(element.innerHTML).toEqual(testEmoji.e);
  });

  test('should emit the EMOJI event when clicked', done => {
    const emoji = new Emoji(testEmoji, false, false, events, options);
    const element = emoji.render();

    events.on(EMOJI, e => {
      expect(e).toEqual({ emoji: testEmoji, showVariants: false, button: element });
      done();
    });

    element.dispatchEvent(new MouseEvent('click'));
  });

  test('should emit the SHOW_PREVIEW event on mouseover if showPreview is true', done => {
    const emoji = new Emoji(testEmoji, false, true, events, options);
    const element = emoji.render();

    events.on(SHOW_PREVIEW, e => {
      expect(e).toEqual(testEmoji);
      done();
    });

    element.dispatchEvent(new MouseEvent('mouseover'));
  });

  test('should emit the HIDE_PREVIEW event on mouseout if showPreview is true', done => {
    const emoji = new Emoji(testEmoji, false, true, events, options);
    const element = emoji.render();

    events.on(HIDE_PREVIEW, () => {
      done();
    });

    element.dispatchEvent(new MouseEvent('mouseout'));
  });
});
