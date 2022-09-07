import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Category } from '../types';

@customElement('picmo-categories')
export class CategoryTabsElement extends LitElement {
  static styles = css`
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

  render() {
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
}