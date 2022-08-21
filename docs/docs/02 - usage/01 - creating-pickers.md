# Creating pickers

## Inline picker

An inline picker is rendered directly in the page. It is always visible as long as its parent element is visible. There is no concept of opening or closing an inline picker.

### Create a root element

To create an inline picker, you must first create an element that will contain it:

```html
<div class="pickerContainer"></div>
```

### Create the picker

A picker is created by calling the [`createPicker`](../api/picmo/functions/create-picker) function. [`createPicker`](../api/picmo/functions/create-picker) accepts many [options](../api/picmo/types/picker-options) but also has sensible defaults. Here is a simple inline picker:

```javascript
import { createPicker } from 'picmo';

const container = document.querySelector('.pickerContainer');
const picker = createPicker({
  rootElement: container
});
```

This will render the picker in the `container` element.

## Popup picker

See [Popup pickers](./popup-picker) for details on creation and usage of popup pickers.
