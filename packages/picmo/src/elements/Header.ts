import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

import { CategoryTabsElement } from './CategoryTabs';

@customElement('picmo-header')
export class HeaderElement extends LitElement {
  @property({ type: Array })
  categories: Category[];

  @property()
  pickerId: string;

  static styles = css`
    .header {
      background-color: var(--secondary-background-color);
      padding-top: 8px;
      padding-bottom: 8px;
      display: grid;
      gap: 8px;
      border-bottom: 1px solid var(--border-color);
    }
  `;

  render() {
    return html`
      <header class="header">
        <picmo-search-bar></picmo-search-bar>
        <picmo-categories .pickerId=${this.pickerId} .categories=${this.categories}></picmo-categories>
      </header>
    `;
  } 
}