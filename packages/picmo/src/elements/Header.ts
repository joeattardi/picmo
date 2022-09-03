import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

import { CategoryTabsElement } from './CategoryTabs';

@customElement('picmo-header')
export class HeaderElement extends LitElement {
  @property({ type: Array })
  categories: Category[];

  render() {
    return html`
      <header>
        <picmo-categories .categories=${this.categories}></picmo-categories>
      </header>
    `;
  } 
}