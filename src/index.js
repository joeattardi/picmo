import Popper from 'popper.js';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faFlag, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faCat, faCoffee, faFutbol, faMusic } from '@fortawesome/free-solid-svg-icons';

import emojiData from './data/emoji.js';

import { createElement } from './util';

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

library.add(faBuilding, faCat, faCoffee, faFlag, faFutbol, faLightbulb, faMusic, faSmile);

const smile = icon({ prefix: 'far', iconName: 'smile' }).html;

const CLASS_ACTIVE_TAB = 'active';
const CLASS_PICKER = 'emoji-picker';
const CLASS_TABS_CONTAINER = 'emoji-picker__tabs';
const CLASS_TAB = 'emoji-picker__tab';
const CLASS_TAB_BODY = 'emoji-picker__tab-body';
const CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';
const CLASS_EMOJI = 'emoji-picker__emoji';

export default function emojiButton(button) {
  let pickerVisible = false;
  let picker;
  let popper;

  button.innerHTML = smile;

  function onDocumentClick(event) {
    let parent = event.target;
    while (parent) {
      if (parent === picker || parent === button) {
        return;
      }

      parent = parent.parentElement;
    }

    hidePicker();
  }

  function hidePicker() {
    pickerVisible = false;
    document.body.removeChild(picker);
    popper.destroy();
    document.removeEventListener('click', onDocumentClick);
  }

  function buildPicker() {
    function setActiveTab(index) {
      tabBodyContainer.children[activeTab].classList.remove(CLASS_ACTIVE_TAB);
      tabs.children[activeTab].classList.remove(CLASS_ACTIVE_TAB);

      activeTab = index;

      tabBodyContainer.children[activeTab].classList.add(CLASS_ACTIVE_TAB);
      tabs.children[activeTab].classList.add(CLASS_ACTIVE_TAB);
    }

    picker = createElement('div', CLASS_PICKER);

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
    picker.appendChild(tabs);

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
        emojiContainer.appendChild(emojiButton);
      });
      tabBody.appendChild(emojiContainer);

      tabBodyContainer.appendChild(tabBody);
    });
    picker.appendChild(tabBodyContainer);

    document.body.appendChild(picker);
    document.addEventListener('click', onDocumentClick);

    popper = new Popper(button, picker, {
      placement: 'right-start'
    });
  }

  button.addEventListener('click', event => {
    pickerVisible = !pickerVisible;

    if (pickerVisible) {
      buildPicker();
    } else {
      hidePicker();
    }
  });
}
