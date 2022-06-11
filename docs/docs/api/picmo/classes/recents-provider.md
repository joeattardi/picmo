# `RecentsProvider`

Abstract base class that provides a storage mechanism for remembering recently selected emojis.

To create a custom recents provider, create a subclass of `RecentsProvider`.

```
import { RecentsProvider } from 'picmo';
```

## Methods

### `clear`

```
clear(): void
```

Removes all stored recent emojis.

### `getRecents`

<pre>
getRecents(maxCount: number): <a href="../types/emoji-record">EmojiRecord</a>[]
</pre>

Gets the current set of recent emojis. The returned list will be truncated to satisfy the `maxCount` parameter.

### `addOrUpdateRecent`

<pre>
addOrUpdateRecent(emoji: <a href="../types/emoji-record">EmojiRecord</a>, maxCount: number): void
</pre>

Adds a new recent emoji to the list, or updates an existing one if it already exists.
