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

A popup picker is not displayed until it is triggered by clicking on a popup trigger, usually a button. 

To use a popup picker, you must first install the `@picmo/popup-picker` package. This package contains the [`createPopup`](../api/popup-picker/functions/create-popup) function.

[`createPopup`](../api/popup-picker/functions/create-popup) returns a [`PopupPickerController`](../api/popup-picker/classes/popup-picker-controller) object. This object is used to toggle the popup picker.

[`createPopup`](../api/popup-picker/functions/create-popup) takes two arguments: first, the [`PickerOptions`](../api/picmo/types/picker-options) to configure the picker itself, and the the [`PopupOptions`](../api/popup-picker/types/popup-options) which configure the popup.

<pre>
  createPicker(
    pickerOptions: <a href="../api/picmo/types/picker-options">PickerOptions</a>,
    popupOptions: <a href="../api/popup-picker/types/popup-options">PopupOptions</a>
  ): <a href="../api/popup-picker/classes/popup-picker-controller">PopupPickerController</a>
</pre>

## Required elements

A popup picker supports two elements to be defined in the [`PopupOptions`](../api/popup-picker/types/popup-options):

- `triggerElement`: The element that will trigger the popup.
- `referenceElement`: Another element that the popup will be positioned relative to. This isn't required if using fixed positioning.

:::note

The popup does not add any event listeners to the `referenceElement`. It is used for positioning purposes only. You will still need to add a listener such as a click listener to the `triggerElement` to open the popup.

:::

### Positioning the popup

There are two ways a popup picker can be positioned. A position strategy is specified in the [`position`](../api/popup-picker/types/popup-options#position) option. Its value is either a [fixed position object](#fixed-position) or a [relative position value](#positioning-relative-to-another-element).

#### Fixed position

The picker is positioned relative to the viewport and remains fixed there. A fixed position is an object containing one of the following properties: `top`, `bottom`, `left`, `right`. This will set the [`position: fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) CSS property.

#### Positioning relative to another element

You can also position the popup picker relative to another element's position. Often times, this will be the trigger element. In this case, two options are needed:

- `referenceElement`: The element that the popup picker will be positioned relative to.
- `position`: A string value, one of the supported [relative position values](../api/popup-picker/types/position#relative-position).

Here's a simple example of a popup picker:

```javascript
import { createPopup } from 'picmo';

const trigger = document.querySelector('.emoji-button');

const picker = createPopup({
  referenceElement: trigger,
  triggerElement: trigger
});
```