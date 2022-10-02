import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EmojiRecord } from '../types';

import { PicMoElement } from './PicMoElement';

@customElement('picmo-preview')
export class Preview extends PicMoElement {
  static styles = css`
    .preview {
      border-top: 1px solid var(--border-color);
      display: grid;
      align-items: center;
      gap: 6px;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas: "emoji name"
                          "emoji tags";
      height: var(--emoji-preview-height);
      box-sizing: border-box;
      padding: 0.5em;
      position: relative;
      background: var(--preview-background-color);
    }

    .previewEmoji {
      grid-area: emoji;
      font-size: var(--emoji-preview-size);
      font-family: var(--emoji-font);
      width: 1.25em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .previewName {
      grid-area: name;
      color: var(--text-color);
      font-size: 0.8em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .tagList {
      grid-area: tags;
      list-style-type: none;
      display: flex;
      flex-direction: row;
      padding: 0;
      margin: 0;
      font-size: 0.75em;
      overflow: hidden;
    }

    .tag {
      border-radius: 3px;
      background: var(--tag-background-color);
      color: var(--text-color);
      padding: 2px 8px;
      margin-right: 0.25em;
      white-space: nowrap;
    }

    .tag:last-child {
      margin-right: 0;
    }
  `;

  @state()
  preview: { emoji: EmojiRecord, content: Node } | null;

  connectedCallback() {
    super.connectedCallback();

    this.events.register('preview:show', this.showPreview, this);
    this.events.register('preview:clear', this.clearPreview, this);
  }

  showPreview(emoji: EmojiRecord, content: Node) {
    this.preview = { emoji, content };
  }

  clearPreview() {
    this.preview = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.events.unregister('preview:show', this.showPreview);
    this.events.unregister('preview:clear', this.clearPreview);
  }

  renderTags() {
    if (!this.emojiData) {
      return html`
        <ul class="tagList">
          <picmo-skeleton width="20%" height="1em"></picmo-skeleton>
          <picmo-skeleton width="20%" height="1em"></picmo-skeleton>
        </ul>
      `;
    }

    if (this.preview?.emoji.tags) {
      return html`
        <ul class="tagList">
          ${this.preview.emoji.tags.map(tag => html`<li class="tag">${tag}</li>`)}
        </ul>
      `;
    }
  }

  render() {
    if (this.emojiData) {
      return html`
        <div class="preview">
          <div class="previewEmoji">${this.preview?.content}</div>
          <div class="previewName">${this.preview?.emoji.label}</div>
          ${this.renderTags()}
        </div>
      `;
    }

    return html`
      <div class="preview">
        <div class="previewEmoji">
          <picmo-skeleton width="2.5rem" height="2.5rem" borderRadius="50%"></picmo-skeleton>
        </div>
        <div class="previewName">
          <picmo-skeleton width="80%" height="1em" borderRadius="0"></picmo-skeleton>
        </div>
        <ul class="tagList">
          <picmo-skeleton width="5em" height="1em"></picmo-skeleton>
        </ul>
      </div>
    `;
  }
}