import { ExternalEvent, ExternalEvents } from '../ExternalEvents';

import { View } from './view';
import { EmojiArea } from './EmojiArea';
import { DataError } from './DataError';
import { EmojiPreview } from './Preview';
import { Search } from './Search';
import { VariantPopup } from './VariantPopup';
import { CategoryTabs } from './CategoryTabs';
import { addOrUpdateRecent } from '../recents';
import { DataStore } from '../data/DataStore';
import { EventCallback } from '../events';

import { determineEmojiVersion } from '../emojiSupport';

import { Category, EmojiRecord } from '../types';
import { LATEST_EMOJI_VERSION } from 'emojibase';

import template from './EmojiPicker.template';

import classes from './EmojiPicker.scss';

const variableNames = {
  emojisPerRow: '--emojis-per-row',
  visibleRows: '--row-count',
  emojiSize: '--emoji-size'
};

/**
 * The main emoji picker view. Contains the full picker UI and an event emitter to react to
 * emoji selection events.
 */
export class EmojiPicker extends View {
  pickerReady = false;

  private categories: Category[];

  private categoryTabs: CategoryTabs;
  private search: Search;
  private emojiArea: EmojiArea;
  private preview: EmojiPreview;
  private variantPopup: VariantPopup | null;
  private emojiVersion: number;

  private currentView: View;

  private externalEvents = new ExternalEvents();

  constructor() {
    super({ template, classes });
  }

  initialize() {
    this.uiElements = {
      pickerContent: View.byClass(classes.content),
      header: View.byClass(classes.header)
    };

    this.uiEvents = [
      View.uiEvent('keydown', this.handleKeyDown)
    ];

    this.appEvents = {
      error: this.onError,
      reinitialize: this.reinitialize,
      'data:ready': this.onDataReady,
      'content:show': this.showContent,
      'variantPopup:hide': this.hideVariantPopup,
      'emoji:select': this.selectEmoji
    };

    super.initialize();
  }

  /**
   * Destroys the picker when it is no longer needed.
   * After calling this method, the picker will no longer be usable.
   *
   * @returns a Promise that resolves when the destroy is complete.
   */
  destroy(): void {
    super.destroy();
    this.search?.destroy();
    this.emojiArea.destroy();
    this.categoryTabs?.destroy();
    this.events.removeAll();
    this.externalEvents.removeAll();
  }

  /**
   * Listens for a picker event.
   *
   * @param event The event to listen for
   * @param callback The callback to call when the event is triggered
   */
   addEventListener(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.on(event, callback);
  }

  /**
   * Removes a recent emoji from the picker.
   *
   * @param event The event to stop listening for
   * @param callback The previously bound event listener
   */
  removeEventListener(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.off(event, callback);
  }

