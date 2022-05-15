import { Locale, MessagesDataset, Emoji } from 'emojibase';
import { initDatabase as initDatabaseInternal } from './emojiData';

export { createPicker } from './createPicker';
export { Renderer } from './renderers/renderer';
export { deleteDatabase } from './emojiData';
export { clear as deleteRecents } from './recents';
export { EmojiPicker } from './views/EmojiPicker';
export * from './util';
export * from './focusTrap';
export * from './options';
export * from './events';
export { ExternalEvent, ExternalEventKey } from './ExternalEvents';
export * from './types';
export * from './themes';
export { NativeRenderer } from './renderers/native';
export { default as en } from './i18n/lang-en';

export async function createDatabase(locale: Locale, staticMessages?: MessagesDataset, staticEmojis?: Emoji[]): Promise<void> {
  const database = await initDatabaseInternal(locale, staticMessages, staticEmojis);
  database.close();
}

