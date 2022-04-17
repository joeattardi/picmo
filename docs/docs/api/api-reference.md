---
sidebar_position: 1
---

# API Reference

## Top level exports

The following are exported directly from the `picmo` package as named exports:

### Picker creation

- [`createPicker`](./functions/create-picker): Creates an inline emoji picker.
- [`createPopup`](./functions/create-popup): Creates a popup emoji picker.

### Data management

- [`createDatabase`](./functions/create-database): Creates a database ahead of time.
- [`deleteDatabase`](./functions/delete-database): Deletes a database.
- [`deleteRecents`](./functions/delete-recents): Deletes recently used emoji data.

## Separate sub-modules

- [`NativeRenderer`](./classes/native-renderer): Default renderer that uses native platform emojis.
- [`TwemojiRenderer`](./classes/twemoji-renderer): Renderer that uses Twemoji images.

## Type definitions

- [`CategoryKey`](./types/category-key): Unique identifiers for each category.
- [`CustomEmoji`](./types/custom-emoji): Defines a custom image.
- [`Dictionary`](./types/dictionary): A dictionary of i18n strings.
- [`EmojiSelection`](./types/emoji-selection): Data about a selected emoji.
- [`ExternalEmoji`](./types/external-emoji): Events emitted by the emoji picker.
- [`PickerOptions`](./types/picker-options): Options for creating a picker.
- [`Position`](./types/position): Defines positioning for a popup picker.