  /**
   * Finishes setting up the picker view once the data is ready.
   * This will only be called if the emoji data is available and all
   * emoji picker views have been rendered.
   *
   * This is the last thing to happen before the emoji picker UI becomes visible.
   */
  initializePickerView() {
    if (this.pickerReady) {
      this.showContent();
      this.emojiArea.reset();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    const isShortcut = event.ctrlKey || event.metaKey;
    if (event.key === 's' && isShortcut && this.search) {
      event.preventDefault();
      this.search.focus();
    }
  }

  /**
   * Builds the three sections of the picker:
   *
   * - preview area (if enabled in options)
   * - search area (if enabled in options)
   * - emoji area (always shown)
   *
   * @returns an array containing the three child views. The preview and search
   *          views are optional, and will be undefined if they are not enabled.
   */
  private buildChildViews(): [EmojiPreview, Search, EmojiArea, CategoryTabs] {
    if (this.options.showPreview) {
      this.preview = this.viewFactory.create(EmojiPreview);
    }

    if (this.options.showSearch) {
      this.search = this.viewFactory.create(Search, {
        categories: this.categories,
        emojiVersion: this.emojiVersion
      });
    }

    if (this.options.showCategoryTabs) {
      this.categoryTabs = this.viewFactory.create(CategoryTabs, {
        categories: this.categories
      });
    }

    this.currentView = this.emojiArea = this.viewFactory.create(EmojiArea, {
      categoryTabs: this.categoryTabs,
      categories: this.categories,
      emojiVersion: this.emojiVersion
    });

    return [this.preview, this.search, this.emojiArea, this.categoryTabs];
  }

  /**
   * Sets any CSS variables corresponding to options that were set.
   */
  private setStyleProperties() {
    if (!this.options.showSearch) {
      this.el.style.setProperty('--search-height-full', '0px');
    }

    if (!this.options.showCategoryTabs) {
      this.el.style.setProperty('--category-tabs-height', '0px');
      this.el.style.setProperty('--category-tabs-offset', '0px');
    }

    if (!this.options.showPreview) {
      this.el.style.setProperty('--emoji-preview-height-full', '0px');
    }

    Object.keys(variableNames).forEach(key => {
      if (this.options[key]) {
        this.el.style.setProperty(variableNames[key], this.options[key].toString());
      }
    });
  }

  private reinitialize() {
    this.renderSync();
  }

  private onError(error: Error) {
    const errorView = this.viewFactory.create(DataError, { message: this.i18n.get('error.load') });
    const height = this.el.offsetHeight || 375;
    this.el.style.height = `${height}px`;
    this.el.replaceChildren(errorView.renderSync());
    throw error;
  }

  /**
   * Called when the emoji database is ready to be used.
   *
   * This will replace the loader placeholder with the full picker UI.
   */
  private async onDataReady(db: DataStore) {
    // Save the current el so we can replace it in the DOM after the new render.
    const currentView = this.el;

    try {
      if (db) {
        this.emojiData = db;
      } else {
        await this.emojiDataPromise;
      }

      if (this.options.emojiVersion === 'auto') {
        this.emojiVersion = determineEmojiVersion() || parseFloat(LATEST_EMOJI_VERSION);
      } else {
        this.emojiVersion = this.options.emojiVersion;
      }

      this.categories = await this.emojiData.getCategories(this.options);

      const [preview, search, emojiArea, categoryTabs] = this.buildChildViews();

      await super.render({
        isLoaded: true,
        search,
        categoryTabs,
        emojiArea,
        preview,
        showHeader: Boolean(this.search || this.categoryTabs),
        theme: this.options.theme,
        className: this.options.className
      });

      this.el.style.setProperty('--category-count', this.categories.length.toString());

      this.pickerReady = true;

      currentView.replaceWith(this.el);
      this.setStyleProperties();
      this.initializePickerView();

      this.setInitialFocus();

      this.externalEvents.emit('data:ready');
    } catch (error) {
      this.events.emit('error', error);
    }
  }

  /**
   * Renders the picker.
   *
   * @returns the root element of the picker
   */
  renderSync(): HTMLElement {
    super.renderSync({
      isLoaded: false,
      theme: this.options.theme,
      showSearch: this.options.showSearch,
      showPreview: this.options.showPreview,
      showCategoryTabs: this.options.showCategoryTabs,
      showHeader: this.options.showSearch || this.options.showCategoryTabs,
      emojiCount: this.options.emojisPerRow * this.options.visibleRows
    });

    if (!this.options.rootElement) {
      throw new Error('Picker must be given a root element via the rootElement option');
    }
    
    this.options.rootElement.replaceChildren(this.el);
    this.setStyleProperties();

    if (this.pickerReady) {
      this.initializePickerView();
    }

    return this.el;
  }

  /**
   * Sets the initial autofocus, depending on options.
   */
  setInitialFocus() {
    if (!this.pickerReady) {
      return;
    }

    if (this.search && this.options.autoFocusSearch) {
      this.search.focus();
    } else {
      this.emojiArea.focusableEmoji.focus();
    }
  }

  /**
   * Resets the picker to its default, "inactive" state.
   */
  reset() {
    if (this.pickerReady) {
      this.emojiArea.reset();
      this.showContent(this.emojiArea);
    }

    if (this.search) {
      this.search.clear();
    }
  }

  /**
   * Shows content in the main picker content area.
   * If no View is specified, the built-in emoji area will be shown.
   *
   * The currently shown view will be removed from the DOM and destroyed.
   *
   * @param content The View to show
   */
  private showContent(content: View = this.emojiArea) {
    if (content === this.currentView) {
      return;
    }

    if (this.currentView !== this.emojiArea) {
      this.currentView?.destroy();
    }

    this.ui.pickerContent.classList.toggle(classes.fullHeight, content !== this.emojiArea);
    this.ui.pickerContent.replaceChildren(content.el);
    this.currentView = content;

    if (content === this.emojiArea) {
      this.emojiArea.reset();
      if (this.categoryTabs) {
        this.ui.header.appendChild(this.categoryTabs.el);
      }
    } else {
      this.categoryTabs?.el.remove();
    }
  }

  /**
   * Closes and destroys the variant popup.
   */
  private hideVariantPopup() {
    this.variantPopup?.destroy();
  }

  /**
   * Given a mouse event, determines if the event occurred on the picker or one of its components.
   *
   * @param event The mouse event
   * @returns true if the click should be treated as on the picker, false otherwise
   */
  isPickerClick(event: MouseEvent) {
    const clickedNode = event.target as Node;

    const isClickInsidePicker = this.el.contains(clickedNode);
    const isClickOnVariantPopup = this.variantPopup?.el?.contains(clickedNode);

    return isClickInsidePicker || isClickOnVariantPopup;
  }

  /**
   * Handles a click on an emoji.
   * @param emoji The emoji that was clicked
   * @returns a Promise that resolves when either the variant popup is shown or the emoji is rendered and emitted
   */
  private async selectEmoji({ emoji }: { emoji: EmojiRecord }): Promise<void> {
    // Show the variant popup if the emoji has variants
    if (emoji.skins?.length && this.options.showVariants && !this.isVariantPopupOpen) {
      this.showVariantPopup(emoji);
    } else {
      await this.variantPopup?.animateHide();
      this.events.emit('variantPopup:hide');
      await this.emitEmoji(emoji);
    }
  }

  private get isVariantPopupOpen() {
    return this.variantPopup && !this.variantPopup.isDestroyed;
  }

  /**
   * Shows the variant popup for an emoji.
   *
   * @param emoji The emoji whose variants are to be shown.
   * @returns a Promise that resolves when the popup is shown
   */
  private async showVariantPopup(emoji: EmojiRecord): Promise<void> {
    const currentFocus = document.activeElement as HTMLElement;
    this.events.once('variantPopup:hide', () => {
      currentFocus?.focus();
    });

    this.variantPopup = this.viewFactory.create(VariantPopup, { emoji, parent: this.el });
    this.el.appendChild(this.variantPopup.renderSync());
    this.variantPopup.activate();
  }

  /**
   * Renders an emoji, and emits a public emoji:select event with the rendered result.
   * @param emoji the emoji that was selected.
   */
  private async emitEmoji(emoji: EmojiRecord): Promise<void> {
    this.externalEvents.emit('emoji:select', await this.renderer.doEmit(emoji));
    addOrUpdateRecent(emoji, this.options.maxRecents);
    this.events.emit('recent:add', emoji);
  }
}
