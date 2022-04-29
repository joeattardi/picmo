# `PopupPickerController`

Controls the lifecycle of a popup picker. The controller has an underlying [`EmojiPicker`](../../picmo/classes/emoji-picker) that is rendered in the popup.

## Properties

### `isOpen`

- **Type**: `boolean`

Reflects the current  visibility state of the picker.

### `picker`

- **Type**: [`EmojiPicker`](../../picmo/classes/emoji-picker)

The picker being managed by this controller

## Methods

### `addEventListener`

<pre>
addEventListener(event: <a href="../types/popup-event">PopupEvent</a>,
callback: function): void
</pre>

Adds an event listener to the picker.

#### Arguments

- `event`: The event to listen for.
  - **Type**: [`PopupEvent`](../types/popup-event)
- `listener`: The function to call when this event is emitted.
  - **Type**: `function`

### `close`

```
close(): Promise<void>
```

Closes the picker.

#### Return value

A `Promise` that resolves when the picker has closed.

### `destroy`

```
destroy(): Promise<void>
```

Destroys the picker when it is no longer needed. After calling this method, the picker will no longer be usable.

If the picker is currently open, it will be closed before being destroyed.

#### Return value

A `Promise` that resolves when the picker has been closed and destroyed.

### `open`

```
open(): Promise<void>
```

Opens the picker.

#### Return value

A `Promise` that resolves when the picker has opened.

### `removeEventListener`

<pre>
removeEventListener(event: <a href="../types/popup-event">PopupEvent</a>,
callback: function): void
</pre>

Removes an event listener from the picker.

#### Arguments

- `event`: The event to stop listening for.
  - **Type**: [`PopupEvent`](../types/popup-event)
- `listener`: The previously registered listener function to remove.
  - **Type**: `function`

### `toggle`

```
toggle(): Promise<void>
```

Toggles the state of the picker. If it is closed, it will be opened; if it is open, it will be closed.
