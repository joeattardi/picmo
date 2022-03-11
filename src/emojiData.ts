import { Locale, MessagesDataset, fetchMessages, fetchEmojis, Emoji } from 'emojibase';
import { Database } from './db';

async function initDatabase(populateCallback: (db: Database) => Promise<void>) {
  const db = new Database();
  await db.open();

  if (!(await db.isPopulated())) {
    await populateCallback(db);
  }

  return db;
}

export async function initDatabaseWithStaticData(messages: MessagesDataset, emojis: Emoji[]) {
  return initDatabase(db => {
    return db.populate(messages.groups, emojis);
  });
}

export async function initDatabaseFromCdn(locale: Locale) {
  return initDatabase(async db => {
    const [messages, emojis]: [MessagesDataset, Emoji[]] = await Promise.all([
      fetchMessages(locale),
      fetchEmojis(locale)
    ]);

    return db.populate(messages.groups, emojis);
  });
}
