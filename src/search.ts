import { TinyEmitter as Emitter } from 'tiny-emitter';

import * as icons from './icons';

import { EmojiContainer } from './emojiContainer';
import {
  HIDE_PREVIEW,
  HIDE_VARIANT_POPUP,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS
} from './events';
import { createElement } from './util';
import { I18NStrings, EmojiButtonOptions, EmojiRecord } from './types';

const CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
const CLASS_SEARCH_FIELD = 'emoji-picker__search';
const CLASS_SEARCH_ICON = 'emoji-picker__search-icon';
const CLASS_NOT_FOUND = 'emoji-picker__search-not-found';
const CLASS_NOT_FOUND_ICON = 'emoji-picker__search-not-found-icon';

class NotFoundMessage {
  constructor(private message: string) {}

  render(): HTMLElement {
    const container = createElement('div', CLASS_NOT_FOUND);

    const iconContainer = createElement('div', CLASS_NOT_FOUND_ICON);
    iconContainer.innerHTML = icons.frown;
    container.appendChild(iconContainer);

    const messageContainer = createElement('h2');
    messageContainer.innerHTML = this.message;
    container.appendChild(messageContainer);

    return container;
  }
}

export class Search {
  private emojiData: EmojiRecord[];
  private emojisPerRow: number;
  private focusedEmojiIndex = 0;

  private searchContainer: HTMLElement;
  private searchField: HTMLInputElement;
  private searchIcon: HTMLElement;
  private resultsContainer: HTMLElement | null;

  constructor(
    private events: Emitter,
    private i18n: I18NStrings,
    private options: EmojiButtonOptions,
    emojiData: EmojiRecord[],
    categories: number[],
    private autoFocusSearch: boolean
  ) {
    this.emojisPerRow = this.options.emojisPerRow || 8;
    this.emojiData = emojiData.filter(
      e =>
        e.version &&
        parseFloat(e.version) <= parseFloat(options.emojiVersion as string) &&
        e.category !== undefined &&
        categories.indexOf(e.category) >= 0
    );
    this.autoFocusSearch = autoFocusSearch;

    this.events.on(HIDE_VARIANT_POPUP, () => {
      setTimeout(() => this.setFocusedEmoji(this.focusedEmojiIndex));
    });
  }

  render(): HTMLElement {
    this.searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);

    this.searchField = createElement(
      'input',
      CLASS_SEARCH_FIELD
    ) as HTMLInputElement;
    this.searchField.placeholder = this.i18n.search;
    this.searchContainer.appendChild(this.searchField);

    this.searchIcon = createElement('span', CLASS_SEARCH_ICON);
    this.searchIcon.innerHTML = icons.search;
    this.searchIcon.addEventListener('click', (event: MouseEvent) =>
      this.onClearSearch(event)
    );

    this.searchContainer.appendChild(this.searchIcon);

    if (this.autoFocusSearch) {
      setTimeout(() => this.searchField.focus());
    }

    this.searchField.addEventListener('keydown', (event: KeyboardEvent) =>
      this.onKeyDown(event)
    );
    this.searchField.addEventListener('keyup', () => this.onKeyUp());

    return this.searchContainer;
  }

  onClearSearch(event: Event): void {
    event.stopPropagation();

    if (this.searchField.value) {
      this.searchField.value = '';
      this.resultsContainer = null;

      this.searchIcon.innerHTML = icons.search;
      this.searchIcon.style.cursor = 'default';

      this.events.emit(HIDE_SEARCH_RESULTS);

      setTimeout(() => this.searchField.focus());
    }
  }

  setFocusedEmoji(index: number): void {
    if (this.resultsContainer) {
      const emojis = this.resultsContainer.querySelectorAll(
        '.emoji-picker__emoji'
      );
      const currentFocusedEmoji = emojis[this.focusedEmojiIndex] as HTMLElement;
      currentFocusedEmoji.tabIndex = -1;

      this.focusedEmojiIndex = index;
      const newFocusedEmoji = emojis[this.focusedEmojiIndex] as HTMLElement;
      newFocusedEmoji.tabIndex = 0;
      newFocusedEmoji.focus();
    }
  }

  handleResultsKeydown(event: KeyboardEvent): void {
    if (this.resultsContainer) {
      const emojis = this.resultsContainer.querySelectorAll(
        '.emoji-picker__emoji'
      );
      if (event.key === 'ArrowRight') {
        this.setFocusedEmoji(
          Math.min(this.focusedEmojiIndex + 1, emojis.length - 1)
        );
      } else if (event.key === 'ArrowLeft') {
        this.setFocusedEmoji(Math.max(0, this.focusedEmojiIndex - 1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (this.focusedEmojiIndex < emojis.length - this.emojisPerRow) {
          this.setFocusedEmoji(this.focusedEmojiIndex + this.emojisPerRow);
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.focusedEmojiIndex >= this.emojisPerRow) {
          this.setFocusedEmoji(this.focusedEmojiIndex - this.emojisPerRow);
        }
      } else if (event.key === 'Escape') {
        this.onClearSearch(event);
      }
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.searchField.value) {
      this.onClearSearch(event);
    }
  }

  onKeyUp(): void {
    if (!this.searchField.value) {
      this.searchIcon.innerHTML = icons.search;
      this.searchIcon.style.cursor = 'default';
      this.events.emit(HIDE_SEARCH_RESULTS);
    } else {
      this.searchIcon.innerHTML = icons.times;
      this.searchIcon.style.cursor = 'pointer';
      const searchResults = this.emojiData.filter(
        emoji =>
          emoji.name
            .toLowerCase()
            .indexOf(this.searchField.value.toLowerCase()) >= 0
      );

      this.events.emit(HIDE_PREVIEW);

      if (searchResults.length) {
        this.resultsContainer = new EmojiContainer(
          searchResults,
          true,
          this.events,
          this.options
        ).render();

        if (this.resultsContainer) {
          (this.resultsContainer.querySelector(
            '.emoji-picker__emoji'
          ) as HTMLElement).tabIndex = 0;
          this.focusedEmojiIndex = 0;

          this.resultsContainer.addEventListener('keydown', event =>
            this.handleResultsKeydown(event)
          );

          this.events.emit(SHOW_SEARCH_RESULTS, this.resultsContainer);
        }
      } else {
        this.events.emit(
          SHOW_SEARCH_RESULTS,
          new NotFoundMessage(this.i18n.notFound).render()
        );
      }
    }
  }
}
