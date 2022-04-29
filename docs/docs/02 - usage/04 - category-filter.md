# Category filter

By default, all categories are shown in the following order:

- Recents (if enabled)
- Smileys & Emotion
- People & Body
- Animals & Nature
- Food & Drink
- Travel & Places
- Activities
- Objects
- Symbols
- Flags
- Custom (if any are defined)

## Customizing the categories

The [`PickerOptions`](../api/picmo/types/picker-options#categories) supports a `categories` property. This can be used to limit which categories are shown, and in what order. The array should contain [category keys](../api/picmo/types/category-key).

If this option is not specified, the categories specified above will be shown. If it _is_ specified, only the categories whose keys are in this array will be shown in the picker. The categories will be shown in the order they appear in the array.

The `categories` array also limits what emojis can be found by searching.

