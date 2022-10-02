import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Category } from '../types';

import { PicMoElement } from './PicMoElement';

@customElement('picmo-categories')
export class CategoryTabsElement extends PicMoElement {
  static styles = css`
    .skeleton {
      height: var(--category-tabs-height);
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      justify-items: center;
      width: calc(2rem * var(--category-count, 1));
      margin: 0 0.25em;
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

    const categorySkeletons: TemplateResult[] = [];
    for (let i = 0; i < this.categoryCount; i++) {
      categorySkeletons.push(html`<picmo-skeleton width="25px" height="25px"></picmo-skeleton>`);
    }

    return html`
      <div class="skeleton" style="width: calc(2rem * ${this.categoryCount});">
        ${categorySkeletons}
      </div>
    `;
  } 
}