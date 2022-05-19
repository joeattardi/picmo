import { Locale, MessagesDataset, Emoji } from 'emojibase';
import { initDatabase as initDatabaseInternal } from './data/emojiData';

export { createPicker } from './createPicker';
export { Renderer } from './renderers/renderer';
export { deleteDatabase } from './data/emojiData';
export { clear as deleteRecents } from './recents';
export { EmojiPicker } from './views/EmojiPicker';
export * from './util';
export * from './focusTrap';
export * from './options';
export * from './events';
export { ExternalEvent, ExternalEventKey } from './ExternalEvents';
export * from './types';
export * from './themes';
import { DataStoreFactory } from './data/DataStore';
export { NativeRenderer } from './renderers/native';
export { default as en } from './i18n/lang-en';
export { IndexedDbStoreFactory } from './data/IndexedDbStore';
export { InMemoryStoreFactory } from './data/InMemoryStore';

export async function createDatabase(locale: Locale, factory: DataStoreFactory, staticMessages?: MessagesDataset, staticEmojis?: Emoji[]): Promise<void> {
  const database = await initDatabaseInternal(locale, factory, staticMessages, staticEmojis);
  database.close();
}

