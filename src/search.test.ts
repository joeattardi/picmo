import { TinyEmitter as Emitter } from 'tiny-emitter';

import { SHOW_SEARCH_RESULTS } from './events';
import { Search } from './search';

import { i18n } from './i18n';
import { EmojiButtonOptions, EmojiRecord } from './types';

describe('Search', () => {
  const emojis: EmojiRecord[] = [
    { category: 0, emoji: '⚡️', name: 'zap', version: '12.1' },
    { category: 1, emoji: '😀', name: 'grinning', version: '12.1' }
  ];

  const options: EmojiButtonOptions = { emojiVersion: '12.1', style: 'native' };
  let events;
  let search;
  let searchField;

  beforeEach(() => {
    events = new Emitter();
    search = new Search(events, i18n, options, emojis, [0], true).render();
    searchField = search.querySelector('.emoji-picker__search');
  });

  test('should autofocus the search field if autoFocusSearch is true', done => {
    search = new Search(events, i18n, options, emojis, [0], true).render();
    searchField = search.querySelector('.emoji-picker__search');

    setTimeout(() => {
      expect(document.activeElement).toBe(searchField);
      done();
    });
  });

  test('should not autofocus the search field if autoFocusSearch is false', done => {
    search = new Search(events, i18n, options, emojis, [0], false).render();
    searchField = search.querySelector('.emoji-picker__search');

    setTimeout(() => {
      expect(document.activeElement).not.toBe(searchField);
      done();
    });
  });

  test('should render search results', done => {
    events.on(SHOW_SEARCH_RESULTS, searchResultsContainer => {
      const searchResults = searchResultsContainer.querySelectorAll(
        '.emoji-picker__emoji'
      );
      expect(searchResults.length).toBe(1);
      expect(searchResults[0].innerHTML).toEqual(emojis[0].emoji);
      done();
    });

    searchField.value = 'zap';
    searchField.dispatchEvent(new KeyboardEvent('keyup'));
  });

  test('should not show search results for the unselected categories', done => {
    search = new Search(events, i18n, options, emojis, [0], false).render();
    events.on(SHOW_SEARCH_RESULTS, searchResultsContainer => {
      const searchResults = searchResultsContainer.querySelectorAll(
        '.emoji-picker__emoji'
      );
      expect(searchResults.length).toBe(0);
      done();
    });

    searchField.value = 'grinning';
    searchField.dispatchEvent(new KeyboardEvent('keyup'));
  });

  test('should render a not found message when there are no results', done => {
    events.on(SHOW_SEARCH_RESULTS, searchResultsContainer => {
      expect(
        searchResultsContainer.classList.contains(
          'emoji-picker__search-not-found'
        )
      ).toBe(true);
      done();
    });

    searchField.value = 'blah';
    searchField.dispatchEvent(new KeyboardEvent('keyup'));
  });

  // test('should fire the SHOW_TABS event when the search text is empty', done => {
  //   events.on(SHOW_TABS, done);

  //   searchField.value = '';
  //   searchField.dispatchEvent(new KeyboardEvent('keyup'));
  // });

  // test('should clear the search and fire the SHOW_TABS event when the Escape key is pressed and the search text is not empty', done => {
  //   events.on(SHOW_TABS, done);

  //   searchField.value = 'foo';
  //   searchField.dispatchEvent(
  //     new KeyboardEvent('keydown', {
  //       key: 'Escape'
  //     })
  //   );
  //   expect(searchField.value).toBe('');
  // });

  // test('should clear the search and fire the SHOW_TABS event when the clear search icon is clicked', done => {
  //   events.on(SHOW_TABS, done);

  //   searchField.value = 'foo';
  //   const searchIcon = search.querySelector('.emoji-picker__search-icon');
  //   searchIcon.dispatchEvent(new MouseEvent('click'));
  //   expect(searchField.value).toBe('');
  // });
});
