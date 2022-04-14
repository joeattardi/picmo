# `PopupPickerController`

Controls the lifecycle of a popup picker. The controller has an underlying [`EmojiPicker`](./emoji-picker) that is rendered in the popup.

## Properties

### `isOpen`: `boolean`

Reflects the current visibility state of the picker.

### `picker`: [`EmojiPicker`](./emoji-picker)

The picker being managed by this controller

## Methods

### `addEventListener`: `void`

```javascript
addEventListener(event: ExternalEvent, callback: EventCallback)
```

Adds an event listener to the picker.

#### Arguments

##### `event`: [`ExternalEvent`](../types/external-event)

The event to listen for.

##### `listener`: `function`

The function to call when this event is emitted.

### `close`: `Promise<void>`

Closes the picker.

#### Return value

A `Promise` that resolves when the picker has closed.

### `destroy`: `Promise<void>`

Destroys the picker when it is no longer needed. After calling this method, the picker will no longer be usable.

If the picker is currently open, it will be closed first.

#### Return value

A `Promise` that resolves when the picker has been closed and destroyed.

### `open`: `Promise<void>`

Opens the picker.

#### Return value

A `Promise` that resolves when the picker has opened.

### `removeEventListener`: `void`

```javascript
picker.removeEventListener(event: ExternalEvent, callback: EventCallback)
```

Removes an event listener from the picker.

#### Arguments

##### `event`: [`ExternalEvent`](../types/external-event)

The event to stop listening for.

##### `listener`: `function`

The previously registered event handler.

### `toggle`: `Promise<void>`

Toggles the state of the picker. If it is closed, it will be opened; if it is open, it will be closed.