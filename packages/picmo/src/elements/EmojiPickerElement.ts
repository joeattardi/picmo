import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { contextProvider } from '@lit-labs/context';
import { LATEST_EMOJI_VERSION } from 'emojibase';

import { i18nContext } from './I18nContext';
import { DataStore } from '../data/DataStore';
import { EmojiRecord, PickerOptions } from '../types';

import { Category } from '../types';

import { determineEmojiVersion } from '../emojiSupport';
import { lightTheme, darkTheme } from './themes';
import { Bundle } from '../i18n/bundle';
import { emojiPickerContext, PickerContextData } from './EmojiPickerContext';
import { dataContext } from './EmojiDataContext';
import { optionsContext } from './OptionsContext';

interface PreviewData {
  emoji: EmojiRecord;
  content: Element;
}
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

        --search-height: 2em;

        --emoji-font: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla', 'Noto Color Emoji', 'EmojiOne Color', 'Android Emoji';
        --ui-font: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
        --ui-font-size: 16px;

        --category-tabs-height: calc(1.5em + 4px + 4px + 1px);

        --emoji-preview-margin: 4px;
        --emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);
        --emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));
        --emoji-preview-size: 2.75em;

        --picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);
        --row-count: 6;
        --category-name-height: 2rem;
        --emoji-area-height: calc(
          (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height)
        );
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

  @contextProvider({ context: i18nContext })
  @property({ attribute: false })
  bundle: Bundle;

  @contextProvider({ context: emojiPickerContext })
  @property({ attribute: false })
  contextData: PickerContextData;

  @contextProvider({ context: dataContext })
  @property({ attribute: false })
  emojiData: DataStore;

  @contextProvider({ context: optionsContext })
  @property({ attribute: false })
  options: PickerOptions;

  @state()
  private categories: Category[];

  @state()
  private currentPreview: PreviewData;

  constructor(options: PickerOptions, private pickerId: string, emojiDataPromise: Promise<DataStore>) {
    super();

    this.bundle = new Bundle(options.i18n);

    this.contextData = { 
      pickerId,
      emojiVersion: options.emojiVersion === 'auto' ? 
        determineEmojiVersion() || parseFloat(LATEST_EMOJI_VERSION) :
        this.options.emojiVersion as number
    };
    this.options = options;

    emojiDataPromise.then(emojiData => {
      this.emojiData = emojiData;
      return emojiData.getCategories(this.options);
    }).then(categories => {
      this.categories = categories;
    });
  }

  private updatePreview(event) {
    this.currentPreview = event.detail;
  }

  renderPicker() {
    return html`
      <div class="picker lightTheme">
        <picmo-header .pickerId=${this.pickerId} .categories=${this.categories}></picmo-header>
        <div class="content">
          <picmo-emoji-area
            .categories=${this.categories}
            @preview=${this.updatePreview}
          ></picmo-emoji-area>
        </div>
        <picmo-preview .preview=${this.currentPreview}></picmo-preview>
      </div>
    `;
  }

  render() {
    if (this.categories) {
      return this.renderPicker();
    }

    return html`<h1>Loading...</h1>`;
  } 
}