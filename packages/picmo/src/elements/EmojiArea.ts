import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

@customElement('picmo-emoji-area')
export class EmojiArea extends LitElement {
  @property()
  private categories: Category[];

  static styles = css`
    .emojiArea {
      height: var(--emoji-area-height);
      overflow-y: auto;
      position: relative;
      scrollbar-color: var(--scrollbar-color) var(--scrollbar-background-color);
      scrollbar-width: thin;
    }
  `;

  render() {
    return html`
      <div class="emojiArea">
        ${this.categories?.map(category => html`<picmo-emoji-category .category=${category}></picmo-emoji-category>`)}
      </div>
    `
  }
}
