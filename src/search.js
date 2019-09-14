import * as icons from './icons';

import { EmojiContainer } from './emojiContainer';
import { HIDE_PREVIEW, HIDE_TABS, SHOW_SEARCH_RESULTS, SHOW_TABS } from './events';
import { createElement } from './util';

const CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
const CLASS_SEARCH_FIELD = 'emoji-picker__search';
const CLASS_SEARCH_ICON = 'emoji-picker__search-icon';
const CLASS_NOT_FOUND = 'emoji-picker__search-not-found';
const CLASS_NOT_FOUND_ICON = 'emoji-picker__search-not-found-icon';

export class Search {
  constructor(events, emojiData) {
    this.events = events;
    this.emojiData = emojiData;
  }

  render() {
    this.searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);

    this.searchField = createElement('input', CLASS_SEARCH_FIELD);
    this.searchField.placeholder = 'Search';
    this.searchContainer.appendChild(this.searchField);

    const searchIcon = createElement('span', CLASS_SEARCH_ICON);
    searchIcon.innerHTML = icons.search;
    this.searchContainer.appendChild(searchIcon);
  
    setTimeout(() => this.searchField.focus());
  
    this.searchField.addEventListener('keydown', event => this.onKeyDown(event));
    this.searchField.addEventListener('keyup', () => this.onKeyUp());

    return this.searchContainer;
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
      this.events.emit(SHOW_TABS);
    } else {
      this.events.emit(HIDE_TABS);
      const searchResults = this.emojiData.filter(emoji => emoji.n.filter(name => name.toLowerCase().indexOf(this.searchField.value.toLowerCase()) >= 0).length);

      if (searchResults.length) {
        this.events.emit(HIDE_PREVIEW);
        this.events.emit(SHOW_SEARCH_RESULTS, new EmojiContainer(searchResults, true, this.events).render());
      } else {
        this.events.emit(SHOW_SEARCH_RESULTS, new NotFoundMessage().render());
      }
    }
  }
}

class NotFoundMessage {
  render() {
    const container = createElement('div', CLASS_NOT_FOUND);

    const iconContainer = createElement('div', CLASS_NOT_FOUND_ICON);
    iconContainer.innerHTML = icons.frown;
    container.appendChild(iconContainer);

    const messageContainer = createElement('h2');
    messageContainer.innerHTML = 'No emojis found';
    container.appendChild(messageContainer);

    return container;
  }
}
