import { Locale, MessagesDataset, fetchMessages, fetchEmojis, Emoji } from 'emojibase';
import { Database } from './db';

/**
 * Generates the URLs for emoji data for a given emojibase version and locale.
 * 
 * @param version the emojibase version (usually 'latest' is what you want)
 * @param locale the locale for the data
 * @returns an object containing the two URLs
 */
function getCdnUrls(version, locale) {
  const base = `https://cdn.jsdelivr.net/npm/emojibase-data@${version}/${locale}`;

  return {
    emojisUrl: `${base}/data.json`,
    messagesUrl: `${base}/messages.json`,
  };
}

/**
 * Gets the ETag for the given URL by making a HEAD request.
 * 
 * @param url the URL to check
 * @returns the ETag value, or null if no ETag was found
 */
async function getEtag(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.headers.get('etag');
  } catch (error) {
    return null;
  }
}

/**
 * Gets the ETags for the emoji and message data.
 * 
 * @param emojisUrl the URL of the emoji data
 * @param messagesUrl the URL of the message data
 * @returns a Promise that resolves to an array of the ETag values
 */
function getEtags(emojisUrl, messagesUrl): Promise<Array<string | null>> {
  return Promise.all([
    getEtag(emojisUrl),
    getEtag(messagesUrl),
  ]);
}

/**
 * Checks if the category or emoji data is out of date.
 * 
 * This is determined by checking the ETag of the data from the CDN, and downloading the latest if the
 * ETags don't match.
 * 
 * @param db the database
 * @param emojisEtag the ETag of the emojis data
 * @param messagesEtag the ETag of the messages data
 */
async function checkUpdates(db: Database, emojisEtag: string | null, messagesEtag: string | null) {
  const { storedEmojisEtag, storedMessagesEtag } = await db.getEtags();

  // If either ETag does not match, repopulate the database with the latest CDN data
  if (messagesEtag !== storedMessagesEtag || emojisEtag !== storedEmojisEtag) {
    const [messages, emojis] = await Promise.all([fetchMessages(db.locale), fetchEmojis(db.locale)]);
    await db.populate(messages.groups, emojis, emojisEtag, messagesEtag);
  }
}

/**
 * Opens the database and prepares it for use.
 * 
 * If the database does not exist, it will be created and populated (via the populate callback).
 * If the database exists but the data is out of date (etags do not match), the data will be repopulated.
 * 
 * @param locale the locale for the database
 * @param populateCallback A function that will be called if the database needs to be populated with data.
 * 
 * @returns a Promise that resolves to the database once it's ready and populated with data
 */
async function initDatabase(locale: Locale, populateCallback: (db: Database, emojisEtag: string | null, messagesEtag: string | null) => Promise<void>) {
  const db = new Database(locale);
  await db.open();

  const { emojisUrl, messagesUrl } = getCdnUrls('latest', locale);
  const [emojisEtag, messagesEtag] = await getEtags(emojisUrl, messagesUrl);

  if (!(await db.isPopulated())) {
    await populateCallback(db, emojisEtag, messagesEtag);
  } else if (emojisEtag || messagesEtag) {
    await checkUpdates(db, emojisEtag, messagesEtag);
  }

  return db;
}

/**
 * Initializes the database with statically provided data.
 * 
 * @param locale the locale for the database
 * @param messages the static message data
 * @param emojis the static emoji data
 * @returns a Promise that resolves when the database is ready
 */
export async function initDatabaseWithStaticData(locale: Locale, messages: MessagesDataset, emojis: Emoji[]) {
  return initDatabase(locale, db => db.populate(messages.groups, emojis));
}

/**
 * Initializes the database, using data from a CDN.
 * @param locale the locale for the database
 * @returns a Promise that resolves when the database is ready
 */
export async function initDatabaseFromCdn(locale: Locale) {
  return initDatabase(locale, async (db, emojisEtag, messagesEtag) => {
    const [messages, emojis]: [MessagesDataset, Emoji[]] = await Promise.all([
      fetchMessages(locale),
      fetchEmojis(locale)
    ]);

    return db.populate(messages.groups, emojis, emojisEtag, messagesEtag);
  });
}
