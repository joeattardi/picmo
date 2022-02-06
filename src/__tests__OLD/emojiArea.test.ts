import { TinyEmitter as Emitter } from 'tiny-emitter';

import emojiData from './data/emoji';

import { EmojiArea } from './emojiArea';
import { i18n } from './i18n';

import { buildEmojiCategoryData } from './util';

const emitter = new Emitter();

const emojiCategoryData = buildEmojiCategoryData(emojiData);

describe('EmojiArea', () => {
  test('renders an emoji list for each category', () => {
    const emojiArea = new EmojiArea(
      emitter,
      i18n,
      {
        emojiVersion: '11.0'
      },
      emojiCategoryData
    ).render();

    const containers = emojiArea.querySelectorAll('.emoji-picker__container');
    expect(containers).toHaveLength(emojiData.categories.length);

    const names = emojiArea.querySelectorAll('h2');
    expect(names).toHaveLength(emojiData.categories.length);
    names.forEach((name, index) => {
      expect(name.innerHTML.replace('&amp;', '&')).toEqual(
        i18n.categories[emojiData.categories[index]]
      );
    });
  });

  test('only renders emoji lists for specified categories', () => {
    const emojiArea = new EmojiArea(
      emitter,
      i18n,
      {
        emojiVersion: '11.0',
        categories: ['smileys', 'animals']
      },
      emojiCategoryData
    ).render();

    const containers = emojiArea.querySelectorAll('.emoji-picker__container');
    expect(containers).toHaveLength(2);

    const names = emojiArea.querySelectorAll('h2');
    expect(names).toHaveLength(2);
    expect(names[0].innerHTML.replace('&amp;', '&')).toEqual(
      i18n.categories.smileys
    );
    expect(names[1].innerHTML.replace('&amp;', '&')).toEqual(
      i18n.categories.animals
    );
  });

  test('includes the recents category if showRecents is true', () => {
    const emojiArea = new EmojiArea(
      emitter,
      i18n,
      {
        emojiVersion: '11.0',
        categories: ['smileys', 'animals'],
        showRecents: true
      },
      emojiCategoryData
    ).render();

    const containers = emojiArea.querySelectorAll('.emoji-picker__container');
    expect(containers).toHaveLength(3);

    const names = emojiArea.querySelectorAll('h2');
    expect(names).toHaveLength(3);
    expect(names[0].innerHTML).toEqual(i18n.categories.recents);
    expect(names[1].innerHTML.replace('&amp;', '&')).toEqual(
      i18n.categories.smileys
    );
    expect(names[2].innerHTML.replace('&amp;', '&')).toEqual(
      i18n.categories.animals
    );
  });

  test('selects the initial category', () => {
    const emojiArea = new EmojiArea(
      emitter,
      i18n,
      {
        emojiVersion: '11.0',
        categories: ['smileys', 'animals'],
        showRecents: true,
        initialCategory: 'animals',
        showCategoryButtons: true
      },
      emojiCategoryData
    );
    const container = emojiArea.render();
    emojiArea.reset();

    const buttons = container.querySelectorAll(
      '.emoji-picker__category-button'
    );
    expect(buttons[2].classList).toContain('active');
  });
});
