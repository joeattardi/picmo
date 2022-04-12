import { Locale, MessagesDataset, Emoji } from 'emojibase';
import { initDatabase as initDatabaseInternal } from './emojiData';

export { createPicker } from './createPicker';
export { createPopup } from './createPopup';
export { Renderer } from './renderers/renderer';
export { deleteDatabase } from './emojiData';
export { clear as deleteRecents } from './recents';

export async function createDatabase(locale: Locale, staticMessages?: MessagesDataset, staticEmojis?: Emoji[]): Promise<void> {
  const database = await initDatabaseInternal(locale, staticMessages, staticEmojis);
  database.close();
}
