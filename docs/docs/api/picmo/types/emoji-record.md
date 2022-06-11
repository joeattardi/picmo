# `EmojiRecord`

Describes a single emoji inside the picker.

This is _not_ what is emitted when an emoji is selected; for that, see [`EmojiSelection`](./emoji-selection). Rather, it is used internally by the picker as well as the recents provider.

## Properties

### `custom`

- **Type**: `boolean` | `undefined`

Whether or not this is a custom emoji.

### `data`

- **Type**: `any` | `undefined`

Arbitrary data associated with an emoji. Only applies to custom emojis.

### `emoji`

- **Type**: `string`

The native emoji string containing the Unicode sequenece for the emoji. For custom emojis, this is a unique identifier for the custom emoji.

### `hexcode`

- **Type**: `string` | `undefined`

The hex codes for the emoji, separated by hyphens, e.g. `'1F3CB-1F3FB-200D-2642-FE0F'`.

Only applies to non-custom emojis.

### `label`

- **Type**: `string`

The display name for the emoji.

### `order`

- **Type**: `number` | `undefined`

The order of the emoji within its category. 

Only applies to non-custom emojis; custom emojis are ordered depending on their order in the `custom` array.

### `skins`

- **Type**: `EmojiRecord[]` | `undefined`

Any variants of the emoji, typically for different skin tones, though sometimes they can be for other attributes such as hair color.

### `tags`

- **Type**: `string[]` | `undefined`

An array of tags for this emoji, if any.

### `url`

- **Type**: `string` | `undefined`

For custom emojis, the URL of the image to use for the emoji.

Only applies to custom emojis.

### `version`

- **Type**: `number` | `undefined`

For non-custom emojis, specifies the version of the Emoji specification that the emoji was added in.

Only applies to non-custom emojis.
