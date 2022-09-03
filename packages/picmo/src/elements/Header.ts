import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

import { CategoryTabsElement } from './CategoryTabs';

@customElement('picmo-header')
export class HeaderElement extends LitElement {
  @property({ type: Array })
  categories: Category[];

  @property()
  pickerId: string;

  render() {
    return html`
      <header>
        <picmo-categories .pickerId=${this.pickerId} .categories=${this.categories}></picmo-categories>
      </header>
    `;
  } 
}