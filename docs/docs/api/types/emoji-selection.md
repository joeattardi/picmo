# `EmojiSelection`

Contains data about an emoji that was selected.

## Properties

### `data`: `any` | `undefined`

For custom emojis, this will be any arbitrary data included in the [`CustomEmoji`](./custom-emoji) definition. For native emojis, this will be `undefined`.

### `emoji`: `string`

The emoji character being emitted. 

- For native emojis, this will be the actual emoji character.
- For custom emojis, this will be the unique identifier specified in the [`CustomEmoji`](./custom-emoji) definition.

### `url`: `string` | `undefined`

The URL of an image file associated with the emoji. This is included for custom emojis as well as emojis rendered by an image-based renderer such as `TwemojiRenderer`. For a native emoji, this will be `undefined`.

### `label`: `string`

The label associated with the emoji.
