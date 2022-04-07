import { AppEvents } from './AppEvents';
import { EmojiPicker } from './views/EmojiPicker';
import { PickerOptions, CustomEmoji, EmojiRecord } from './types';
import { ViewFactory } from './viewFactory';
export { LazyLoader } from './LazyLoader';
import { Database } from './db';
import { initDatabaseFromCdn, initDatabaseWithStaticData } from './emojiData';
import { Bundle } from './i18n';
import { getOptions } from './options';

function initData(options: PickerOptions): Promise<Database> {
  if (options.emojiData && options.messages) {
    return initDatabaseWithStaticData(options.locale, options.messages, options.emojiData);
  } else {
    return initDatabaseFromCdn(options.locale);
  }
}

let pickerIndex = 0;

function getPickerId() {
  return `picmo-${Date.now()}-${pickerIndex++}`;
}

/**
 * Creates a new emoji picker.
 * @param options The options for the emoji picker.
 * @returns a Promise that resolves to the picker when it is ready.
 */
export function createEmojiPicker(options: Partial<PickerOptions>): EmojiPicker {
  const finalOptions = getOptions(options);
  
  const customEmojis: EmojiRecord[] = (finalOptions?.custom || []).map((custom: CustomEmoji) => ({
    ...custom,
    custom: true,
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
    pickerId: getPickerId()
  });

  const picker = viewFactory.create(EmojiPicker);
  picker.renderSync();
  return picker;
}