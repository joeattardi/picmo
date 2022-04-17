---
sidebar_position: 1
---

# Creating pickers

## Inline picker

An inline picker is rendered directly in the page. It is always visible as long as its parent element is visible. There is no concept of opening or closing an inline picker.

### Create a root element

To create an inline picker, you must first create an element that will contain it:

```html
<div class="pickerContainer"></div>
```

### Create the picker

A picker is created by calling the [`createPicker`](../api/functions/create-picker) function. [`createPicker`](../api/functions/create-picker) accepts many [options](../api/types/picker-options) but also has sensible defaults. Here is a simple inline picker:

```javascript
import { createPicker } from 'picmo';

const container = document.querySelector('.pickerContainer');
const picker = createPicker({
  rootElement: container
});
```

This will render the picker in the `container` element:

![Inline picker](@site/static/img/usage/inline-picker.png)

## Popup picker

A popup picker is not displayed until it is triggered by clicking on a popup trigger, usually a button. Popup pickers are created using the [`createPopup`](../api/functions/create-popup) function.

[`createPopup`](../api/functions/create-popup) returns a [`PopupPickerController`](../api/classes/popup-picker-controller) object. This object is used to toggle the popup picker.

When creating a popup picker, you need to specify which element is used to trigger the popup (usually a button). This *will not* add a click listener, but is needed in order to properly open the picker.

### Positioning the popup

There are two ways a popup picker can be positioned. A position strategy is specified in the [`position`](../api/types/picker-options#position-position) option. Its value is either a [fixed position object](#fixed-position) or a [relative position value](#positioning-relative-to-another-element).

#### Fixed position

The picker is positioned relative to the viewport and remains fixed there. A fixed position is an object containing one of the following properties: `top`, `bottom`, `left`, `right`. This will set the [`position: fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) CSS property.

#### Positioning relative to another element

You can also position the popup picker relative to another element's position. Often times, this will be the trigger element. In this case, two options are needed:

- `referenceElement`: The element that the popup picker will be positioned relative to.
- `position`: A string value, one of the supported [relative position values](../api/types/position#relative-position).

Here's a simple example of a popup picker:

```javascript
import { createPopup } from 'picmo';

const trigger = document.querySelector('.emoji-button');

const picker = createPopup({
  referenceElement: trigger,
  triggerElement: trigger
});
```