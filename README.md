# Emoji Button
Vanilla JavaScript emoji picker 😎

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

  EmojiButton(document.querySelector('#my-button'), emoji => {
    console.log('User picked emoji:', emoji);
  });
```

## API

### `EmojiButton(buttonEl, callback)`

Turns a given button element into an Emoji Button

* `buttonEl`: Reference to the DOM element of the button
* `callback`: A callback function that will be called when an emoji is picked. The literal emoji character (e.g. 😃) will be passed to the callback function.
