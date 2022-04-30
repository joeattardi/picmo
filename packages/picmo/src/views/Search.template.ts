import { Template } from '../Template';

export const clearSearchButtonTemplate = new Template<HTMLButtonElement>(({ classes, i18n }) => /* html */`
  <button title="${i18n.get('search.clear')}" class="${classes.clearSearchButton}">
    <i data-icon="xmark"></i>
  </button>
`);

export const searchTemplate = new Template(({ classes, i18n }) => /* html */`
<div class="${classes.searchContainer}">
  <input class="${classes.searchField}" placeholder="${i18n.get('search')}">
  <span class="${classes.searchAccessory}"></span>
</div>
`, { mode: 'async' });