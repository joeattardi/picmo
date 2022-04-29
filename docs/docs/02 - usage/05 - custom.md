# Custom images

In addition to emojis defined by the Unicode standard, you can add your own custom images to the picker. This is similar to other pickers, such as the ones in Slack or Discord.

Data about custom images are passed in the optional `custom` array in the [`PickerOptions`](../api/picmo/types/picker-options) object.

## Defining custom images

The `custom` array includes [`CustomEmoji`](../api/picmo/types/custom-emoji) objects.

The value of the `emoji` property for each item must be unique. It serves as a unique key to identify the image.

### Arbitrary data

A custom image can also have arbitrary data associated with it. This data is stored in the `data` property of the [`CustomEmoji`](../api/picmo/types/custom-emoji) object. When a custom image is selected, this data is included in the emitted data.

### Tags

A custom image automatically is assigned the `custom` tag. You can define your own additional tags in the `tags` array.

```javascript
const custom = [
  { 
    emoji: 'kitty1', 
    label: 'Cute kitty', 
    url: 'https://placekitten.com/200/200', 
    tags: ['cute', 'cat', 'kitty'],
    data: { id: 1 }
  }
]
```