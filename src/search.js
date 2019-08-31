import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import emojiData from './data/emoji.js';

import { createElement, empty } from './util';

library.add(faSearch);

const search = icon({ prefix: 'fas', iconName: 'search' }).html;

const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';
const CLASS_EMOJI = 'emoji-picker__emoji';

const CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
const CLASS_SEARCH_ICON = 'emoji-picker__search-icon';

export function renderSearch(picker, pickerContent, emojiCallback, hidePicker, renderCallback) {
  const searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);

  const searchField = createElement('input');
  searchField.placeholder = 'Search';
  searchContainer.appendChild(searchField);

  searchField.addEventListener('keyup', event => {
    empty(pickerContent);

    if (!searchField.value) {
      renderCallback();
    } else {
      const searchResults = emojiData.filter(emoji => emoji.names.filter(name => name.indexOf(searchField.value) >= 0).length);
      const emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
      searchResults.forEach(result => {
        const emojiButton = createElement('button', CLASS_EMOJI);
        emojiButton.innerHTML = result.emoji;

        emojiButton.addEventListener('click', () => {
          emojiCallback(result.emoji);
          hidePicker();
        });

        emojiContainer.appendChild(emojiButton);
      });

      pickerContent.appendChild(emojiContainer);
    }
  });
  
  const searchIcon = createElement('span', CLASS_SEARCH_ICON);
  searchIcon.innerHTML = search;
  searchContainer.appendChild(searchIcon);

  picker.appendChild(searchContainer);

  setTimeout(() => searchField.focus());
}