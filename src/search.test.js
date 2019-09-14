const Emitter = require('tiny-emitter');

const { SHOW_SEARCH_RESULTS, SHOW_TABS } = require('./events');
const { Search } = require('./search');

describe('Search', () => {
  const emojis = [
    { e: '⚡️', n: ['zap'] },
    { e: '😀', n: ['grinning'] }
  ];

  let events;
  let search;
  let searchField;

  beforeEach(() => {
    events = new Emitter();
    search = new Search(events, emojis).render();
    searchField = search.querySelector('.emoji-picker__search');
  });

  test('should render search results', done => {
    events.on(SHOW_SEARCH_RESULTS, searchResultsContainer => {
      const searchResults = searchResultsContainer.querySelectorAll('.emoji-picker__emoji');
      expect(searchResults.length).toBe(1);
      expect(searchResults[0].innerHTML).toEqual(emojis[0].e);
      done();
    });

    searchField.value = 'zap';
    searchField.dispatchEvent(new KeyboardEvent('keyup'));
  });

  test('should render a not found message when there are no results', done => {
    events.on(SHOW_SEARCH_RESULTS, searchResultsContainer => {
      expect(searchResultsContainer.classList.contains('emoji-picker__search-not-found')).toBe(true);
      done();
    });

    searchField.value = 'blah';
    searchField.dispatchEvent(new KeyboardEvent('keyup'));
  });

  test('should fire the SHOW_TABS event when the search text is empty', done => {
    events.on(SHOW_TABS, done);

    searchField.value = '';
    searchField.dispatchEvent(new KeyboardEvent('keyup'));
  });

  test('should clear the search and fire the SHOW_TABS event when the Escape key is pressed and the search text is not empty', done => {
    events.on(SHOW_TABS, done);

    searchField.value = 'foo';
    searchField.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape'
    }));
  });
});