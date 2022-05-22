# Popup pickers

A popup picker is contained in a wrapper element that is displayed as a popup. To apply custom styling to the popup, use the `className` property. This can be used, for example, to set a custom `z-index` for the popup.

## Closing popup pickers

A popup picker is closed when one of the following occurs:

- `close` is called on the picker
- `toggle` is called on the picker when it is open
- the user clicks anywhere outside of the picker or its trigger element (can be disabled by setting the [`hideOnClickOutside`](../api/popup-picker/types/popup-options#hideonclickoutside) option to `false`)
- the user presses the `Escape` key (when the main emoji grid is showing) (can be disabled by setting the [`hideOnEscape`](../api/popup-picker/types/popup-options#hideonescape) option to `false`)
- when an emoji is emitted (can be disabled by setting the [`hideOnEmojiSelect`](../api/popup-picker/types/popup-options#hideonemojiselect) option to `false`)
