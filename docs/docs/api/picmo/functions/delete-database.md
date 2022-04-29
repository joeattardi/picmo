# `deleteDatabase`

Deletes a local emoji database.

```javascript
import { deleteDatabase } from 'picmo';
```

<pre>
deleteDatabase(locale: <a href="https://emojibase.dev/api/emojibase#Locale">Locale</a>): Promise&lt;void&gt;>
</pre>

Deletes an emoji database.

## Arguments

- `locale`: The locale for the database to be deleted.
  - **Type**: [`Locale`](https://emojibase.dev/api/emojibase#Locale)

## Return value

A `Promise` that is resolved when the database is deleted.
