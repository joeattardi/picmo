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
import { Category } from '../types';

type SearchOptions = {
  categories: Category[];
  emojiVersion: number;
};

export class Search extends View {
  private categories: Category[];
  private emojiVersion: number;

  private searchIcon: HTMLElement;
  private clearSearchButton: HTMLButtonElement;
  private resultsContainer: EmojiContainer | null;
  private notFoundMessage: NotFoundMessage;

  searchField: HTMLInputElement;

  constructor({ categories, emojiVersion }: SearchOptions) {
    super({ template: searchTemplate, classes });

    this.categories = categories.filter((category: Category) => category.key !== 'recents');
    this.emojiVersion = emojiVersion;

    this.search = debounce(this.search.bind(this), 100);
  }

  initialize() {
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
      this.search();
    } else {
      this.onClearSearch(event);
    }
  }

  async search() {
    if (!this.searchField.value) {
      return;
    }

    const searchResults = await this.emojiData.searchEmojis(
      this.searchField.value,
      this.customEmojis, 
      this.emojiVersion,
      this.categories
    );

    this.events.emit('preview:hide');

    if (searchResults.length) {
      const lazyLoader = new LazyLoader();
      this.resultsContainer = this.viewFactory.create(EmojiContainer, {
        emojis: searchResults,
        fullHeight: true,
        showVariants: true,
        lazyLoader
      });

      await this.resultsContainer.render();
      if (this.resultsContainer?.el) {
        this.resultsContainer.el.classList.add(classes.searchResults);
        lazyLoader.observe(this.el.parentElement as HTMLElement);
        this.resultsContainer.setActive(true, { row: 0, offset: 0}, false);
        // this.resultsContainer.emojiElements[0].tabIndex = 0;
        // this.focusedEmojiIndex = 0;

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
