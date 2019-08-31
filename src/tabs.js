import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faFlag, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faCat, faCoffee, faFutbol, faMusic } from '@fortawesome/free-solid-svg-icons';

import emojiData from './data/emoji.js';

import { createElement, empty } from './util';

library.add(faBuilding, faCat, faCoffee, faFlag, faFutbol, faLightbulb, faMusic, faSmile);

const CLASS_ACTIVE_TAB = 'active';
const CLASS_TABS_CONTAINER = 'emoji-picker__tabs';
const CLASS_TAB = 'emoji-picker__tab';
const CLASS_TAB_BODY = 'emoji-picker__tab-body';
const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';
const CLASS_EMOJI = 'emoji-picker__emoji';

const emojiCategories = {};
emojiData.forEach(emoji => {
  let categoryList = emojiCategories[emoji.category];
  if (!categoryList) {
    categoryList = emojiCategories[emoji.category] = [];
  }

  categoryList.push(emoji);
});

const categoryIcons = {
  'Smileys & People': { prefix: 'far', iconName: 'smile' },
  'Animals & Nature': { prefix: 'fas', iconName: 'cat' },
  'Food & Drink': { prefix: 'fas', iconName: 'coffee' },
  'Activities': { prefix: 'fas', iconName: 'futbol' },
  'Travel & Places': { prefix: 'far', iconName: 'building' },
  'Objects': { prefix: 'far', iconName: 'lightbulb' },
  'Symbols': { prefix: 'fas', iconName: 'music' },
  'Flags': { prefix: 'far', iconName: 'flag' }
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

    tab.innerHTML = icon(categoryIcons[category]).html;
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

    const emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
    emojiCategories[category].forEach(emoji => {
      const emojiButton = createElement('button', CLASS_EMOJI);
      emojiButton.innerHTML = emoji.emoji;

      emojiButton.addEventListener('click', () => {
        emojiCallback(emoji.emoji);
        hidePicker();
      });

      emojiContainer.appendChild(emojiButton);
    });
    tabBody.appendChild(emojiContainer);

    tabBodyContainer.appendChild(tabBody);
  });
  pickerContent.appendChild(tabBodyContainer);
}
