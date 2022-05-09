import { View } from './view';
import classes from './Search.scss';

import { icon } from '../icons';

import { EmojiContainer } from './EmojiContainer';
import { ErrorMessage } from './ErrorMessage';

import { debounce } from '../util';
import { LazyLoader } from '../LazyLoader';
import { Category } from '../types';

import { clearSearchButtonTemplate, searchTemplate } from './Search.template';

type SearchOptions = {
  categories: Category[];
  emojiVersion: number;
};

export class Search extends View {
  private categories: Category[];
  private emojiVersion: number;

  private searchIcon: Element;
  private clearSearchButton: HTMLButtonElement;
  private resultsContainer: EmojiContainer | null;
  private notFoundMessage: ErrorMessage;
  private errorMessage: ErrorMessage;

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

    this.searchIcon = icon('search');

    this.notFoundMessage = this.viewFactory.create(ErrorMessage, { 
      message: this.i18n.get('search.notFound'),
      className: classes.notFound,
      icon: 'sad' 
    });
    this.notFoundMessage.renderSync();

    this.errorMessage = this.viewFactory.create(ErrorMessage, { message: this.i18n.get('search.error') });
    this.errorMessage.renderSync();

    this.clearSearchButton = clearSearchButtonTemplate.render({
      classes,
      i18n: this.i18n
    }) as HTMLButtonElement;

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

  private showSearchAccessory(accessory: Element) {
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
    } else if ((event.key === 'Enter' || event.key === 'ArrowDown') && this.resultsContainer) {
      event.preventDefault();
      this.resultsContainer.el.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
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

    try {
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

        this.resultsContainer.renderSync();
        if (this.resultsContainer?.el) {
          lazyLoader.observe(this.resultsContainer.el);
          this.resultsContainer.setActive(true, { row: 0, offset: 0}, false);

          this.resultsContainer.el.addEventListener('keydown', event => this.handleResultsKeydown(event));

          this.events.emit('content:show', this.resultsContainer);
        }
      } else {
        this.events.emit('content:show', this.notFoundMessage);
      }
    } catch (error) {
      this.events.emit('content:show', this.errorMessage);
    }
  }
}
