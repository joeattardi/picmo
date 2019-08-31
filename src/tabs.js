import emojiData from './data/emoji.js';

import { renderEmojiContainer } from './emojiContainer';
import * as icons from './icons';
import { createElement, empty } from './util';

const CLASS_ACTIVE_TAB = 'active';
const CLASS_TABS_CONTAINER = 'emoji-picker__tabs';
const CLASS_TAB = 'emoji-picker__tab';
const CLASS_TAB_BODY = 'emoji-picker__tab-body';

const emojiCategories = {};
emojiData.forEach(emoji => {
  let categoryList = emojiCategories[emoji.category];
  if (!categoryList) {
    categoryList = emojiCategories[emoji.category] = [];
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

export function renderTabs(pickerContent, hidePicker, emojiCallback) {
  empty(pickerContent);

  function setActiveTab(index) {
    tabBodyContainer.children[activeTab].classList.remove(CLASS_ACTIVE_TAB);
    tabs.children[activeTab].classList.remove(CLASS_ACTIVE_TAB);

    activeTab = index;

    tabBodyContainer.children[activeTab].classList.add(CLASS_ACTIVE_TAB);
    tabs.children[activeTab].classList.add(CLASS_ACTIVE_TAB);
  }

  const tabs = createElement('ul', CLASS_TABS_CONTAINER);
  let activeTab = 0;

  Object.keys(categoryIcons).forEach((category, index) => {
    const tab = createElement('li', CLASS_TAB);

    if (index === activeTab) {
      tab.classList.add(CLASS_ACTIVE_TAB);
    }

    tab.addEventListener('click', () => setActiveTab(index));

    tab.innerHTML = categoryIcons[category];
    tabs.appendChild(tab);
  });
  pickerContent.appendChild(tabs);

  const tabBodyContainer = document.createElement('div');
  Object.keys(categoryIcons).forEach((category, index) => {
    const tabBody = createElement('div', CLASS_TAB_BODY);

    if (index === activeTab) {
      tabBody.classList.add(CLASS_ACTIVE_TAB);
    }

    const title = createElement('h2');
    title.innerHTML = category;
    tabBody.appendChild(title);
    tabBody.appendChild(renderEmojiContainer(emojiCategories[category], emojiCallback, hidePicker));

    tabBodyContainer.appendChild(tabBody);
  });
  pickerContent.appendChild(tabBodyContainer);
}
