import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { DataStore } from '../data/DataStore';
import { PickerOptions } from '../types';

import { Category } from '../types';

import { lightTheme, darkTheme } from './themes';
@customElement('picmo-emoji-picker')
export class EmojiPickerElement extends LitElement {
  static styles = [
    lightTheme,
    css`
      :host {
        --border-radius: 5px;
        --emojis-per-row: 8;
        --emoji-size: 2rem;
        --emoji-size-multiplier: 1.3;

        --emoji-font: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla', 'Noto Color Emoji', 'EmojiOne Color', 'Android Emoji';
        --ui-font: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
        --ui-font-size: 16px;

        --category-tabs-height: calc(1.5em + 4px + 4px + 1px);

        --picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);
      }

      .picker {
        background: var(--background-color);
        width: var(--picker-width);
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        font-family: var(--ui-font);
        font-size: var(--ui-font-size);
        overflow: hidden;
        position: relative;
        width: var(--picker-width);
      }

      .picker > * {
        font-family: var(--ui-font);
      }
    `
  ];

  @state()
  private categories: Category[];

  constructor(private options: PickerOptions, private pickerId: string, private emojiDataPromise: Promise<DataStore>) {
    super();

    this.emojiDataPromise.then(emojiData => {
      return emojiData.getCategories(this.options);
    }).then(categories => {
      this.categories = categories;
    });
  }

  render() {
    return html`
      <div class="picker lightTheme">
        <picmo-header .pickerId=${this.pickerId} .categories=${this.categories}></picmo-header>
      </div>
    `;
  } 
}