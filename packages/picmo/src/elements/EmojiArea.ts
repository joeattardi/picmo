import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Category } from '../types';

@customElement('picmo-emoji-area')
export class EmojiArea extends LitElement {
  static styles = css`
    .emojiArea {
      height: var(--emoji-area-height);
      overflow-y: auto;
      position: relative;
      scrollbar-color: var(--scrollbar-color) var(--scrollbar-background-color);
      scrollbar-width: thin;
    }

    .emojiArea::-webkit-scrollbar {
      background: var(--scrollbar-background-color);
      width: 1.1em;
    }

    .emojiArea::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      background-clip: padding-box;
      height: 1em;
      border-radius: 1em
    }
  `;

  render() {
    return html`
      <div class="emojiArea" >
        <slot></slot>
      </div>
    `
  }
}
