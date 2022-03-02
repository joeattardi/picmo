import fuzzysort from 'fuzzysort';

import { View } from './view';
import classes from './search.scss';

import { icon } from './icons';

import { EmojiContainer } from './emojiContainer';
import { CustomEmoji } from './types';

import { renderTemplate } from './templates';
import searchTemplate from './templates/search/search.ejs';
import clearSearchButtonTemplate from './templates/search/clearButton.ejs';
import notFoundTemplate from './templates/search/notFound.ejs';

import { LazyLoader } from './lazyLoad';
import { queryByClass } from './util';

type SearchOptions = {
  emojiData: any;
  emojisPerRow: number;
  emojiVersion: string;
  customEmojis: CustomEmoji[];
};

export class Search extends View {
  private emojiData: any[];
  private emojisPerRow: number;
  private focusedEmojiIndex = 0;
  private emojiVersion: string;

  private searchAccessory: HTMLElement;
  private searchIcon: HTMLElement;
  private clearSearchButton: HTMLButtonElement;
  private resultsContainer: EmojiContainer | null;
  private notFoundMessage: HTMLElement;

  searchField: HTMLInputElement;

  constructor({ emojiData, emojisPerRow, emojiVersion, customEmojis = [] }: SearchOptions) {
    super({ template: searchTemplate, classes });

    this.emojisPerRow = emojisPerRow;
    this.emojiData = emojiData.filter(e => e.version && parseFloat(e.version) <= parseFloat(emojiVersion));
    this.emojiData = [...this.emojiData, ...customEmojis];
    this.emojiVersion = emojiVersion;
  }

  initialize() {
      this.appEvents = {
        'variantPopup:hide': this.handleHidePopup
      }
  }

  handleHidePopup() {
    setTimeout(() => this.setFocusedEmoji(this.focusedEmojiIndex));
  }

  reset(): void {
    this.searchAccessory.replaceChildren(this.searchIcon);
  }

  async render(): Promise<HTMLElement> {
    await super.render();

    this.searchIcon = icon('magnifying-glass', { classes: 'fa-fw' });
    this.notFoundMessage = renderTemplate(notFoundTemplate, {
      classes,
      i18n: this.i18n
    });

    this.clearSearchButton = renderTemplate(clearSearchButtonTemplate, {
      classes,
      i18n: this.i18n
    });

    this.searchField = queryByClass(this.el, classes.searchField);
    this.searchAccessory = queryByClass(this.el, classes.searchAccessory);

    this.clearSearchButton.addEventListener('click', (event: MouseEvent) => this.onClearSearch(event));
    this.searchField.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
    this.searchField.addEventListener('keyup', event => this.onKeyUp(event));

    this.searchAccessory.replaceChildren(this.searchIcon);

    return this.el;
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

      this.events.emit('searchResults:hide');

      // TODO: Find out why button steals focus on Escape key
      setTimeout(() => this.searchField.focus());
    }
  }

  setFocusedEmoji(index: number): void {
    if (this.resultsContainer) {
      const emojis = this.resultsContainer.emojiElements;
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
      // const emojis = this.resultsContainer.querySelectorAll(`.${classes.emoji}`);
      // if (event.key === 'ArrowRight') {
      //   this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, emojis.length - 1));
      // } else if (event.key === 'ArrowLeft') {
      //   this.setFocusedEmoji(Math.max(0, this.focusedEmojiIndex - 1));
      // } else if (event.key === 'ArrowDown') {
      //   event.preventDefault();
      //   if (this.focusedEmojiIndex < emojis.length - this.emojisPerRow) {
      //     this.setFocusedEmoji(this.focusedEmojiIndex + this.emojisPerRow);
      //   }
      // } else if (event.key === 'ArrowUp') {
      //   event.preventDefault();
      //   if (this.focusedEmojiIndex >= this.emojisPerRow) {
      //     this.setFocusedEmoji(this.focusedEmojiIndex - this.emojisPerRow);
      //   }
      // } else if (event.key === 'Escape') {
      if (event.key === 'Escape') {
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
      this.events.emit('searchResults:hide');
    } else {
      this.searchAccessory.replaceChildren(this.clearSearchButton);

      const searchResults = fuzzysort
        .go(this.searchField.value, this.emojiData, {
          allowTypo: true,
          limit: 100,
          key: 'name'
        })
        .map(result => result.obj);

      this.events.emit('preview:hide');

      if (searchResults.length) {
        const lazyLoader = new LazyLoader();
        this.resultsContainer = this.viewFactory.create(EmojiContainer, {
          emojis: searchResults,
          showVariants: true,
          emojiVersion: this.emojiVersion,
        });

        await this.resultsContainer.render();
        this.resultsContainer.el.classList.add(classes.searchResults);
        lazyLoader.observe(this.resultsContainer.el);

        if (this.resultsContainer) {
          this.resultsContainer.emojiElements[0].tabIndex = 0;
          this.focusedEmojiIndex = 0;

          this.resultsContainer.el.addEventListener('keydown', event => this.handleResultsKeydown(event));

          this.events.emit('searchResults:show', this.resultsContainer);
        }
      } else {
        this.events.emit('searchResults:show', this.notFoundMessage);
      }
    }
  }
}
