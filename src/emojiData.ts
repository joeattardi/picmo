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

export async function initDatabase(locale: Locale, staticMessages?: MessagesDataset, staticEmojis?: Emoji[], existingDb?: Database) {
  const db = existingDb || new Database(locale);
  await db.open();

  const { emojisUrl, messagesUrl } = getCdnUrls('latest', locale);
  const [emojisEtag, messagesEtag] = await getEtags(emojisUrl, messagesUrl);

  if (!(await db.isPopulated())) {
    let messages = staticMessages;
    let emojis = staticEmojis;

    if (!messages || !emojis) {
      [messages, emojis] = await Promise.all([fetchMessages(locale), fetchEmojis(locale)]);
    }

    await db.populate(messages.groups, emojis, emojisEtag, messagesEtag);
  } else if (emojisEtag || messagesEtag) {
    await checkUpdates(db, emojisEtag, messagesEtag);
  }

  return db;
}
