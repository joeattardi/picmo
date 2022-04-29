# `PopupOptions`

## Popup properties

### `autoFocusSearch`: `boolean`

If `true`, the search field will automatically receive focus when the picker opens.

### `hideOnClickOutside`: `boolean`

Default: `true`

If `true`, the picker will close when clicking anywhere outside of it.

### `hideOnEmojiSelect`: `boolean`

Default: `true`

If `true`, the picker will automatically close when an emoji is selected.

### `hideOnEscape`: `boolean`

Default: `true`

If `true`, the picker will close when the Escape key is pressed.

### `position`: [`Position`](./position)

Default: `'auto'`

The positioning method to use for the popup picker.

### `referenceElement`: `HTMLElement` | `undefined`

If using relative positioning, this defines the element that the picker is positioned relative to. This is required if using relative positioning, but can be omitted if using fixed positioning.

### `triggerElement`: `HTMLELement` | `undefined`

The interactive element (usually a button) that will trigger the popup picker.
