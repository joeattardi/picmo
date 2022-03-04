import { View } from './view';
import classes from './Search.scss';

import { icon } from '../icons';

import { EmojiContainer } from './EmojiContainer';
import { CustomEmoji } from '../types';

import { renderTemplate } from '../templates';
import searchTemplate from 'templates/search/search.ejs';
import clearSearchButtonTemplate from 'templates/search/clearButton.ejs';
import notFoundTemplate from 'templates/search/notFound.ejs';

import { LazyLoader } from '../LazyLoader';
import { queryByClass } from '../util';

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
  private notFoundMessage: NotFoundMessage;

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

  async render(): Promise<HTMLElement> {
    await super.render();

    this.searchIcon = icon('magnifying-glass', { classes: 'fa-fw' });
    this.notFoundMessage = this.viewFactory.create(NotFoundMessage);
    await this.notFoundMessage.render();

    this.clearSearchButton = await renderTemplate(clearSearchButtonTemplate, {
      classes,
      i18n: this.i18n
    });

    this.searchField = queryByClass(this.el, classes.searchField);
    this.searchAccessory = queryByClass(this.el, classes.searchAccessory);

    this.clearSearchButton.addEventListener('click', (event: MouseEvent) => this.onClearSearch(event));
    this.searchField.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
    this.searchField.addEventListener('keyup', event => this.onKeyUp(event));

    this.showSearchIcon();

    return this.el;
  }

  private showSearchIcon() {
    this.showSearchAccessory(this.searchIcon);
  }

  private showClearSearchButton() {
    this.showSearchAccessory(this.clearSearchButton);
  }

  private showSearchAccessory(accessory: HTMLElement) {
    this.searchAccessory.replaceChildren(accessory);
  }

  clear(): void {
    this.searchField.value = '';
    this.showSearchIcon();
  }

  focus(): void {
    this.searchField.focus();
  }

  onClearSearch(event: Event): void {
    event.stopPropagation();

    if (this.searchField.value) {
      this.searchField.value = '';
      this.resultsContainer = null;

      this.showSearchIcon();

      this.events.emit('content:show');

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
      this.showSearchIcon();
      this.events.emit('content:show');
    } else {
      this.showClearSearchButton();

      const searchResults = this.emojiData
        .filter(emoji => emoji.name.toLowerCase().includes(this.searchField.value.toLowerCase()));

      this.events.emit('preview:hide');

      if (searchResults.length) {
        const lazyLoader = new LazyLoader();
        this.resultsContainer = this.viewFactory.create(EmojiContainer, {
          emojis: searchResults,
          showVariants: true,
          emojiVersion: this.emojiVersion,
        });

        await this.resultsContainer.render();
        if (this.resultsContainer?.el) {
          this.resultsContainer.el.classList.add(classes.searchResults);
          lazyLoader.observe(this.resultsContainer.el);
          this.resultsContainer.emojiElements[0].tabIndex = 0;
          this.focusedEmojiIndex = 0;

          this.resultsContainer.el.addEventListener('keydown', event => this.handleResultsKeydown(event));

          this.events.emit('content:show', this.resultsContainer);
        }
      } else {
        this.events.emit('content:show', this.notFoundMessage);
      }
    }
  }
}

class NotFoundMessage extends View {
  constructor() {
    super({ template: notFoundTemplate, classes });
  }
}
