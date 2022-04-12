import APIProperty from '@site/src/components/APIProperty';

# `PickerOptions`

A `PickerOptions` object is passed to the `createPicker` and `createPopup` functions.

## Common properties

The following properties are supported for both inline and popup pickers.

### `animate`

<APIProperty type="boolean" defaultValue="true" />

Whether or not to show animated transitions in the picker.

### `renderer`

<APIProperty type="Renderer subclass instance" defaultValue="new NativeRenderer()" />

The `Renderer` subclass instance that will be used to render the emojis.

### `rootElement`

<APIProperty type="HTMLElement" defaultValue="document.body" />

The DOM element that will contain the picker. Any existing children of this element will be removed when `createPicker` is called.

### `theme`

<APIProperty type="string" defaultValue="lightTheme" />

The color theme to use for the picker. Usually this will be one of the class names exported by `picmo/themes`. Built-in themes are:

- `lightTheme`: A light theme with a white background.
- `darkTheme`: A dark theme with a black background.
- `autoTheme`: Automatically sets the light or dark theme based on the operating system/browser settings.
