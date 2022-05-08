# @picmo/renderer-twemoji

Adds support to PicMo for rendering emojis from [Twemoji](https://twemoji.twitter.com) instead of native platform emojis.

Requires the [base PicMo package](../picmo) to be installed as a peer dependency.

## Installation

```
npm install @picmo/renderer-twemoji
```

## Basic usage

```javascript
import { createPicker } from 'picmo';
import { TwemojiRenderer } from '@picmo/renderer-twemoji';

// The picker must have a root element to insert itself into
const rootElement = document.querySelector('#pickerContainer');

// Create the picker
const picker = createPicker({ 
  rootElement,
  renderer: new TwemojiRenderer()
});

// The picker emits an event when an emoji is selected. Do with it as you will!
picker.addEventListener('emoji:select', event => {
  console.log('Emoji selected:', event.emoji);
});
```
