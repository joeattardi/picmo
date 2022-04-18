# Popup pickers

## Closing popup pickers

A popup picker is closed when one of the following occurs:

- `close` is called on the picker
- `toggle` is called on the picker when it is open
- the user clicks anywhere outside of the picker or its trigger element (can be disabled by setting the [`hideOnClickOutside`](../api/types/picker-options#hideonclickoutside-boolean) option to `false`)
- the user presses the `Escape` key (when the main emoji grid is showing) (can be disabled by setting the [`hideOnEscape`](../api/types/picker-options#hideonescape-boolean) option to `false`)
- when an emoji is emitted (can be disabled by setting the [`hideOnEmojiSelect`](../api/types/picker-options#hideonemojiselect-boolean) option to `false`)
