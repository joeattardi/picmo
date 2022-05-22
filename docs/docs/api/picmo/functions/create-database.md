# `createDatabase`

Creates a local emoji database.

```javascript
import { createDatabase } from 'picmo';
```

<pre>
createDatabase(
<br />
&nbsp;&nbsp;locale: <a href="https://emojibase.dev/api/emojibase#Locale">Locale</a>,
<br />
&nbsp;&nbsp;factory: <a href="../types/data-store-factory">DataStoreFactory</a>,
<br />
&nbsp;&nbsp;staticMessages?: <a href="https://emojibase.dev/api/emojibase/interface/MessagesDataset">MessagesDataset</a> | undefined,
<br />
&nbsp;&nbsp;staticEmojis?: <a href="https://emojibase.dev/api/emojibase/interface/Emoji">Emoji</a>[] | undefined): Promise&lt;void&gt;
</pre>

Initializes an emoji database before creating a picker. The database can be populated with bundled data, or downloaded from a CDN.

A separate database is maintained for each desired locale.

To use static data, `staticMessages` and `staticEmojis` must *both* be provided. If either one of them is `undefined`, the full data will be downloaded from the CDN.

:::note

This function is provided for convenience and troubleshooting purposes. It is *not* required to use. If no database exists, it will be created and populated the first time a picker is shown.

:::

For IndexedDB databases, the name of the database in the browser will be `PicMo-<locale>`, e.g. `PicMo-en` for English.

In-memory databases are ephemeral and will be discarded when the page is closed.

## Arguments

- `locale`: The locale to use for the emoji database.
  - **Type**: [`Locale`](https://emojibase.dev/api/emojibase#Locale)
- `factory`: The data store factory to use to create the database.
  - **Type**: [`DataStoreFactory`](../types/data-store-factory)
- `staticMessages`: An optional set of static message data from the [emojibase-data](https://www.npmjs.com/package/emojibase-data) package.
  - **Type**: [`MessagesDataset`](https://emojibase.dev/api/emojibase/interface/MessagesDataset) | `undefined`
  - **Default value**: `undefined`
- `staticEmojis`: An optional array of static `Emoji` records from the [emojibase-data](https://www.npmjs.com/package/emojibase-data) package.
  - **Type**: [`Emoji[]`](https://emojibase.dev/api/emojibase/interface/Emoji) | `undefined`
  - **Default value**: `undefined`

## Return value

A `Promise` that is resolved when the database is ready.
