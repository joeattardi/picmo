import APIProperty from '@site/src/components/APIProperty';

# `PickerOptions`

A `PickerOptions` object is passed to the `createPicker` and `createPopup` functions.

## Common properties

The following properties are supported for both inline and popup pickers.

### `animate`: `boolean`

Default: `true`

Whether or not to show animated transitions in the picker.

### `categories`: [`CategoryKey[]`](./category-key) | `undefined`

If specified, only the categories in this array will be shown in the picker. The filtered categories will be shown in the order they in which they appear in the array.

### `custom`: [`CustomEmoji[]`](./custom-emoji) | `undefined`

Specifies the custom emojis/GIFs to show in the picker. They will all be included in a single "Custom" category.

### `emojiData`: [`Emoji[]`](https://emojibase.dev/api/emojibase/interface/Emoji) | `undefined`

Default: `undefined`

The emoji data to use for the picker. If not specified, the data will be downloaded from the CDN when the database is created.

### `emojiSize`: `string`

Default: `'1.8em'`

The size of emojis in the picker grid. This can be any valid CSS size value.

### `emojisPerRow`: `number`

Default: `8`

The number of columns to show in the emoji grid.

### `emojiVersion`: `number` | `auto`

Specifies the version of the emoji data to use. An emoji will only be shown if it is available for the specified version.

A specific number can be specified, or `auto` can be used to automatically determine the supported Emoji version based on a quick rendering test.

### `i18n`: [`Dictionary`](./dictionary)

Default: Built-in English strings

A collection of i18n strings to use for the picker.

### `locale`: [`Locale`](https://emojibase.dev/api/emojibase#Locale)

The locale to use for emoji data. 

### `maxRecents`: `number`

Default: `50`

The maximum number of recent emojis to remember.

### `messages`: [`MessagesDataset`](https://emojibase.dev/api/emojibase/interface/MessagesDataset) | `undefined`

The messages data to use for the picker, containing category names. If not specified, the data will be downloaded from the CDN when the database is created.

### `renderer`: `Renderer` subclass instance

Default: instance of `NativeRenderer`

The `Renderer` subclass instance that will be used to render the emojis.

### `rootElement`: `HTMLElement`

Default: `document.body`

The DOM element that will contain the picker. Any existing children of this element will be removed when `createPicker` is called.

### `showCategoryTabs`: `boolean`

Default: `true`

Whether or not to show the category tabs at the top of the picker.

### `showPreview`: `boolean`

Default: `true`

Whether or not to show the preview area at the bottom of the picker.

### `showRecents`: `boolean`

Default: `true`

Whether or not to show recently used emojis.

### `showSearch`: `boolean`

Default: `true`

Whether or not to show the search box at the top of the picker.

### `showVariants`: `boolean`

Default: `true`

Whether or not to show the variants of an emoji, where supported. If `false`, the default variant will always be emitted

### `theme`: `string`

Default: `lightTheme`

The color theme to use for the picker. Usually this will be one of the class names exported by `picmo/themes`. Built-in themes are:

- `lightTheme`: A light theme with a white background.
- `darkTheme`: A dark theme with a black background.
- `autoTheme`: Automatically sets the light or dark theme based on the operating system/browser settings.

### `visibleRows`: `number`

Default: `6`

The number of visible rows to show in the emoji grid.

## Popup properties

The following properties are only supported for popup pickers.

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
