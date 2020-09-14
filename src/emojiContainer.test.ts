import { TinyEmitter as Emitter } from 'tiny-emitter';

import { EmojiContainer } from './emojiContainer';

const exclusionTestEmojis = [
  { emoji: '⚡️', version: '12.1', name: 'zap', category: 0 },
  { emoji: '💩', version: '1.0', name: 'pile of poo', category: 0 },
  { emoji: '👍', version: '12.1', name: 'thumbs up', category: 0 },
  { emoji: '🐩', version: '1.0', name: 'poddle', category: 2 },
  { emoji: '🍎', version: '1.0', name: 'red apple', category: 3 },
  { emoji: '🍏', version: '1.0', name: 'green apple', category: 3 },
  { emoji: '🍕', version: '1.0', name: 'pizza', category: 3 }
];

describe('EmojiContainer', () => {
  test('should render all the given emojis', () => {
    const emojis = [
      { emoji: '⚡️', version: '12.1', name: 'zap', category: 0 },
      { emoji: '👍', version: '12.1', name: 'thumbs up', category: 0 }
    ];

    const events = new Emitter();

    const container = new EmojiContainer(emojis, false, events, {
      emojiVersion: '12.1'
    }).render();
    expect(container.querySelectorAll('.emoji-picker__emoji').length).toBe(2);
  });

  test('should exclude specified emojis via function', () => {
    const events = new Emitter();

    const container = new EmojiContainer(exclusionTestEmojis, false, events, {
      emojiVersion: '12.1',
      excludeEmojis: e => e == '💩' || e == '🐩' || e == '🍕'
    }).render();
    expect(container.querySelectorAll('.emoji-picker__emoji').length).toBe(4);
  });

  test('should exclude specified emojis via array', () => {
    const events = new Emitter();

    const container = new EmojiContainer(exclusionTestEmojis, false, events, {
      emojiVersion: '12.1',
      excludeEmojis: ['🍏', '🍎']
    }).render();
    expect(container.querySelectorAll('.emoji-picker__emoji').length).toBe(5);
  });

  test('should not exclude any emojis when excludeEmoji is not specified', () => {
    const events = new Emitter();

    const container = new EmojiContainer(exclusionTestEmojis, false, events, {
      emojiVersion: '12.1'
    }).render();
    expect(container.querySelectorAll('.emoji-picker__emoji').length).toBe(
      exclusionTestEmojis.length
    );
  });
});
