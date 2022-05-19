import { Locale, MessagesDataset, fetchMessages, fetchEmojis, Emoji } from 'emojibase';
// import { Database } from './db';
import { DataStoreFactory, DataStore } from './DataStore';
import { computeHash } from '../util';

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
function getEtags(locale): Promise<Array<string | null>> {
  const { emojisUrl, messagesUrl } = getCdnUrls('latest', locale);

  try {
    return Promise.all([
      getEtag(emojisUrl),
      getEtag(messagesUrl),
    ]);
  } catch (error) {
    return Promise.all([null, null]);
  }
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
async function checkUpdates(db: DataStore, emojisEtag: string, messagesEtag: string) {
  let etags;

  try {
    etags = await db.getEtags();
  } catch (error) {
    etags = {};
  }

  const { storedEmojisEtag, storedMessagesEtag } = etags;

  // If either ETag does not match, repopulate the database with the latest CDN data
  if (messagesEtag !== storedMessagesEtag || emojisEtag !== storedEmojisEtag) {
    const [messages, emojis] = await Promise.all([fetchMessages(db.locale), fetchEmojis(db.locale)]);
    await db.populate({
      groups: messages.groups, 
      emojis,
      emojisEtag,
      messagesEtag
    });
  }
}

/**
 * Checks for a new version of local emoji data. This is done by comparing the stored hash with the 
 * newly computed one.
 * 
 * @param db The database
 * @param hash The hash of the local emoji data
 * @returns true if there is a hash mismatch and a database update is required
 */
async function checkLocalUpdates(db: DataStore, hash: string) {
  const storedHash = await db.getHash();
  return hash !== storedHash;
}

/**
 * Opens the database.
 * 
 * @param locale the database locale
 * @param existingDb any existing database to use
 * @returns Promise that resolves to the database instance
 */
async function openDatabase(locale: Locale, factory: DataStoreFactory, existingDb?: DataStore): Promise<DataStore> {
  const db = existingDb || factory(locale);
  await db.open();
  return db;
}

/**
 * Initializes an emoji database with data from the CDN.
 * 
 * @param locale the locale for the database
 * @param existingDb any existing database to repopulate
 * @returns a Promise that resolves to a fully populated database instance
 */
async function initDatabaseFromCdn(locale: Locale, factory: DataStoreFactory, existingDb?: DataStore) {
  const db = await openDatabase(locale, factory, existingDb);

  const [emojisEtag, messagesEtag] = await getEtags(locale);

  if (!(await db.isPopulated())) {
    const [messages, emojis] = await Promise.all([fetchMessages(locale), fetchEmojis(locale)]);
    await db.populate({ groups: messages.groups, emojis, emojisEtag, messagesEtag });
  } else if (emojisEtag && messagesEtag) {
    await checkUpdates(db, emojisEtag, messagesEtag);
  }

  return db;
}

/**
 * Initializes an emoji database with local data from the emojibase-data package.
 * 
 * @param locale the locale
 * @param messages the messages dataset
 * @param emojis the emoji dataset
 * @param existingDb any existing database to repopulate
 * @returns a Promise that resolves to a fully populated database instance
 */
async function initDatabaseWithLocalData(locale: Locale, factory: DataStoreFactory, messages: MessagesDataset, emojis: Emoji[], existingDb?: DataStore) {
  const db = await openDatabase(locale, factory, existingDb);

  const hash = await computeHash(emojis);
  if (!(await db.isPopulated()) || await checkLocalUpdates(db, hash)) {
    await db.populate({ groups: messages.groups, emojis, hash });
  }

  return db;
}

/**
 * Public API for initializing a database.
 * 
 * @param locale the locale
 * @param staticMessages local messages dataset, if any
 * @param staticEmojis local emoji dataset, if any
 * @param existingDb any existing database to repopulate
 * @returns a Promise that resolves to the database instance
 */
export async function initDatabase(locale: Locale, factory: DataStoreFactory, staticMessages?: MessagesDataset, staticEmojis?: Emoji[], existingDb?: DataStore) {
  if (staticMessages && staticEmojis) {
    return initDatabaseWithLocalData(locale, factory, staticMessages, staticEmojis, existingDb);
  } else {
    return initDatabaseFromCdn(locale, factory, existingDb);
  }
}

/**
 * Deletes a database instance for a locale.
 * @param locale the locale to delete
 */
export function deleteDatabase(factory: DataStoreFactory, locale: Locale) {
  factory.deleteDatabase(locale);
}
