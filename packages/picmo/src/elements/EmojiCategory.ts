import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

import { Element } from './Element';

@customElement('picmo-emoji-category')
export class EmojiCategory extends Element {
  @property()
  category: Category

  render() {
    return html`
      <div>
        ${this.i18n.get(`categories.${this.category.key}`)}
      </div>
    `;
  }
}