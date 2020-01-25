import * as icons from './icons';

import { EmojiContainer } from './emojiContainer';
import {
  HIDE_PREVIEW,
  HIDE_TABS,
  SHOW_SEARCH_RESULTS,
  SHOW_TABS
} from './events';
import { createElement } from './util';

const CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
const CLASS_SEARCH_FIELD = 'emoji-picker__search';
const CLASS_SEARCH_ICON = 'emoji-picker__search-icon';
const CLASS_NOT_FOUND = 'emoji-picker__search-not-found';
const CLASS_NOT_FOUND_ICON = 'emoji-picker__search-not-found-icon';

export class Search {
  constructor(events, i18n, options, emojiData, autoFocusSearch) {
    this.events = events;
    this.i18n = i18n;
    this.options = options;
    this.emojiData = emojiData.filter(e => e.ver <= parseFloat(options.emojiVersion));
    this.autoFocusSearch = autoFocusSearch;
  }

  render() {
    this.searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);

    this.searchField = createElement('input', CLASS_SEARCH_FIELD);
    this.searchField.placeholder = this.i18n.search;
    this.searchContainer.appendChild(this.searchField);

    this.searchIcon = createElement('span', CLASS_SEARCH_ICON);
    this.searchIcon.innerHTML = icons.search;
    this.searchIcon.addEventListener('click', event =>
      this.onClearSearch(event)
    );

    this.searchContainer.appendChild(this.searchIcon);

    if (this.autoFocusSearch) {
      setTimeout(() => this.searchField.focus());
    }

    this.searchField.addEventListener('keydown', event =>
      this.onKeyDown(event)
    );
    this.searchField.addEventListener('keyup', () => this.onKeyUp());

    return this.searchContainer;
  }

  onClearSearch(event) {
    event.stopPropagation();

    if (this.searchField.value) {
      this.searchField.value = '';
      this.events.emit(SHOW_TABS);
      this.searchIcon.innerHTML = icons.search;
      this.searchIcon.style.cursor = 'default';
    }
  }

  onKeyDown(event) {
    if (event.key === 'Escape' && this.searchField.value !== '') {
      event.stopPropagation();
      this.searchField.value = '';
      this.events.emit(SHOW_TABS);
    }
  }

  onKeyUp() {
    if (!this.searchField.value) {
      this.searchIcon.innerHTML = icons.search;
      this.searchIcon.style.cursor = 'default';

      this.events.emit(SHOW_TABS);
    } else {
      this.searchIcon.innerHTML = icons.times;
      this.searchIcon.style.cursor = 'pointer';

      this.events.emit(HIDE_TABS);
      const searchResults = this.emojiData.filter(
        emoji =>
          emoji.n.filter(
            name =>
              name
                .toLowerCase()
                .indexOf(this.searchField.value.toLowerCase()) >= 0
          ).length
      );

      this.events.emit(HIDE_PREVIEW);

      if (searchResults.length) {
        this.events.emit(
          SHOW_SEARCH_RESULTS,
          new EmojiContainer(
            searchResults,
            true,
            this.events,
            this.options
          ).render()
        );
      } else {
        this.events.emit(
          SHOW_SEARCH_RESULTS,
          new NotFoundMessage(this.i18n.notFound).render()
        );
      }
    }
  }
}

class NotFoundMessage {
  constructor(message) {
    this.message = message;
  }

  render() {
    const container = createElement('div', CLASS_NOT_FOUND);

    const iconContainer = createElement('div', CLASS_NOT_FOUND_ICON);
    iconContainer.innerHTML = icons.frown;
    container.appendChild(iconContainer);

    const messageContainer = createElement('h2');
    messageContainer.innerHTML = this.message;
    container.appendChild(messageContainer);

    return container;
  }
}
