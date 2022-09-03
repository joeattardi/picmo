import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

import { categoryIcons } from '../icons';

@customElement('picmo-category-tab')
export class CategoryTabElement extends LitElement {
  @property()
  category: Category;

  @property()
  pickerId: string;

  static styles = css`
    .categoryTab {
      display: flex;
      align-items: center;
      transition: all 100ms;
      width: 2em;
    }

    .categoryButton {
      border-radius: 5px;
      background: transparent;
      border: 2px solid transparent;
      color: var(--category-tab-color);
      cursor: pointer;
      padding: 2px;
      vertical-align: middle;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      width: 1.6em;
      height: 1.6em;
      transition: all 100ms;
    }

    .categoryButton img {
      width: var(--category-tab-size);
      height: var(--category-tab-size);
    }

    .categoryButton:hover {
      background: var(--category-tab-highlight-background-color);
    }
  `;

  render() {
    return html`
      <li class="categoryTab">
        <button
          aria-selected="false"
          role="tab"
          class="categoryButton"
          tabindex="-1"
          type="button"
          data-category="${this.category.key}"
          id="${this.pickerId}-category-${this.category.key}"
        >
          <picmo-icon icon=${categoryIcons[this.category.key]}></picmo-icon>
        </button>
      </li>
    `;
  } 
}