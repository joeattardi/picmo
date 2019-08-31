import * as icons from './icons';

import emojiData from './data/emoji.js';

import { renderEmojiContainer } from './emojiContainer';
import { createElement, empty } from './util';

const CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
const CLASS_SEARCH_FIELD = 'emoji-picker__search';
const CLASS_SEARCH_ICON = 'emoji-picker__search-icon';
const CLASS_NOT_FOUND = 'emoji-picker__search-not-found';
const CLASS_NOT_FOUND_ICON = 'emoji-picker__search-not-found-icon';

export function renderSearch(pickerContent, emojiCallback, hidePicker, renderCallback) {
  const searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);

  const searchField = createElement('input', CLASS_SEARCH_FIELD);
  searchField.placeholder = 'Search';
  searchContainer.appendChild(searchField);

  searchField.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (searchField.value !== '') {
        event.stopPropagation();
        searchField.value = '';
        empty(pickerContent);
        renderCallback();
      }
    }
  });

  searchField.addEventListener('keyup', () => {
    empty(pickerContent);

    if (!searchField.value) {
      renderCallback();
    } else {
      const searchResults = emojiData.filter(emoji => emoji.names.filter(name => name.indexOf(searchField.value) >= 0).length);

      if (searchResults.length) {
        pickerContent.appendChild(renderEmojiContainer(searchResults, emojiCallback, hidePicker));
      } else {
        const notFoundContainer = createElement('div', CLASS_NOT_FOUND);
        const iconContainer = createElement('div', CLASS_NOT_FOUND_ICON);
        iconContainer.innerHTML = icons.frown;
        notFoundContainer.appendChild(iconContainer);

        const messageContainer = createElement('h2');
        messageContainer.innerHTML = 'No emojis found';
        notFoundContainer.appendChild(messageContainer);

        pickerContent.appendChild(notFoundContainer);
      }
    }
  });
  
  const searchIcon = createElement('span', CLASS_SEARCH_ICON);
  searchIcon.innerHTML = icons.search;
  searchContainer.appendChild(searchIcon);

  setTimeout(() => searchField.focus());

  return searchContainer;
}