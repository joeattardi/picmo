import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { EmojiRecord } from '../types';

import { PicMoElement } from './PicMoElement';

@customElement('picmo-search-bar')
export class SearchBar extends PicMoElement {
  static styles = css`
    .searchContainer {
      display: flex;
      height: var(--search-height);
      box-sizing: border-box;
      padding: 0 8px;
      position: relative;
    }

    .searchField {
      background: var(--search-background-color);
      border-radius: 3px;
      border: none;
      box-sizing: border-box;
      color: var(--text-color);
      font-size: 0.9em;
      outline: none;
      padding-right: 2em;
      padding: 0.5em 2.25em 0.5em 0.5em;
      width: 100%;
    }

    .searchField:focus {
      background: var(--search-focus-background-color);
    }

    .searchField::placeholder {
      color: var(--search-placeholder-color);
    }

    .searchAccessory {
      color: var(--search-icon-color);
      height: 100%;
      position: absolute;
      right: 1em;
      top: 0;
      width: 1.25rem;
      display: flex;
      align-items: center;
    }

    .clearSearchButton {
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--search-icon-color);
      font-size: 1em;
      width: 100%;
      height: 100%;
      padding: 0;
    }
  `;

  @property({ attribute: false })
  private searchText = '';

  private async onSearchInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.search(input.value);
  }

  private search(searchText) {
    this.searchText = searchText;
    this.events.dispatch('search', this.searchText);
  }

  private onSearchKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  private clearSearch() {
    this.search('');
  }

  private getSearchAccessory() {
    if (this.searchText) {
      return html`
        <button 
          title="${this.i18n.get('search.clear')}" 
          class="clearSearchButton"
          @click="${this.clearSearch}"
        >
          <picmo-icon icon="xmark"></picmo-icon>
        </button>
      `
    }

    return html`<picmo-icon icon="magnifying-glass"></picmo-icon>`;
  }

  render() {
    return html`
      <div class="searchContainer">
        <input 
          class="searchField" 
          @input="${this.onSearchInput}"
          @keydown="${this.onSearchKeyDown}"
          placeholder=${this.i18n.get('search')}
          .value="${this.searchText}"
        >
        <span class="searchAccessory">${this.getSearchAccessory()}</span>
      </div>
    `;
  }
}