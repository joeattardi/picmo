import { screen } from '@testing-library/dom';
import { testView, testViewSync } from '../../../testHelpers/testView';
import { Category } from '../../types';

jest.mock('../../data/InMemoryStore');

import { EmojiArea } from '../EmojiArea';
import { CategoryTabs } from '../CategoryTabs';
import { InMemoryStore } from '../../data/InMemoryStore';

import { Events } from '../../events';
import { AppEvent } from '../../AppEvents';

describe('EmojiArea', () => {
  const events = new Events<AppEvent>();

  const categories: Category[] = [
    { key: 'smileys-emotion', message: 'smileys-emotion', order: 1 },
    { key: 'animals-nature', message: 'animals-nature', order: 2 },
    { key: 'flags', message: 'flags', order: 3 }
  ];
  
  const emojiData = {
    'smileys-emotion': [
      { emoji: '😎' },
      { emoji: '😀' },
      { emoji: '😘' }
    ],
    'animals-nature': [
      { emoji: '🐒' },
      { emoji: '🦊' }
    ],
    flags: [
      { emoji: '🏁' },
      { emoji: '🏴‍☠️' }
    ]
  };

  jest.spyOn(InMemoryStore.prototype, 'getEmojis').mockImplementation((category: Category) => 
  Promise.resolve(emojiData[category.key]));

  test('renders the emoji area', async () => {
    await testView(EmojiArea, [{ categories }], { events });

    // All categories and emojis rendered?
    expect(screen.getAllByRole('tabpanel')).toHaveLength(3);
    expect(screen.getAllByRole('button')).toHaveLength(7);
  });

  test('scrolls to a category when selected', async () => {
    const view = await testView(EmojiArea, [{ categories }], { events });
    const [smileys, animals, flags] = screen.getAllByRole('tabpanel');

    jest.spyOn(smileys, 'offsetTop', 'get').mockImplementation(() => 0);
    jest.spyOn(animals, 'offsetTop', 'get').mockImplementation(() => 100);
    jest.spyOn(flags, 'offsetTop', 'get').mockImplementation(() => 200);

    const scrollSpy = jest.spyOn(view.el, 'scrollTop', 'set');

    // When a category is selected, it should set the scroll position to the top of the category
    events.emit('category:select', 'flags', { scroll: 'jump' });
    expect(scrollSpy).toHaveBeenCalledWith(200);

    events.emit('category:select', 'smileys-emotion', { scroll: 'jump' });
    expect(scrollSpy).toHaveBeenCalledWith(0);
  });

  test('cycles through categories forwards', async () => {
    const categoryTabs = testViewSync(CategoryTabs, [{ categories }], { events });
    await testView(EmojiArea, [{ categories, categoryTabs }], { events });

    events.emit('category:next', 0);
    expect(categoryTabs.currentCategory.key).toBe('animals-nature');

    events.emit('category:next', 0);
    expect(categoryTabs.currentCategory.key).toBe('flags');
  });

  test('cycles through categories backwards', async () => {
    const categoryTabs = testViewSync(CategoryTabs, [{ categories }], { events });
    await testView(EmojiArea, [{ categories, categoryTabs }], { events });
    events.emit('category:select',  'flags');
    events.emit('category:previous', 0);
    expect(categoryTabs.currentCategory.key).toBe('animals-nature');

    events.emit('category:previous', 0);
    expect(categoryTabs.currentCategory.key).toBe('smileys-emotion');
  });
});