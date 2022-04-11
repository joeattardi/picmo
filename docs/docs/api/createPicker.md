# `createPicker(options)`

Creates an emoji picker that is displayed inline on a page.

Returns an `EmojiPicker` instance.

## `options`

`createPicker` supports the following options:



### `renderer`: `Renderer` subclass instance

*Default value*: `new NativeRenderer()`

An instance of the `Renderer` class that will be used to render the emojis.

### `rootElement`: `HTMLElement`

*Default value*: `document.body`

The DOM element that will contain the picker. Any existing children of this element will be removed when `createPicker` is called.

## `showCategoryTabs`: `boolean`

*Default value`: true`

Whether or not to show the category tabs.

### `showPreview`: `boolean`

*Default value*: `true`

### `showRecents`: `boolean`

*Default value*: `true`

Whether or not to remember recently selected emojis and show them in the picker.

### `showSearch`: `boolean`

*Default value*: `true`

Whether or not to enable search functionality.

### `showVariants`: `boolean`

*Default value*: `true`

If `true`, the variant popup will be displayed when an emoji with variants is selected. This typically means different skin tones, but can also include hair styles, etc.

If `false`, emojis with variants will simply emit the default variant.

### `theme`: `string`

The color theme to use for the emoji picker. This can be a CSS class name, but is typically defined as one of the three built-in themes that are imported from `picmo/themes`: `lightTheme`, `darkTheme`, or `autoTheme`.

Defaults to the `lightTheme` theme.
