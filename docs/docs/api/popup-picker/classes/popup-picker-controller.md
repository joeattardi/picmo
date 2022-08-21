# `PopupPickerController`

Controls the lifecycle of a popup picker. The controller has an underlying [`EmojiPicker`](../../picmo/classes/emoji-picker) that is rendered in the popup.

## Properties

### `isOpen`

- **Type**: `boolean`

Reflects the current  visibility state of the picker.

### `picker`

- **Type**: [`EmojiPicker`](../../picmo/classes/emoji-picker)

The picker being managed by this controller.

### `referenceElement`

- **Type**: `HTMLElement | undefined`

The current reference element, if any, used for positioning the popup.

This defaults to the value passed in the [`PopupOptions`](../types/popup-options), if any. If the picker is opened with a new reference element, this property will be updated with the new reference element.

### `triggerElement`

- **Type**: `HTMLElement | undefined`

The current trigger element, if any, used to toggle the popup.

This defaults to the value passed in the [`PopupOptions`](../types/popup-options), if any. If the picker is opened with a new trigger element, this property will be updated with the new trigger element.

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

<pre>
open(options: <a href="../types/popup-options">PopupOptions</a> | undefined): Promise&lt;void&gt;
</pre>

Opens the picker.

#### Arguments

- `options`: Optional options object to set new reference and trigger elements.
  - **Type**: [`OpenOptions`](../types/open-options)

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

<pre>
toggle(options: <a href="../types/popup-options">PopupOptions</a> | undefined): Promise&lt;void&gt;
</pre>

Toggles the state of the picker. If it is closed, it will be opened with the specified options; if it is open, it will be closed.

#### Arguments

- `options`: Optional options object to pass when toggling the picker open.
  - **Type**: [`OpenOptions`](../types/open-options.md)

#### Return value

A `Promise` that resolves when the picker has finished opening or closing.
