# Popup pickers

A popup picker is contained in a wrapper element that is displayed as a popup. It is not displayed until it is triggered by calling the [`open`](../api/popup-picker/classes/popup-picker-controller#open) or [`toggle`](../api/popup-picker/classes/popup-picker-controller#toggle) methods.

To apply custom styling to the popup, use the `className` option. This can be used, for example, to set a custom `z-index` for the popup.

## Creating a popup picker

To use a popup picker, you must first install the `@picmo/popup-picker` package. This package contains the [`createPopup`](../api/popup-picker/functions/create-popup) function.

[`createPopup`](../api/popup-picker/functions/create-popup) returns a [`PopupPickerController`](../api/popup-picker/classes/popup-picker-controller) object. This object is used to toggle the popup picker.

[`createPopup`](../api/popup-picker/functions/create-popup) takes two arguments: first, the [`PickerOptions`](../api/picmo/types/picker-options) to configure the picker itself, and the the [`PopupOptions`](../api/popup-picker/types/popup-options) which configure the popup.

<pre>
  createPopup(pickerOptions: <a href="../api/picmo/types/picker-options">PickerOptions</a>,
    popupOptions: <a href="../api/popup-picker/types/popup-options">PopupOptions</a>
  ): <a href="../api/popup-picker/classes/popup-picker-controller">PopupPickerController</a>
</pre>

## Popup elements

A popup picker supports two elements to be defined in the [`PopupOptions`](../api/popup-picker/types/popup-options):

- `triggerElement`: The element that will trigger the popup.
- `referenceElement`: Another element that the popup will be positioned relative to. This isn't required if using fixed positioning.

:::note

The popup does not add any event listeners to the `referenceElement` or `triggerElement`. It is used for positioning purposes only. You will still need to add a listener such as a click listener to the `triggerElement` to open the popup.

:::

### Sharing a popup between elements

In addition to specifying the trigger and reference element when the popup is created, they can also be specified when the [`open`](../api/popup-picker/classes/popup-picker-controller#open) or [`toggle`](../api/popup-picker/classes/popup-picker-controller#toggle) methods are called. The popup controller is set to use the new elements for positioning and click detection.

## Positioning the popup

There are two ways a popup picker can be positioned. A position strategy is specified in the [`position`](../api/popup-picker/types/popup-options#position) option. Its value is either a [fixed position object](#fixed-position) or a [relative position value](#positioning-relative-to-another-element).

### Fixed position

The picker is positioned relative to the viewport and remains fixed there. A fixed position is an object containing one of the following properties: `top`, `bottom`, `left`, `right`. This will set the [`position: fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) CSS property.

### Positioning relative to another element

You can also position the popup picker relative to another element's position. Often times, this will be the trigger element. In this case, two options are needed:

- `referenceElement`: The element that the popup picker will be positioned relative to.
- `position`: A string value, one of the supported [relative position values](../api/popup-picker/types/position#relative-position).

Here's a simple example of a popup picker:

```javascript
import { createPopup } from 'picmo';

const trigger = document.querySelector('.emoji-button');

const picker = createPopup({
  // picker options go here
}, {
  referenceElement: trigger,
  triggerElement: trigger
});
```

#### Handling a loss of the reference element

The relative positioning of the picker is continuously updated. If the reference element changes position, the picker will move as well to maintain the relative placement.

However, if the reference element is hidden or removed from the DOM, it no longer has any positioning data available. In this instance the picker will lose its relative position and jump to the top left corner of the screen (position (0,0)).

This behavior can be changed with the [`onPositionLost`](../api/popup-picker/types/popup-options#onpositionlost) option. There are four possible values:

- `none`: This is the default behavior. The picker will jump to the top left corner if it has not previously been closed.
- `close`: The picker will close. It can be reopened again with a new reference element (or fixed position).
- `destroy`: Used for final cleanup. The picker will close, and immediately be destroyed. It cannot be reopened. 
- `hold`: The previously known relative position is maintained, and the picker does not move. Once it is closed, however, it will need to be given a new reference element the next time it is opened.

## Closing popup pickers

A popup picker is closed when one of the following occurs:

- `close` is called on the picker
- `toggle` is called on the picker when it is open
- the user clicks anywhere outside of the picker or its trigger element (can be disabled by setting the [`hideOnClickOutside`](../api/popup-picker/types/popup-options#hideonclickoutside) option to `false`)
- the user presses the `Escape` key (when the main emoji grid is showing) (can be disabled by setting the [`hideOnEscape`](../api/popup-picker/types/popup-options#hideonescape) option to `false`)
- when an emoji is emitted (can be disabled by setting the [`hideOnEmojiSelect`](../api/popup-picker/types/popup-options#hideonemojiselect) option to `false`)
