# Emoji Button
Vanilla JavaScript emoji picker 😎

![Screenshot](https://user-images.githubusercontent.com/219285/70683330-03917280-1c70-11ea-83f1-c2795e308fbe.png)


## Demo

[https://joeattardi.github.io/emoji-button](https://joeattardi.github.io/emoji-button)

## Features

* 💻 Vanilla JS, use with any framework
* 🔎 Emoji search
* 👍🏼 Skin tone variations
* ⏱ Recently used emojis

## Download

[emoji-button-2.7.3.min.js](https://github.com/joeattardi/emoji-button/releases/download/v2.7.3/emoji-button-2.7.3.min.js)

## Installation

    npm install --save @joeattardi/emoji-button

## Basic usage

```javascript
  import EmojiButton from '@joeattardi/emoji-button';

  const button = document.querySelector('#emoji-button');
  const picker = new EmojiButton();

  picker.on('emoji', emoji => {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', () => {
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
  });
```

## API

### `new EmojiButton(options)`

Creates an Emoji Button emoji picker.

#### Options

* `autoHide`: (boolean, default: `true`) Whether or not the picker should automatically be hidden when an emoji is clicked.

* `autoFocusSearch`: (boolean, default: `true`) Whether or not to auto-focus the search field when the picker is shown.

* `emojiVersion`: (string, default: `'12.1`) The Emoji version to use. This determines which emojis are available. Supported versions are:
  * `0.0`
  * `2.0`
  * `4.0`
  * `5.0`
  * `11.0`
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

* `showPreview`: (boolean, default: `true`) Whether or not to show the emoji preview area.

* `showSearch`: (boolean, default: `true`) Whether or not to show the search bar.

* `showRecents`: (boolean, default: `true`) Whether or not to show (and save) recently used emojis.

* `showVariants`: (boolean, default: `true`) Whether or not to show skin tone variants.

* `zIndex`: (number): If specified, sets a z-index for the emoji picker container.

* `i18n`: An object containing localized messages to display in the UI. The values and their defaults are as follows:

```
{
  search: 'Search emojis...',
  categories: {
    recents: 'Recent Emojis',
    smileys: 'Smileys & People',
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

* `emoji`: Fired when an emoji is picked. The callback is called with a single argument, the emoji character that was picked.

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

http://localhost:5000
