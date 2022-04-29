# Emoji versions

PicMo supports all sets of emojis up to the [Emoji 14.0](http://unicode.org/versions/Unicode14.0.0/) standard. However, not all browsers or operating systems will support this version of the Emoji standard.

Any emoji with a version greater than the current version will not be shown. This applies to top-level emojis as well as any variants tagged with a version.

The set of emojis available to select in PicMo can be set in two ways:

## Automatic selection (default behavior)

When creating a picker, PicMo will attempt to render an emoji from each version, starting at the latest available. If this emoji is not rendered correctly by the browser, this version is not supported and will be skipped. This will repeat until a representative emoji from a given version is rendered correctly, and then the version will be selected.

This is the default behavior, but can also be used by setting the `emojiVersion` option to `auto`.

## Manual selection

If you want finer control over the available emojis, you can set the `emojiVersion` option to a specific version number. This will cause PicMo to only render emojis from that version.

The currently available versions are:

- 1.0
- 2.0
- 3.0
- 4.0
- 5.0
- 11.0
- 12.0
- 12.1
- 13.0
- 13.1
- 14.0
