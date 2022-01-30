import fuzzysort from 'fuzzysort';
import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import icons from './icons';

import { EmojiContainer } from './emojiContainer';
import { HIDE_PREVIEW, HIDE_VARIANT_POPUP, SHOW_SEARCH_RESULTS, HIDE_SEARCH_RESULTS } from './events';
import { I18NStrings, EmojiButtonOptions, EmojiRecord } from './types';

import { renderTemplate, toElement } from './templates';
import searchTemplate from './templates/search/search.ejs';
import clearSearchButtonTemplate from './templates/search/clearButton.ejs';
import notFoundTemplate from './templates/search/notFound.ejs';

import { LazyLoader } from './lazyLoad';
import { queryByClass } from './util';

export class Search {
  private emojiData: EmojiRecord[];
  private emojisPerRow: number;
  private focusedEmojiIndex = 0;

  private searchContainer: HTMLElement;
  private searchField: HTMLInputElement;
  private searchAccessory: HTMLElement;
  private searchIcon: HTMLImageElement;
  private clearSearchButton: HTMLButtonElement;
  private resultsContainer: HTMLElement | null;
  private notFoundMessage: HTMLElement;

  constructor(
    private events: Emitter,
    private i18n: I18NStrings,
    private options: EmojiButtonOptions,
    emojiData: EmojiRecord[],
    categories: number[]
  ) {
    this.emojisPerRow = this.options.emojisPerRow || 8;
    this.emojiData = emojiData.filter(
      e =>
        e.version &&
        parseFloat(e.version) <= parseFloat(options.emojiVersion as string) &&
        e.category !== undefined &&
        categories.indexOf(e.category) >= 0
    );

    if (this.options.custom) {
      const customEmojis = this.options.custom.map(custom => ({
        ...custom,
        custom: true
      }));

      this.emojiData = [...this.emojiData, ...customEmojis];
    }

    this.events.on(HIDE_VARIANT_POPUP, () => {
      setTimeout(() => this.setFocusedEmoji(this.focusedEmojiIndex));
    });
  }

  reset(): void {
    this.searchAccessory.replaceChildren(this.searchIcon);
  }

  render(): HTMLElement {
    this.searchIcon = icons.search();
    this.notFoundMessage = renderTemplate(notFoundTemplate, {
      i18n: this.i18n,
      icon: icons.notFound()
    });

    this.searchContainer = renderTemplate(searchTemplate, {
      i18n: this.i18n
    });

    this.clearSearchButton = renderTemplate(clearSearchButtonTemplate, {
      i18n: this.i18n,
      icon: icons.clear()
    });

    this.searchField = queryByClass(this.searchContainer, classes.searchField);
    this.searchAccessory = queryByClass(this.searchContainer, classes.searchAccessory);

    this.clearSearchButton.addEventListener('click', (event: MouseEvent) => this.onClearSearch(event));
    this.searchField.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
    this.searchField.addEventListener('keyup', event => this.onKeyUp(event));

    this.searchAccessory.replaceChildren(this.searchIcon);

    return this.searchContainer;
  }

  clear(): void {
    this.searchField.value = '';
  }

  focus(): void {
    this.searchField.focus();
  }

  onClearSearch(event: Event): void {
    event.stopPropagation();

    if (this.searchField.value) {
      this.searchField.value = '';
      this.resultsContainer = null;

      this.searchAccessory.replaceChildren(this.searchIcon);

      this.events.emit(HIDE_SEARCH_RESULTS);

      // TODO: Find out why button steals focus on Escape key
      setTimeout(() => this.searchField.focus());
    }
  }

  setFocusedEmoji(index: number): void {
    if (this.resultsContainer) {
      const emojis = this.resultsContainer.querySelectorAll<HTMLElement>(`.${classes.emoji}`);
      const currentFocusedEmoji = emojis[this.focusedEmojiIndex];
      currentFocusedEmoji.tabIndex = -1;

      this.focusedEmojiIndex = index;
      const newFocusedEmoji = emojis[this.focusedEmojiIndex];
      newFocusedEmoji.tabIndex = 0;
      newFocusedEmoji.focus();
    }
  }

  handleResultsKeydown(event: KeyboardEvent): void {
    if (this.resultsContainer) {
      const emojis = this.resultsContainer.querySelectorAll(`.${classes.emoji}`);
      if (event.key === 'ArrowRight') {
        this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, emojis.length - 1));
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

  async onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Tab' || event.key === 'Shift') {
      return;
    } else if (!this.searchField.value) {
      this.searchAccessory.replaceChildren(this.searchIcon);
      this.events.emit(HIDE_SEARCH_RESULTS);
    } else {
      this.searchAccessory.replaceChildren(this.clearSearchButton);

      const searchResults = fuzzysort
        .go(this.searchField.value, this.emojiData, {
          allowTypo: true,
          limit: 100,
          key: 'name'
        })
        .map(result => result.obj);

      this.events.emit(HIDE_PREVIEW);

      if (searchResults.length) {
        const lazyLoader = new LazyLoader();
        this.resultsContainer = await new EmojiContainer(
          searchResults,
          true,
          this.events,
          this.options,
          lazyLoader
        ).render();
        this.resultsContainer.classList.add(classes.searchResults);

        lazyLoader.observe(this.resultsContainer);

        if (this.resultsContainer) {
          (this.resultsContainer.querySelector(`.${classes.emoji}`) as HTMLElement).tabIndex = 0;
          this.focusedEmojiIndex = 0;

          this.resultsContainer.addEventListener('keydown', event => this.handleResultsKeydown(event));

          this.events.emit(SHOW_SEARCH_RESULTS, this.resultsContainer);
        }
      } else {
        this.events.emit(SHOW_SEARCH_RESULTS, this.notFoundMessage);
      }
    }
  }
}
