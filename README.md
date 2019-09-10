# Emoji Button
Vanilla JavaScript emoji picker ⚡️

![Screenshot](https://raw.githubusercontent.com/joeattardi/emoji-button/master/screenshot.png)

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
