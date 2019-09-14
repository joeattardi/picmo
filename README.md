# Emoji Button
Vanilla JavaScript emoji picker 😎

[![npm package](https://img.shields.io/npm/v/emoji-button)](https://npmjs.com/package/emoji-button)

![Screenshot](https://raw.githubusercontent.com/joeattardi/emoji-button/master/screenshot.png)

Emoji Button turns an ordinary button into an emoji picker. When the target button is clicked, the emoji picker will be shown and a callback will be executed when an emoji is picked.

## Demo

[https://joeattardi.github.io/emoji-button](https://joeattardi.github.io/emoji-button)

## Features

* 💻 Vanilla JS, use with any framework
* 🔎 Emoji search
* 👍🏼 Skin tone variations
* ⏱ Recently used emojis

## Installation

    npm install --save emoji-button

## Basic usage

```javascript
  import EmojiButton from 'emoji-button';

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

### `showPicker(referenceElement)`

Shows the picker, positioning it relative to the given reference element. The reference element is usually the button or other element that was clicked to open the picker.

### `hidePicker()`

Hides the picker.

### `pickerVisible` (property)

Will be `true` if the picker is currently visible, and `false` if not.

### `on(event, callback)`

Adds an event listener. Currently there is only one event:

* `emoji`: Fired when an emoji is picked. The callback is called with a single argument, the emoji character that was picked.