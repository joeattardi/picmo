import Popper from 'popper.js';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faFlag, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faCat, faCoffee, faFutbol, faMusic } from '@fortawesome/free-solid-svg-icons';

import emojiData from './data/emoji.js';

const emojiCategories = {};
emojiData.forEach(emoji => {
  let categoryList = emojiCategories[emoji.category];
  if (!categoryList) {
    categoryList = emojiCategories[emoji.category] = [];
  }

  categoryList.push(emoji);
});

const categoryOrder = [
  'Smileys & People',
  'Animals & Nature',
  'Food & Drink',
  'Activities',
  'Travel & Places',
  'Objects',
  'Symbols',
  'Flags'
];

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

  button.addEventListener('click', event => {
    pickerVisible = !pickerVisible;

    if (pickerVisible) {
      picker = document.createElement('div');
      picker.className = 'emoji-picker';

      const tabs = document.createElement('ul');
      tabs.className = 'emoji-picker__tabs';

      Object.keys(categoryIcons).forEach(category => {
        const tab = document.createElement('li');
        tab.className = 'emoji-picker__tab';
        tab.innerHTML = icon(categoryIcons[category]).html;
        tabs.appendChild(tab);
      });

      picker.appendChild(tabs);

      document.body.appendChild(picker);
      document.addEventListener('click', onDocumentClick);

      popper = new Popper(button, picker, {
        placement: 'right-start'
      });
    } else {
      hidePicker();
    }
  });
}
