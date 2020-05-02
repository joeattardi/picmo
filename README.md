![Emoji Button](https://user-images.githubusercontent.com/219285/79525037-f1657d80-802f-11ea-8156-7ef60d390d97.png)

Vanilla JavaScript emoji picker 😎

## Demo

[https://emoji-button.js.org](https://emoji-button.js.org)

## Features

* 💻 Vanilla JS, use with any framework
* 😀 Use native or Twemoji emojis
* 🔎 Emoji search
* 👍🏼 Skin tone variations
* ⏱ Recently used emojis
* ⌨️ Fully keyboard accessible
* 🎨 Dark, light, and auto themes

## Browser support

Emoji Button is supported on all modern browsers. As of version 3.0.0, Internet Explorer is no longer supported.

## Download

[emoji-button-3.0.3.min.js](https://github.com/joeattardi/emoji-button/releases/download/v3.0.3/emoji-button-3.0.3.min.js)

## Installation

If you are using a package manager like `yarn` or `npm`, you can install Emoji Button directly from the npm registry:

    npm install @joeattardi/emoji-button

You can also download the minified JavaScript file and add it to your page via a `<script>` tag. This will create a global variable `EmojiButton`, which you can use to instantiate a picker.

## Basic usage

The picker is shown by calling `showPicker` or `togglePicker` on the `EmojiButton` instance. When the user selects an emoji, the picker will emit the `emoji` event, which you can listen for and then handle the emoji according to your application's needs.

```javascript
  import EmojiButton from '@joeattardi/emoji-button';

  const button = document.querySelector('#emoji-button');
  const picker = new EmojiButton();

  picker.on('emoji', emoji => {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', () => {
    picker.togglePicker(button);
  });
```

### TypeScript note

Because the `EmojiButton` class is a default export, it requires a small tweak to import the library in a TypeScript project. There are two options:

1. Enable the `esModuleInterop` compiler option and import it normally as shown in the above example
2. Import the module using the following syntax: `import EmojiButton = require('@joeattardi/emoji-button');`.

For more details on this, please see [https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require).

## API

### `new EmojiButton(options)`

Creates an Emoji Button emoji picker.

#### Options

* `autoHide`: (boolean, default: `true`) Whether or not the picker should automatically be hidden when an emoji is clicked.

* `autoFocusSearch`: (boolean, default: `true`) Whether or not to auto-focus the search field when the picker is shown.

* `categories`: (string[], default: all categories) An array of the categories to show. Valid values are:
    * `smileys`
    * `people`
    * `animals`
    * `food`
    * `activities`
    * `travel`
    * `objects`
    * `symbols`
    * `flags`

* `emojiSize`: (string, default: `1.8em`): The size to use for the emoji icons.

* `emojisPerRow`: (number, default: `8`): The number of emojis to display per row. If this is set to a number smaller than 6, some category buttons may be cut off, so it is advisable to set `showCategoryButtons` to `false`.

* `emojiVersion`: (string, default: `'12.1'`) The Emoji version to use. This determines which emojis are available. Supported versions are:
  * `1.0`
  * `2.0`
  * `3.0`
  * `4.0`
  * `5.0`
  * `11.0`
  * `12.0`
  * `12.1`

* `position`: The position to display the picker relative to the reference element. Valid values are:
  * `auto`
  * `auto-start`
  * `auto-end`
  * `top`
  * `top-start`
  * `top-end`
  * `right`
  * `right-start`
  * `right-end`
  * `bottom`
  * `bottom-start`
  * `bottom-end`
  * `left`
  * `left-start`
  * `left-end`

* `recentsCount`: (number, default: `50`): The maximum number of recent emojis to save.

* `rootElement`: The root DOM node to attach the picker to. Defaults to the body if not passed in.

* `rows` (number, default: `6`): The number of visible rows in the picker.

* `showCategoryButtons`: (boolean, default: `true`) Whether or not to show the category switcher buttons.

* `showPreview`: (boolean, default: `true`) Whether or not to show the emoji preview area.

* `showSearch`: (boolean, default: `true`) Whether or not to show the search bar.

* `showRecents`: (boolean, default: `true`) Whether or not to show (and save) recently used emojis.

* `showVariants`: (boolean, default: `true`) Whether or not to show skin tone variants.

* `style`: (string, default: `native`) Which emoji style to use. Valid styles are:
  * `native`
  * `twemoji`

* `theme`: (string, default: `light`) Which theme to use. Valid themes are:
  * `light`
  * `dark`
  * `auto` (uses OS settings)

* `zIndex`: (number): If specified, sets a z-index for the emoji picker container.

* `i18n`: An object containing localized messages to display in the UI. The values and their defaults are as follows:

```
{
  search: 'Search emojis...',
  categories: {
    recents: 'Recent Emojis',
    smileys: 'Smileys & Emotion',
    people: 'People & Body',
    animals: 'Animals & Nature',
    food: 'Food & Drink',
    activities: 'Activities',
    travel: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags'
  },
  notFound: 'No emojis found'
}
```

### `showPicker(referenceElement)`

Shows the picker, positioning it relative to the given reference element. The reference element is usually the button or other element that was clicked to open the picker.

### `hidePicker()`

Hides the picker.

### `pickerVisible` (property)

Will be `true` if the picker is currently visible, and `false` if not.

### `on(event, callback)`

Adds an event listener. Currently there is only one event:

* `emoji`: Fired when an emoji is picked. The callback is called with a single argument, depending on the style.
  * If the picker is using the `native` style, the argument will be the native emoji character.
  * If the picker is using the `twemoji` style, the argument will be an HTML snippet of a Twemoji image.

## Development

The easiest way to hack on Emoji Button is to use the examples page.

### Clone the repository

    git clone https://github.com/joeattardi/emoji-button.git

### From the repository root

#### Install dependencies

    npm install

#### Set up the link

    npm link

#### Start the build/watch loop

    npm run build:watch

### From the `examples` subdirectory

#### Install dependencies

    npm install

#### Link the library

    npm link @joeattardi/emoji-button

#### Start the dev server

    npm start

### Open the page

http://localhost:10001
