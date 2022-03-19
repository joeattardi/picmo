import { LATEST_EMOJI_VERSION } from 'emojibase';
import { nanoid } from 'nanoid';

import en from './i18n/lang-en';
import { lightTheme } from './themes';
import { AppEvents } from './AppEvents';
import { EmojiPicker } from './views/EmojiPicker';
import { PickerOptions, CustomEmoji, EmojiRecord } from './types';
import { ViewFactory } from './viewFactory';
export { LazyLoader } from './LazyLoader';
import NativeRenderer from './renderers/native';
import { Database } from './db';
import { initDatabaseFromCdn, initDatabaseWithStaticData } from './emojiData';
import { Bundle } from './i18n';

const defaultOptions: PickerOptions = {
  rootElement: document.body,
  renderer: new NativeRenderer(),
  theme: lightTheme,

  showSearch: true,
  showCategoryButtons: true,
  showVariants: true,
  showRecents: true,
  showPreview: true,

  autoHide: true,
  autoFocusSearch: true,

  position: 'auto',
  emojisPerRow: 8,

  emojiVersion: parseFloat(LATEST_EMOJI_VERSION),
  maxRecents: 50,
  i18n: en,
  locale: 'en'
};

function initData(options: Required<PickerOptions>): Promise<Database> {
  if (options.emojiData && options.messages) {
    return initDatabaseWithStaticData(options.messages, options.emojiData);
  } else {
    return initDatabaseFromCdn(options.locale);
  }
}

/**
 * Creates a new emoji picker.
 * @param options The options for the emoji picker.
 * @returns a Promise that resolves to the picker when it is ready.
 */
export async function createEmojiPicker(options: PickerOptions): Promise<EmojiPicker> {
  const finalOptions = { ...defaultOptions, ...options } as Required<PickerOptions>
  
  const customEmojis: EmojiRecord[] = (finalOptions?.custom || []).map((custom: CustomEmoji) => ({
    custom: true,
    url: custom.url,
    label: custom.label,
    emoji: custom.emoji,
    tags: ['custom', ...(custom.tags || [])]
  }));

  const events = new AppEvents();
  const emojiDataPromise = initData(finalOptions);
  const i18n = new Bundle(finalOptions.i18n);

  emojiDataPromise.then(emojiData => {
    events.emit('data:ready', emojiData);
  });

  const viewFactory = new ViewFactory({
    events,
    i18n,
    customEmojis,
    renderer: finalOptions.renderer,
    options: finalOptions,
    emojiData: emojiDataPromise,
    pickerId: `EmojiPicker-${nanoid()}`
  });

  const picker = viewFactory.create(EmojiPicker);
  await picker.render();
  return picker;
}