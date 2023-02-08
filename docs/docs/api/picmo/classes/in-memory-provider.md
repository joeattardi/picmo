# `InMemoryProvider`

A simple [`RecentsProvider`](./recents-provider) that stores the recent emojis in memory only. They will not be persisted across page refreshes.

This is generally not desired, but if there is an error accessing `localStorage` then this is used as a fallback.
