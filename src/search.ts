import fuzzysort from 'fuzzysort';
import { TinyEmitter as Emitter } from 'tiny-emitter';

import classes from './styles';

import Bundle from './i18n';

import { icon } from './icons';

import { EmojiContainer } from './emojiContainer';
import { HIDE_PREVIEW, HIDE_VARIANT_POPUP, SHOW_SEARCH_RESULTS, HIDE_SEARCH_RESULTS } from './events';
import { CustomEmoji } from './types';

import { renderTemplate } from './templates';
import searchTemplate from './templates/search/search.ejs';
import clearSearchButtonTemplate from './templates/search/clearButton.ejs';
import notFoundTemplate from './templates/search/notFound.ejs';

import { LazyLoader } from './lazyLoad';
import { queryByClass } from './util';
import Renderer from './renderers/renderer';

type SearchOptions = {
  events: Emitter;
  i18n: Bundle;
  emojiData: any;
  emojisPerRow: number;
  emojiVersion: string;
  customEmojis: CustomEmoji[];
  renderer: Renderer;
};

export class Search {
  private emojiData: any[];
  private emojisPerRow: number;
  private focusedEmojiIndex = 0;
  private i18n: Bundle;
  private events: Emitter;
  private emojiVersion: string;
  private renderer: Renderer;

  private searchContainer: HTMLElement;
  private searchField: HTMLInputElement;
  private searchAccessory: HTMLElement;
  private searchIcon: HTMLElement;
  private clearSearchButton: HTMLButtonElement;
  private resultsContainer: HTMLElement | null;
  private notFoundMessage: HTMLElement;

  constructor({ events, i18n, emojiData, emojisPerRow, emojiVersion, customEmojis = [], renderer }: SearchOptions) {
    this.emojisPerRow = emojisPerRow;
    this.emojiData = emojiData.filter(e => e.version && parseFloat(e.version) <= parseFloat(emojiVersion));
    this.emojiData = [...this.emojiData, ...customEmojis];
    this.i18n = i18n;
    this.events = events;
    this.emojiVersion = emojiVersion;
    this.renderer = renderer;

    events.on(HIDE_VARIANT_POPUP, () => {
      setTimeout(() => this.setFocusedEmoji(this.focusedEmojiIndex));
    });
  }

  reset(): void {
    this.searchAccessory.replaceChildren(this.searchIcon);
  }

  render(): HTMLElement {
    this.searchIcon = icon('magnifying-glass', { classes: 'fa-fw' });
    this.notFoundMessage = renderTemplate(notFoundTemplate, {
      i18n: this.i18n
    });

    this.searchContainer = renderTemplate(searchTemplate, {
      i18n: this.i18n
    });

    this.clearSearchButton = renderTemplate(clearSearchButtonTemplate, {
      i18n: this.i18n
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

  async onKeyUp(event: KeyboardEvent): Promise<void> {
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
        this.resultsContainer = await new EmojiContainer({
          emojis: searchResults,
          showVariants: true,
          events: this.events,
          i18n: this.i18n,
          emojiVersion: this.emojiVersion,
          renderer: this.renderer
        }).render();

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
