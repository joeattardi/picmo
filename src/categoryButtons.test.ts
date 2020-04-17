import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';

import { CategoryButtons } from './categoryButtons';
import { i18n } from './i18n';

const emitter = new Emitter();

describe('CategoryButtons', () => {
  test('should render all categories if no categories are specified', () => {
    const container = new CategoryButtons({}, emitter, i18n).render();

    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(emojiData.categories.length);
    buttons.forEach((button, index) => {
      expect(button.title).toEqual(
        i18n.categories[emojiData.categories[index]]
      );
    });
  });

  test('should include the recents category if showRecents is true', () => {
    const container = new CategoryButtons(
      { showRecents: true },
      emitter,
      i18n
    ).render();

    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(emojiData.categories.length + 1);
    expect(buttons[0].title).toEqual(i18n.categories.recents);
    Array.prototype.slice.call(buttons, 1).forEach((button, index) => {
      expect(button.title).toEqual(
        i18n.categories[emojiData.categories[index]]
      );
    });
  });

  test('should only render specified categories if they are specified', () => {
    const container = new CategoryButtons(
      {
        categories: ['smileys', 'animals']
      },
      emitter,
      i18n
    ).render();

    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].title).toEqual(i18n.categories.smileys);
    expect(buttons[1].title).toEqual(i18n.categories.animals);
  });

  test('should include the recents with filtered categories if showRecents is true', () => {
    const container = new CategoryButtons(
      {
        categories: ['smileys', 'animals'],
        showRecents: true
      },
      emitter,
      i18n
    ).render();

    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0].title).toEqual(i18n.categories.recents);
    expect(buttons[1].title).toEqual(i18n.categories.smileys);
    expect(buttons[2].title).toEqual(i18n.categories.animals);
  });
});
