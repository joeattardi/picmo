import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { EmojiRecord } from '../types';
import { Emoji } from './Emoji';

import { PicMoElement } from './PicMoElement';
@customElement('picmo-emojis')
export class Emojis extends PicMoElement {
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
        this.events.dispatch('preview:show', target.emoji, target.content.cloneNode(true));
      }
    }
  }

  private clearPreview() {
    this.events.dispatch('preview:clear');
  }

  private handleClick(event) {
    if (event.target instanceof Emoji) {
      const target = event.target as Emoji;
      if (target.emoji) {
        this.events.dispatch('emoji:select', target.emoji);
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
