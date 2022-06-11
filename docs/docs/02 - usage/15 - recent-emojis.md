# Recent emojis

PicMo will keep track of your most recently used emojis in the "Recently Used" category. As emojis are selected, they will be added to the "Recently Used" category.

## Recents providers

### Built-in web storage providers

By default, recent emoji data is kept in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). This is managed by the [`LocalStorageProvider`](../api/picmo/classes/local-storage-provider) class.

PicMo also includes a [`SessionStorageProvider`](../api/picmo/classes/session-storage-provider) class that uses [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) instead.

A provider is selected by passing a `recentsProvider` option to the [`createPicker`](../api/picmo/functions/create-picker) function. The value should be an *instance* of the provider class.

### Creating a custom recents provider

You can create a custom provider to store recent emojis in some other way. To do this, you need to create a class that extends from the [`RecentsProvider`](../api/picmo/classes/recents-provider) class and implement the three methods required (`clear`, `getRecents`, and `addOrUpdateRecent`).

An instance of this class should be passed to the `recentsProvider` option of the [`createPicker`](../api/picmo/functions/create-picker) function.
