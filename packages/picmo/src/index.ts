import { Locale, MessagesDataset, Emoji } from 'emojibase';
import { initDatabase as initDatabaseInternal } from './data/emojiData';

export * from './util';
export * from './focusTrap';
export * from './options';
export * from './events';
export * from './types';
export * from './themes';
export { default as globalConfig } from './globalConfig';
export { createPicker } from './createPicker';
export { EmojiPicker } from './views/EmojiPicker';
export type { ExternalEvent, ExternalEventKey } from './ExternalEvents';

export { Renderer } from './renderers/renderer';
export { NativeRenderer } from './renderers/native';

export { default as en } from './i18n/lang-en';

export { deleteDatabase } from './data/emojiData';
import { DataStoreFactory } from './data/DataStore';
export { IndexedDbStoreFactory } from './data/IndexedDbStore';
export { InMemoryStoreFactory } from './data/InMemoryStore';

export * from './recents/index';

export async function createDatabase(locale: Locale, factory: DataStoreFactory, staticMessages?: MessagesDataset, staticEmojis?: Emoji[]): Promise<void> {
  const database = await initDatabaseInternal(locale, factory, staticMessages, staticEmojis);
  database.close();
}

