import { ExternalEvent, ExternalEvents } from '../ExternalEvents';

import { View } from './view';
import { EmojiArea } from './EmojiArea';
import { EmojiPreview } from './Preview';
import { Search } from './Search';
import { VariantPopup } from './VariantPopup';
import { CategoryTabs } from './CategoryTabs';
import { addOrUpdateRecent } from '../recents';
import { EventCallback } from '../events';
import { Bundle } from '../i18n';

import template from '../templates/emojiPicker.ejs';
import classes from './EmojiPicker.scss';
import { Category, CategoryKey, EmojiRecord } from '../types';

const variableNames = {
  emojisPerRow: '--emojis-per-row',
  visibleRows: '--row-count',
  emojiSize: '--emoji-size'
};

// TODO: put these two extra categories in the database and just grab them that way?
function createCategory(key: CategoryKey, i18n: Bundle, order: number): Category {
  return {
    key,
    order,
    message: i18n.get(`categories.${key}`)
  };
}

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

  private currentView: View;

  private externalEvents = new ExternalEvents();

  constructor() {
    super({ template, classes });
  }

  initialize() {
    this.uiElements = {
      pickerContent: View.byClass(classes.content)
    };

    this.appEvents = {
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
   * @returns a Promise that resolves when the close/destroy is complete.
   */
  async destroy(): Promise<void> {
    super.destroy();
    this.events.removeAll();
    this.externalEvents.removeAll();
  }

  /**
   * Listens for a picker event.
   * 
   * @param event The event to listen for
   * @param callback The callback to call when the event is triggered
   */
  on(event: ExternalEvent, callback: EventCallback) {
    this.externalEvents.on(event, callback);
  }

  /**
   * Removes a recent emoji from the picker.
   * 
   * @param event The event to stop listening for
   * @param callback The previously bound event listener
   */
  off(event: ExternalEvent, callback: EventCallback) {
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
        categories: this.categories
      });
    }

    if (this.options.showCategoryTabs) {
      this.categoryTabs = this.viewFactory.create(CategoryTabs, {
        categories: this.categories
      });
    }

    this.currentView = this.emojiArea = this.viewFactory.create(EmojiArea, {
      categoryTabs: this.categoryTabs,
      categories: this.categories
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

  /**
   * Called when the emoji database is ready to be used.
   * 
   * This will replace the loader placeholder with the full picker UI.
   */
  private async onDataReady() {
    // Save the current el so we can replace it in the DOM after
    // the new render.
    const currentView = this.el;

    await this.emojiDataPromise;
    this.categories = await this.emojiData.getCategories(this.options.categories);

    if (this.options.showRecents) {
      this.categories.unshift(createCategory('recents', this.i18n, -1));
    }

    if (this.options.custom?.length) {
      this.categories.push(createCategory('custom', this.i18n, 10));
    }

    const [preview, search, emojiArea, categoryTabs] = this.buildChildViews();

    await super.render({
      isLoaded: true,
      search,
      categoryTabs,
      emojiArea,
      preview,
      theme: this.options.theme
    });

    this.el.style.setProperty('--category-count', this.categories.length.toString());

    this.pickerReady = true;

    currentView.replaceWith(this.el);
    this.setStyleProperties();
    this.initializePickerView();

    this.setInitialFocus();

    this.externalEvents.emit('data:ready');
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
      emojiCount: this.options.emojisPerRow * this.options.visibleRows
    });

    this.options.rootElement.appendChild(this.el);
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
  private showContent(content = this.emojiArea) {
    if (content === this.currentView) {
      return;
    }

    if (this.currentView !== this.emojiArea) {
      this.currentView?.destroy();
    }

    if (content === this.emojiArea) {
      this.emojiArea.reset();
      if (this.categoryTabs) {
        this.el.insertBefore(this.categoryTabs.el, this.ui.pickerContent);
      }
    } else {
      this.categoryTabs?.el.remove();
    }

    this.ui.pickerContent.classList.toggle(classes.fullHeight, content !== this.emojiArea);
    this.ui.pickerContent.replaceChildren(content.el);
    this.currentView = content;
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
    if (emoji.skins && this.options.showVariants && !this.isVariantPopupOpen) {
      this.showVariantPopup(emoji);
    } else {
      this.hideVariantPopup();
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
    this.variantPopup = this.viewFactory.create(VariantPopup, { emoji });
    this.el.appendChild(await this.variantPopup.render());
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
