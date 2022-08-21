# `OpenOptions`

Defines options that can be passed when opening or toggling a popup picker. This allows a single popup picker to be used with multiple triggers/reference elements.

## Properties

### `referenceElement`

- **Type**: `HTMLElement` | `undefined`

If using relative positioning, this defines the element that the picker is positioned relative to. This is required if using relative positioning, but can be omitted if using fixed positioning.

If specified, this will overwrite the previous `referenceElement` property of the [`PopupPickerController`](../classes/popup-picker-controller).

### `triggerElement`

- **Type**: `HTMLELement` | `undefined`

The interactive element (usually a button) that will trigger the popup picker.

If specified, this will overwrite the previous `triggerElement` property of the [`PopupPickerController`](../classes/popup-picker-controller).
