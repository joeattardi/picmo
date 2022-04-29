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

[Twemoji](https://twemoji.twitter.com/) is a free emoji library from Twitter. It contains images for each emoji. The [`TwemojiRenderer`](../api/renderer-twemoji/classes/twemoji-renderer) will render the emojis using the images from Twemoji. By default, these are rendered as SVGs. PNGs can be used instead by passing `png` as the `format` option to the renderer constructor.

```javascript
import { TwemojiRenderer } from 'picmo/renderers/twemoji';

const picker = createPicker({
  renderer: new TwemojiRenderer()
});
```

For more information on Twemoji, see [the project page](https://twemoji.twitter.com/).

## Renderer trade-offs

The built-in renderers (native and Twemoji) both have pros and cons.

- The [`NativeRenderer`](../api/picmo/classes/native-renderer) renders quickly because all the emojis are text nodes. However, because new emojis must be added via an operating system update, this may limit the available emojis. Also, the emojis will appear differently depending on the operating system.

- The [`TwemojiRenderer`](../api/renderer-twemoji/classes/twemoji-renderer) has a consistent cross-platform look for emojis. It generally will get support for new emojis before operating systems do. However, there is a performance cost because each emoji is an individual image file (Twemoji does not use a sprite sheet).

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
