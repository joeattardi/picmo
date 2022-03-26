import { View } from './view';
import classes from './Search.scss';

import { icon } from '../icons';

import { EmojiContainer } from './EmojiContainer';

import { renderTemplate } from '../templates';
import searchTemplate from '../templates/search/search.ejs';
import clearSearchButtonTemplate from '../templates/search/clearButton.ejs';
import notFoundTemplate from '../templates/search/notFound.ejs';
import { debounce } from '../util';
import { LazyLoader } from '../LazyLoader';

type SearchOptions = {
  emojisPerRow: number;
};

export class Search extends View {
  private emojisPerRow: number;
  private focusedEmojiIndex = 0;

  private searchIcon: HTMLElement;
  private clearSearchButton: HTMLButtonElement;
  private resultsContainer: EmojiContainer | null;
  private notFoundMessage: NotFoundMessage;

  searchField: HTMLInputElement;

  constructor({ emojisPerRow }: SearchOptions) {
    super({ template: searchTemplate, classes });

    this.emojisPerRow = emojisPerRow;
    this.search = debounce(this.search.bind(this), 200);
  }

  initialize() {
    this.appEvents = {
      'variantPopup:hide': this.handleHidePopup
    }

    this.uiElements = {
      searchField: View.byClass(classes.searchField),
      searchAccessory: View.byClass(classes.searchAccessory)
    };

    this.uiEvents = [
      View.childEvent('searchField', 'keydown', this.onKeyDown),
      View.childEvent('searchField', 'input', this.onSearchInput)
    ];

    super.initialize();
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

    this.clearSearchButton.addEventListener('click', (event: MouseEvent) => this.onClearSearch(event));

    this.searchField = this.ui.searchField as HTMLInputElement;

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
    this.ui.searchAccessory.replaceChildren(accessory);
  }

  clear(): void {
    (this.searchField as HTMLInputElement).value = '';
    this.showSearchIcon();
  }

  focus(): void {
    this.searchField.focus();
  }

  onClearSearch(event: Event): void {
    event.stopPropagation();

    this.searchField.value = '';
    this.resultsContainer?.destroy();
    this.resultsContainer = null;

    this.showSearchIcon();

    this.events.emit('content:show');
    this.searchField.focus();
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

  onSearchInput(event: Event): void {
    if (this.searchField.value) {
      this.showClearSearchButton();
      this.search(this.searchField.value);
    } else {
      this.onClearSearch(event);
    }
  }

  async search(query: string) {
    const searchResults = await this.emojiData.searchEmojis(query, this.customEmojis, this.options.emojiVersion);

    this.events.emit('preview:hide');

    if (searchResults.length) {
      const lazyLoader = new LazyLoader();
      this.resultsContainer = this.viewFactory.create(EmojiContainer, {
        emojis: searchResults,
        showVariants: true
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

class NotFoundMessage extends View {
  constructor() {
    super({ template: notFoundTemplate, classes });
  }
}
