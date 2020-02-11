import emojiData, { categories } from './data/emoji.js';

import { EmojiContainer } from './emojiContainer';
import { EMOJI, HIDE_VARIANT_POPUP } from './events';
import { load } from './recent';
import { i18n as defaultI18n } from './i18n';
import * as icons from './icons';
import { createElement } from './util';

const CLASS_ACTIVE_TAB = 'active';
const CLASS_TABS_CONTAINER = 'emoji-picker__tabs-container';
const CLASS_TABS = 'emoji-picker__tabs';
const CLASS_TAB = 'emoji-picker__tab';
const CLASS_TAB_BODY = 'emoji-picker__tab-body';

const EMOJIS_PER_ROW = 8;

const emojiCategories = {};
emojiData.forEach(emoji => {
  let categoryList = emojiCategories[categories[emoji.c]];
  if (!categoryList) {
    categoryList = emojiCategories[categories[emoji.c]] = [];
  }

  categoryList.push(emoji);
});

const categoryIcons = {
  smileys: icons.smile,
  animals: icons.cat,
  food: icons.coffee,
  activities: icons.futbol,
  travel: icons.building,
  objects: icons.lightbulb,
  symbols: icons.music,
  flags: icons.flag
};

export class Tabs {
  constructor(events, i18n, options) {
    this.events = events;
    this.i18n = i18n;
    this.options = options;

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(index, animate = true) {
    if (index === this.activeTab) {
      return;
    }

    const currentActiveTab = this.activeTab;
    const newActiveTabBody = this.tabBodies[index].container;

    if (currentActiveTab >= 0) {
      this.tabs[currentActiveTab].setActive(false);
      this.tabBodies[currentActiveTab].setActive(false);

      const currentActiveTabBody = this.tabBodies[currentActiveTab].container;
      currentActiveTabBody
        .querySelectorAll('.emoji-picker__emoji')
        .forEach(emoji => (emoji.tabIndex = -1));

      const activeEmojiContainer = newActiveTabBody.querySelector(
        '.emoji-picker__emojis'
      );
      activeEmojiContainer.scrollTop = 0;
      activeEmojiContainer.querySelector('.emoji-picker__emoji').tabIndex = 0;
      this.focusedEmojiIndex = 0;

      if (animate) {
        if (index > currentActiveTab) {
          this.transitionTabs(newActiveTabBody, currentActiveTabBody, 25, -25);
        } else {
          this.transitionTabs(newActiveTabBody, currentActiveTabBody, -25, 25);
        }
      }
    }

    this.activeTab = index;
    this.tabBodies[this.activeTab].setActive(true);
    this.tabs[this.activeTab].setActive(true);
  }

  transitionTabs(
    newActiveTabBody,
    currentActiveTabBody,
    newTranslate,
    currentTranslate
  ) {
    requestAnimationFrame(() => {
      newActiveTabBody.style.transition = 'none';
      newActiveTabBody.style.transform = `translateX(${newTranslate}rem)`;
      requestAnimationFrame(() => {
        currentActiveTabBody.style.transform = `translateX(${currentTranslate}rem)`;
        newActiveTabBody.style.transition = 'transform 0.25s';
        requestAnimationFrame(() => {
          newActiveTabBody.style.transform = 'translateX(0)';
        });
      });
    });
  }

  render() {
    const tabsContainer = createElement('div', CLASS_TABS_CONTAINER);
    tabsContainer.appendChild(this.createTabs());
    tabsContainer.appendChild(this.createTabBodies());

    const initialActiveTab = this.options.showRecents ? 1 : 0;
    this.setActiveTab(initialActiveTab, false);
    this.tabBodies[initialActiveTab].content.querySelector(
      '.emoji-picker__emoji'
    ).tabIndex = 0;
    this.focusedEmojiIndex = 0;

    return tabsContainer;
  }

  setFocusedEmoji(index) {
    const emojis = this.tabBodies[this.activeTab].content.querySelectorAll(
      '.emoji-picker__emoji'
    );
    const currentFocusedEmoji = emojis[this.focusedEmojiIndex];
    currentFocusedEmoji.tabIndex = -1;

    this.focusedEmojiIndex = index;
    const newFocusedEmoji = emojis[this.focusedEmojiIndex];
    newFocusedEmoji.tabIndex = 0;
    newFocusedEmoji.focus();
  }

  createTabs() {
    this.tabsList = createElement('ul', CLASS_TABS);
    this.tabs = Object.keys(categoryIcons).map(
      (category, index) =>
        new Tab(
          categoryIcons[category],
          this.options.showRecents ? index + 1 : index,
          this.setActiveTab
        )
    );

    if (this.options.showRecents) {
      const recentTab = new Tab(icons.history, 0, this.setActiveTab);
      this.tabs.splice(0, 0, recentTab);
    }

    this.tabs.forEach(tab => this.tabsList.appendChild(tab.render()));

    this.tabsList.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        this.setActiveTab(
          this.activeTab === 0 ? this.tabs.length - 1 : this.activeTab - 1
        );
      } else if (event.key === 'ArrowRight') {
        this.setActiveTab((this.activeTab + 1) % this.tabs.length);
      }
    });

    return this.tabsList;
  }

  createTabBodies() {
    this.tabBodyContainer = createElement('div');

    this.tabBodies = Object.keys(categoryIcons).map(
      (category, index) =>
        new TabBody(
          this.i18n.categories[category] || defaultI18n.categories[category],
          new EmojiContainer(
            emojiCategories[category],
            true,
            this.events,
            this.options
          ).render(),
          this.options.showRecents ? index + 1 : index
        )
    );

    this.tabBodyContainer.addEventListener('keydown', event => {
      const emojis = this.tabBodies[this.activeTab].content.querySelectorAll(
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
        if (this.focusedEmojiIndex < emojis.length - EMOJIS_PER_ROW) {
          this.setFocusedEmoji(this.focusedEmojiIndex + EMOJIS_PER_ROW);
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.focusedEmojiIndex >= EMOJIS_PER_ROW) {
          this.setFocusedEmoji(this.focusedEmojiIndex - EMOJIS_PER_ROW);
        }
      }
    });

    this.events.on(HIDE_VARIANT_POPUP, () => {
      setTimeout(() => this.setFocusedEmoji(this.focusedEmojiIndex));
    });

    this.events.on(EMOJI, ({ button }) => {
      this.setFocusedEmoji(Array.prototype.indexOf.call(button.parentElement.children, button));
    });

    if (this.options.showRecents) {
      const recentTabBody = new TabBody(
        this.i18n.categories.recents || defaultI18n.categories.recents,
        new EmojiContainer(load(), false, this.events, this.options).render(),
        0
      );
      this.tabBodies.splice(0, 0, recentTabBody);

      this.events.on(EMOJI, () => {
        const newRecents = new TabBody(
          this.i18n.categories.recents || defaultI18n.categories.recents,
          new EmojiContainer(load(), false, this.events, this.options).render(),
          0
        );

        const newRecentsEl = newRecents.render();
        if (this.activeTab === 0) {
          newRecentsEl.style.transform = 'translateX(0)';
        }

        setTimeout(() => {
          this.tabBodyContainer.replaceChild(
            newRecentsEl,
            this.tabBodyContainer.firstChild
          );

          this.tabBodies[0] = newRecents;
          if (this.activeTab === 0) {
            this.setActiveTab(0);
          }
        });
      });
    }

    this.tabBodies.forEach(tabBody =>
      this.tabBodyContainer.appendChild(tabBody.render())
    );

    return this.tabBodyContainer;
  }
}

class Tab {
  constructor(icon, index, setActiveTab) {
    this.icon = icon;
    this.index = index;
    this.setActiveTab = setActiveTab;
  }

  render() {
    this.tab = createElement('li', CLASS_TAB);
    this.tab.innerHTML = this.icon;

    this.tab.addEventListener('click', () => this.setActiveTab(this.index));

    return this.tab;
  }

  setActive(active) {
    if (active) {
      this.tab.classList.add(CLASS_ACTIVE_TAB);
      this.tab.tabIndex = 0;
      this.tab.focus();
    } else {
      this.tab.classList.remove(CLASS_ACTIVE_TAB);
      this.tab.tabIndex = -1;
    }
  }
}

class TabBody {
  constructor(category, content, index) {
    this.category = category;
    this.content = content;
    this.index = index;
  }

  render() {
    this.container = createElement('div', CLASS_TAB_BODY);

    const title = createElement('h2');
    title.innerHTML = this.category;

    this.container.appendChild(title);
    this.container.appendChild(this.content);

    return this.container;
  }

  setActive(active) {
    if (active) {
      this.container.classList.add(CLASS_ACTIVE_TAB);
    } else {
      this.container.classList.remove(CLASS_ACTIVE_TAB);
    }
  }
}
