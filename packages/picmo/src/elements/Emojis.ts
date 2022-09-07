import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { EmojiRecord } from '../types';
import { Emoji } from './Emoji';

@customElement('picmo-emojis')
export class Emojis extends LitElement {
  static styles = css`
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

  @state()
  private emojis: EmojiRecord[];

  private onHoverEmoji(event) {
    if (event.target instanceof Emoji) {
      const target = event.target as Emoji;
      if (target.emoji) {
        const event = new CustomEvent('preview', {
          composed: true,
          bubbles: true,
          detail: {
            emoji: target.emoji,
            content: target.content?.cloneNode(true)
          }
        });
        this.dispatchEvent(event);
      }
    }
  }

  private clearPreview() {
    const event = new CustomEvent('preview', {
      composed: true,
      bubbles: true,
      detail: null
    });
    this.dispatchEvent(event);
  }

  private handleClick(event) {
    if (event.target instanceof Emoji) {
      const target = event.target as Emoji;
      if (target.emoji) {
        this.dispatchEvent(new CustomEvent('select', {
          composed: true,
          bubbles: true,
          detail: target.emoji
        }));
      }
    }
  }

  render() {
    return html`
        <div class="emojis" @mouseover=${this.onHoverEmoji} @mouseout=${this.clearPreview} @click=${this.handleClick}>
          ${this.emojis?.map(emoji => html`<picmo-emoji .emoji=${emoji}></picmo-emoji>`)}
        </div>`;
  }
}
