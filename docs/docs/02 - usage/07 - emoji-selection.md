# Emoji selection

When an emoji is selected in the picker, it will emit an `emoji:select` event with an [`EmojiSelection`](../api/picmo/types/emoji-selection) object containing information about the emoji that was selected. 

## Native emojis

When selecting a native emoji, this object will have these properties:

- `emoji`: The emoji character itself.
- `hexcode`: The hex code sequence for this emoji.
- `label`: The localized label of the emoji.

```javascript
{
  emoji: '😀',
  hexcode: '1F600',
  label: 'grinning face',
}
```

:::note

If you are displaying the native emoji somewhere else on the page, like in a text field or button, make sure the system emoji font is used, otherwise some emojis will not render correctly. Different platforms have different emoji fonts.

You can usually take care of this with a single line of CSS specifying all of the platforms' emoji fonts:

```css
  font-family: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI',
    'Apple Color Emoji', 'Twemoji Mozilla', 'Noto Color Emoji', 'EmojiOne Color',
    'Android Emoji';
```

:::

## Twemoji emojis

Along with the native emoji data, a Twemoji emit will also include the URL to the Twemoji image:

```javascript
{
  emoji: '😀',
  hexcode: '1F600',
  label: 'grinning face',
  url: 'https://twemoji.maxcdn.com/v/14.0.1/svg/1f600.svg'
}
```

## Custom images

A [custom image](./custom) contains the base emoji data, the image URL, and any arbitrary data that was passed as the `data` property:

```javascript
{
  emoji: 'kitty1',
  label: 'Cute kitty',
  url: 'https://placekitten.com/200/200',
  data: { id: 1 }
}
```

```javascript
const picker = createPicker();

picker.on('emoji:select', selection => {
  console.log('Selected emoji: ', selection.emoji);
});
```
