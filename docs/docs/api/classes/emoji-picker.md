# `EmojiPicker`

The main UI component. Not created directly, but rather as a result of calling the [`createPicker`](../functions/create-picker) function, which returns a fully initialized instance.

## Methods

### `addEventListener`: `void`

```javascript
picker.addEventListener(event: ExternalEvent, callback: EventCallback)
```

Adds an event listener to the picker.

#### Arguments

##### `event`: [`ExternalEvent`](../types/external-event)

The event to listen for.

##### `listener`: `function`

The function to call when this event is emitted.

### `destroy`: `void`

```javascript
picker.destroy();
```

Destroys the picker when it is no longer needed. After calling this method, the picker will no longer be usable.

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

### `reset`: `void`

Resets the picker back to its initial state.
