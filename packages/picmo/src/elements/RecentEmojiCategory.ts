import { html, css } from 'lit';
import { EmojiCategory } from './EmojiCategory';

import { customElement, property } from 'lit/decorators.js';
import { EmojiRecord } from '../types';

@customElement('picmo-recent-emojis')
export class RecentEmojiCategory extends EmojiCategory {
  static styles = [
    ...EmojiCategory.styles,
    css`
      .noRecents {
        color: var(--secondary-text-color);
        grid-column: 1 / span var(--emojis-per-row);
        font-size: 0.9em;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(var(--emoji-size) * var(--emoji-size-multiplier));
      }
    `
  ];

  @property() 
  lastEmoji: EmojiRecord;

  connectedCallback() {
    super.connectedCallback();
    this.events.register('recents:update', this.loadEmojis, this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.events.unregister('recents:update', this.loadEmojis);
  }

  async loadEmojis() {
    const { recentsProvider, maxRecents } = this.options;
    this.emojis = recentsProvider?.getRecents(maxRecents);
  }

  renderEmojis() {
    if (this.emojis.length) {
      return super.renderEmojis();
    }
    
    return html`
      <div class="noRecents">
        ${this.i18n.get('recents.none')}
      </div>
    `;
  }
}
