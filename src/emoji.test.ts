import { TinyEmitter as Emitter } from 'tiny-emitter';

import { EMOJI, HIDE_PREVIEW, SHOW_PREVIEW } from './events';
import { Emoji } from './emoji';
import { EmojiButtonOptions } from './types';

describe('Emoji', () => {
  let events;

  const testEmoji = {
    emoji: '😄',
    name: 'smile',
    category: 0,
    version: '11.0'
  };
  const options: EmojiButtonOptions = { showRecents: true, style: 'native' };

  beforeEach(() => (events = new Emitter()));

  test('should render the emoji', () => {
    const emoji = new Emoji(testEmoji, false, false, events, options);
    const element = emoji.render();

    expect(element.innerHTML).toEqual(testEmoji.emoji);
  });

  test('should emit the EMOJI event when clicked', done => {
    const emoji = new Emoji(testEmoji, false, false, events, options);
    const element = emoji.render();

    events.on(EMOJI, e => {
      expect(e).toEqual({
        emoji: testEmoji,
        showVariants: false,
        button: element
      });
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
