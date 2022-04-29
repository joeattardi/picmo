# Emoji data

PicMo uses data provided by the [Emojibase](https://emojibase.dev/) project. To keep the bundle size down, the emoji data is not bundled with the main library. 

The data can be sourced in two ways:

## Downloaded from CDN

If no static emoji data is provided to the picker, it will use a CDN to download the data. This is the default behavior.

### Keeping up to date

When the picker is initialized, a `HEAD` request is made to the CDN to check if the data has changed (by comparing the [ETags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) with ones previously stored in the database). If there is new data available, the picker will download the new data and replace the old data with it.

## Provided static data

If you do not want to connect to an external CDN to download the data, you can provide the data in your bundle. To do this you will need to install the [emojibase-data](https://www.npmjs.com/package/emojibase-data) package.

Simply import the data for the desired locale into your project. The picker needs the emoji data itself as well as the category names.

```javascript
import emojiData from 'emojibase-data/<locale>/data.json';
import messages from 'emojibase-data/<locale>/messages.json';

const picker = createPicker({
  emojiData,
  message
});
```

## Emoji database

Once the data is available, whether provided in the bundle or downloaded from the CDN, it is used to populate an IndexedDB database of the emoji data. Databases are locale-specific - a new database is created per locale used by the picker.

The database is automatically created when the picker is first initialized if it one does not already exist. However, you can also pre-create the database ahead of time by calling [`createDatabase`](../api/picmo/functions/create-database).

All picker instances share the same database.

### Checking for updates

When data is initially downloaded from a CDN, the ETag values for each bundle is stored in the database. For every subsequent picker initialization, a `HEAD` request is made and the ETags are compared to determine if new data needs to be downloaded.

### TBD: How does locally supplied data get checked for updates?

### Error recovery

If there are any errors encountered while initializing or accessing the database, an error message is shown with a retry button. Clicking the retry button will delete the (possibly corrupt) database and re-initialize it with fresh data.

## Recent emoji data

The picker remembers recently used emojis. This data is stored in the browser's `localStorage` instead of the database.
