# `createPicker`

```javascript
import { createPicker } from 'picmo';
```

```javascript
createPicker(options: PickerOptions): EmojiPicker
```

Creates an emoji picker that is displayed inline on a page.

After it is created, the picker will be automatically inserted into the root element specified in the [`PickerOptions`](./picker-options) object.

## Arguments

### `options`: [`PickerOptions`](./picker-options)

The options to use when creating the picker.

`createPicker` supports the following options:

## Return value

The `EmojiPicker` instance that was created.