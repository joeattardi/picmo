---
sidebar_position: 1
---

# Renderers

An emoji renderer is a class that, given an emoji sequence, will generate the content to be displayed and emitted. 

To use a particular renderer, you must first create an instance of it. This instance is then passed as the `renderer` option to the picker.

PicMo comes with two built-in renderers:

## Native

The default `NativeRenderer` will render the emojis using the native emoji glyphs in the user's operating system. This means the rendered emojis will look different depending on the operating system.

```javascript
import { NativeRenderer } from 'picmo/renderers/native';

const picker = createPicker({
  renderer: new NativeRenderer()
});
```

## Twemoji

[Twemoji](https://twemoji.twitter.com/) is a free emoji library from Twitter. It contains images for each emoji. The `TwemojiRenderer` will render the emojis using the images from Twemoji. By default, these are rendered as SVGs.

```javascript
import { TwemojiRenderer } from 'picmo/renderers/twemoji';

const picker = createPicker({
  renderer: new TwemojiRenderer()
});
```

## Creating a custom renderer

There are other sources of emoji images available, such as [JoyPixels](https://www.joypixels.com/) and others. You can create your own renderer to fit your needs.

First, you will need to import the `Renderer` class from PicMo:

```javascript
import { Renderer } from 'picmo';
```

A `Renderer` subclass must implement two methods:

### `render`

The `render` method is given an emoji record and should return a `HTMLElement` which represents the content that will be displayed in the picker.

### `emit`

The `emit` method also receives an emoji record. This method should return the data that will be emitted when the emoji is selected. This can be an `EmojiSelection` or, for asynchronous operations, a `Promise` that resolves to an `EmojiSelection`.
