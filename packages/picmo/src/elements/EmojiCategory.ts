import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { Category, EmojiRecord } from '../types';
import { categoryIcons } from './icons';

import { Element } from './Element';
import { Emoji } from './Emoji';

@customElement('picmo-emoji-category')
export class EmojiCategory extends Element {
  static styles = css`
    .emojiCategory {
      position: relative;
    }

    .categoryName {
      font-size: 0.9em;
      padding: 0.5rem;
      margin: 0;
      background: var(--category-name-background-color);
      color: var(--category-name-text-color);
      top: 0;
      z-index: 1;
      display: grid;
      gap: 4px;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      line-height: 1;
      box-sizing: border-box;
      height: var(--category-name-height);
      justify-content: flex-start;
      text-transform: uppercase;
    }

    .emojis {
      display: grid;
      justify-content: space-between;
      gap: 1px;
      padding: 0 0.5em;
      grid-template-columns: repeat(var(--emojis-per-row), calc(var(--emoji-size) * var(--emoji-size-multiplier)));
      grid-auto-rows: calc(var(--emoji-size) * var(--emoji-size-multiplier));
      align-items: center;
      justify-items: center;
    }
  `;

  @property()
  category: Category

  @state()
  private emojis: EmojiRecord[];

  async renderEmojis() {
    if (!this.emojis) {
      const dataStore = await this.emojiData;
      this.emojis = await dataStore.getEmojis(this.category, this.emojiVersion);
    }

    return this.emojis.map(emoji => html`<picmo-emoji .emoji=${emoji}></picmo-emoji>`);
  }

  render() {
    return html`
      <section class="emojiCategory" aria-labelledby="${this.pickerId}-category-${this.category.key}">
        <h3 data-category="${this.category.key}" class="categoryName">
          <picmo-icon fixedWidth icon="${categoryIcons[this.category.key]}"></picmo-icon>
          ${this.i18n.get(`categories.${this.category.key}`)}
        </h3>
        <div class="emojis">
          ${until(this.renderEmojis())}
        </div>
      </div>
    `;
  }
}