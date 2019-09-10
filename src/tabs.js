import emojiData, { categories } from './data/emoji.js';

import { renderEmojiContainer } from './emojiContainer';
import { load } from './recent';
import * as icons from './icons';
import { createElement } from './util';

const CLASS_ACTIVE_TAB = 'active';
const CLASS_TABS_CONTAINER = 'emoji-picker__tabs-container';
const CLASS_TABS = 'emoji-picker__tabs';
const CLASS_TAB = 'emoji-picker__tab';
const CLASS_TAB_BODY = 'emoji-picker__tab-body';

const emojiCategories = {};
emojiData.forEach(emoji => {
  let categoryList = emojiCategories[categories[emoji.c]];
  if (!categoryList) {
    categoryList = emojiCategories[categories[emoji.c]] = [];
  }

  categoryList.push(emoji);
});

const categoryIcons = {
  'Smileys & People': icons.smile,
  'Animals & Nature': icons.cat,
  'Food & Drink': icons.coffee,
  'Activities': icons.futbol,
  'Travel & Places': icons.building,
  'Objects': icons.lightbulb,
  'Symbols': icons.music,
  'Flags': icons.flag
};

export function renderTabs(events) {
  function setActiveTab(index) {
    tabBodyContainer.children[activeTab].classList.remove(CLASS_ACTIVE_TAB);
    tabs.children[activeTab].classList.remove(CLASS_ACTIVE_TAB);

    activeTab = index;

    tabBodyContainer.children[activeTab].classList.add(CLASS_ACTIVE_TAB);
    tabs.children[activeTab].classList.add(CLASS_ACTIVE_TAB);
  }

  function renderTab(index, content) {
    const tab = createElement('li', CLASS_TAB);
    tab.addEventListener('click', () => setActiveTab(index));
    tab.innerHTML = content;
  
    return tab;
  }

  const tabsContainer = createElement('div', CLASS_TABS_CONTAINER);

  const tabs = createElement('ul', CLASS_TABS);
  let activeTab = 1;

  const recentTab = renderTab(0, icons.history);
  tabs.appendChild(recentTab);

  Object.keys(categoryIcons).forEach((category, index) => {
    const tab = renderTab(index + 1, categoryIcons[category]);
    if (index + 1 === activeTab) {
      tab.classList.add(CLASS_ACTIVE_TAB);
    }

    tabs.appendChild(tab);
  });
  tabsContainer.appendChild(tabs);

  const tabBodyContainer = createElement('div');

  const recentTabBody = createElement('div', CLASS_TAB_BODY);
  const title = createElement('h2');
  title.innerHTML = 'Recently Used';
  recentTabBody.appendChild(title);
  recentTabBody.appendChild(renderEmojiContainer(load(), false, events));
  tabBodyContainer.appendChild(recentTabBody);

  Object.keys(categoryIcons).forEach((category, index) => {
    const tabBody = createElement('div', CLASS_TAB_BODY);

    if (index + 1 === activeTab) {
      tabBody.classList.add(CLASS_ACTIVE_TAB);
    }

    const title = createElement('h2');
    title.innerHTML = category;
    tabBody.appendChild(title);
    tabBody.appendChild(renderEmojiContainer(emojiCategories[category], true, events));

    tabBodyContainer.appendChild(tabBody);
  });
  tabsContainer.appendChild(tabBodyContainer);

  return tabsContainer;
}
