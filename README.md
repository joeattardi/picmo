# Emoji Button
Vanilla JavaScript emoji picker

![Screenshot](https://raw.githubusercontent.com/joeattardi/emoji-button/master/screenshot.png)

## Installation

    npm install --save emoji-button

## Basic usage

```javascript
  import EmojiButton from 'emoji-button';

  EmojiButton(document.querySelector('#my-button'), emoji => {
    console.log('User picked emoji:', emoji);
  });
```
