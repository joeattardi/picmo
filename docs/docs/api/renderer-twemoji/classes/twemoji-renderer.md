# `TwemojiRenderer`

<pre>
class TwemojiRenderer extends <a href="../../picmo/classes/renderer">Renderer</a>
</pre>

Renders emojis using the [Twemoji](https://twemoji.twitter.com/) images.

## Constructor

```javascript
new TwemojiRenderer(format: TwemojiFormat)
```

`format` determines the image format of the emitted Twemojis. It can be either `svg` (the default) or `png`. Note that this only affects the format that is emitted upon emoji selection. The `TwemojiRenderer` will always use SVGs to render emojis in the picker; it does not currently support rendering PNGs in the picker.
