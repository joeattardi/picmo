import { TinyEmitter as Emitter } from 'tiny-emitter';

import { EmojiContainer } from './emojiContainer';

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
});
