# `EmojiPicker`

The main emoji picker component. 

Not created directly, but rather as a result of calling the [`createPicker`](../functions/create-picker) function, which returns a fully initialized instance.

## Methods

### `addEventListener`

<pre>
addEventListener(event: <a href="../types/external-event">ExternalEvent</a>,
callback: function): void
</pre>

Adds an event listener to the picker.

#### Arguments

- `event`: The event to listen for.
  - **Type**: [`ExternalEvent`](../types/external-event)
- `listener`: The function to call when this event is emitted.
  - **Type**: `function`

### `clearRecents`

```
clearRecents(): void
```

Removes all recent emojis from the picker, as managed by the recents provider.

### `destroy`

```
destroy(): void
```

Destroys the picker when it is no longer needed. After calling this method, the picker will no longer be usable.

### `removeEventListener`

<pre>
removeEventListener(event: <a href="../types/external-event">ExternalEvent</a>,
callback: function): void
</pre>

Removes an event listener from the picker.

#### Arguments

- `event`: The event to remove the listener from.
  - **Type**: [`ExternalEvent`](../types/external-event)
- `listener`: The previously registered listener function to remove.
  - **Type**: `function`

### `reset`

```
reset(): void
```

Resets the picker back to its initial state.

### `updateOptions`

<pre>
updateOptions(options: <a href="../types/updatable-options">UpdatableOptions</a>): void
</pre>

Updates picker options after the picker has been created. Updated options take effect immediately. 

Not all options are updatable; see [`UpdatableOptions`](../types/updatable-options) for a list of supported options.
