import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Element } from './Element';

@customElement('picmo-search-bar')
export class SearchBar extends Element {
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
  `;

  render() {
    return html`
      <div class="searchContainer">
        <input class="searchField" placeholder=${this.i18n.get('search')}>
      </div>
    `;
  }
}