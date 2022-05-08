# @picmo/popup-picker

Adds support to PicMo for showing a picker in a popup element.

Requires the [base PicMo package](../picmo) to be installed as a peer dependency.

## Installation

```
npm install @picmo/popup-picker
```

## Basic usage

To show a popup picker, you'll need a trigger element. This is often a button or other clickable element that can show the popup picker in response to a click event.

```javascript
import { createPopup } from '@picmo/popup-picker';

const triggerButton = document.querySelector('#emoji-button');

// Create the picker
const picker = createPopup({}, {
  // The element that triggers the popup
  triggerElement: triggerButton,

  // The element to position the picker relative to - often this is also the trigger element,
  referenceElement: triggerButton,

  // specify how to position the popup
  position: 'bottom-start'
});

// The picker emits an event when an emoji is selected. Do with it as you will!
picker.addEventListener('emoji:select', event => {
  console.log('Emoji selected:', event.emoji);
});
```
