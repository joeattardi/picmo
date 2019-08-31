import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { createElement } from './util';

library.add(faSearch);

const search = icon({ prefix: 'fas', iconName: 'search' }).html;

const CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
const CLASS_SEARCH_ICON = 'emoji-picker__search-icon';

export function renderSearch(picker) {
  const searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);

  const searchField = createElement('input');
  searchField.placeholder = 'Search';
  searchContainer.appendChild(searchField);

  const searchIcon = createElement('span', CLASS_SEARCH_ICON);
  searchIcon.innerHTML = search;
  searchContainer.appendChild(searchIcon);

  picker.appendChild(searchContainer);

  setTimeout(() => searchField.focus());
}