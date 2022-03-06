import { Locale, fetchMessages, fetchEmojis } from 'emojibase';
import { Database } from './db';

export async function initDatabase(locale: Locale) {
  const db = new Database();
  await db.open();
  
  if (!(await db.isPopulated())) {
    const [messages, emojis] = await Promise.all([
      fetchMessages(locale),
      fetchEmojis(locale)
    ]);
    await db.populate(messages.groups, emojis);
  }

  return db;
}
