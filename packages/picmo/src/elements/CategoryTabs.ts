import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Category } from '../types';

import { CategoryTabElement } from './CategoryTab';

@customElement('picmo-categories')
export class CategoryTabsElement extends LitElement {
  @property({ type: Array })
  categories: Category[];

  render() {
    return html`
      <ul>
        ${this.categories?.map(category => html`<picmo-category-tab .category=${category}></picmo-category>`)}
      </ul>
    `;
  } 
}