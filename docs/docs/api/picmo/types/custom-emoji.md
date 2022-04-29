# `CustomEmoji`

Custom emoji definition.

Defines data for a custom emoji to show in the picker's "Custom" category.

## Properties

### `data`

- **Type**: `any`

Arbitrary data to associate with the emoji. This custom data will be included in the [`emoji:select`](external-event#emojiselect) event.

### `emoji`

- **Type**: `string`

A string identifier for the emoji. Can be any string value, but must be unique within the custom emojis.

### `label`

- **Type**: `string`

A descriptive label that will be shown in the preview area.

### `tags`

- **Type**: `string[]`

Tags to use for this emoji. A `custom` tag will automatically be added.

### `url`

- **Type**: `string`

The URL of the image to use for the emoji.
