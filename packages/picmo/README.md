# picmo

Main package for the PicMo library. You'll need this if you want an emoji picker!

## Installation

```
npm install picmo
```

## Basic usage

```javascript
import { createPicker } from 'picmo';

// The picker must have a root element to insert itself into
const rootElement = document.querySelector('#pickerContainer');

// Create the picker
const picker = createPicker({ rootElement });

// The picker emits an event when an emoji is selected. Do with it as you will!
picker.addEventListener('emoji:select', event => {
  console.log('Emoji selected:', event.emoji);
});
```
