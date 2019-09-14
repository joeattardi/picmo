import emojiData, { categories } from "./data/emoji.js";

import { EmojiContainer } from "./emojiContainer";
import { load } from "./recent";
import * as icons from "./icons";
import { createElement } from "./util";

const CLASS_ACTIVE_TAB = "active";
const CLASS_TABS_CONTAINER = "emoji-picker__tabs-container";
const CLASS_TABS = "emoji-picker__tabs";
const CLASS_TAB = "emoji-picker__tab";
const CLASS_TAB_BODY = "emoji-picker__tab-body";

const emojiCategories = {};
emojiData.forEach(emoji => {
  let categoryList = emojiCategories[categories[emoji.c]];
  if (!categoryList) {
    categoryList = emojiCategories[categories[emoji.c]] = [];
  }

  categoryList.push(emoji);
});

const categoryIcons = {
  "Smileys & People": icons.smile,
  "Animals & Nature": icons.cat,
  "Food & Drink": icons.coffee,
  Activities: icons.futbol,
  "Travel & Places": icons.building,
  Objects: icons.lightbulb,
  Symbols: icons.music,
  Flags: icons.flag
};

export class Tabs {
  constructor(events) {
    this.events = events;
    this.activeTab = 1;

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(index) {
    if (this.activeTab >= 0) {
      this.tabBodies[this.activeTab].setActive(false);
      this.tabs[this.activeTab].setActive(false);
    }

    this.activeTab = index;

    this.tabBodies[this.activeTab].setActive(true);
    this.tabs[this.activeTab].setActive(true);
  }

  render() {
    const tabsContainer = createElement("div", CLASS_TABS_CONTAINER);
    tabsContainer.appendChild(this.createTabs());
    tabsContainer.appendChild(this.createTabBodies());

    this.setActiveTab(1);

    return tabsContainer;
  }

  createTabs() {
    this.tabsList = createElement("ul", CLASS_TABS);
    this.tabs = Object.keys(categoryIcons).map(
      (category, index) =>
        new Tab(categoryIcons[category], index + 1, this.setActiveTab)
    );

    const recentTab = new Tab(icons.history, 0, this.setActiveTab);
    this.tabs.splice(0, 0, recentTab);

    this.tabs.forEach(tab => this.tabsList.appendChild(tab.render()));

    return this.tabsList;
  }

  createTabBodies() {
    this.tabBodyContainer = createElement("div");

    this.tabBodies = Object.keys(categoryIcons).map(
      (category, index) =>
        new TabBody(
          category,
          new EmojiContainer(
            emojiCategories[category],
            true,
            this.events
          ).render(),
          index + 1
        )
    );

    const recentTabBody = new TabBody(
      "Recently Used",
      new EmojiContainer(load(), false, this.events).render(),
      0
    );
    this.tabBodies.splice(0, 0, recentTabBody);

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
    this.tab = createElement("li", CLASS_TAB);
    this.tab.innerHTML = this.icon;

    this.tab.addEventListener("click", () => this.setActiveTab(this.index));

    return this.tab;
  }

  setActive(active) {
    if (active) {
      this.tab.classList.add(CLASS_ACTIVE_TAB);
    } else {
      this.tab.classList.remove(CLASS_ACTIVE_TAB);
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
    this.container = createElement("div", CLASS_TAB_BODY);

    const title = createElement("h2");
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
