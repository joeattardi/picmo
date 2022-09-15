import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Category } from '../types';

import { PicMoElement } from './PicMoElement';

@customElement('picmo-categories')
export class CategoryTabsElement extends PicMoElement {
  static styles = css`
    .skeleton {
      height: var(--category-tabs-height);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-self: center;
      width: calc(2rem * var(--category-count, 1));
    }

    .container {
      overflow: auto;
      padding: 2px 0;
      scrollbar-width: thin;
    }

    .categoryButtons {
      display: flex;
      flex-direction: row;
      margin: 0;
      padding: 0 0.5em;
      align-items: center;
      height: var(--category-tabs-height);
      box-sizing: border-box;
      width: 100%;
      justify-content: space-between;
      position: relative;
      list-style-type: none;
      justify-self: center;
    }
  `;

  @property({ type: Array })
  categories: Category[];

  get categoryCount() {
    return this.options.categories?.length ||
      (this.options.showRecents ? 11 : 10);
  }

  render() {
    if (this.categories) {
      return html`
        <div class="container">
          <ul role="tablist" class="categoryButtons">
            ${this.categories?.map(category => 
              html`<picmo-category-tab .category=${category}></picmo-category>`
            )}
          </ul>
        </div>
      `;
    }

    return html`
      <div class="skeleton" style="width: calc(2rem * ${this.categoryCount});">
        hi
      </div>
    `;
  } 
}