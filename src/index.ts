import type { PickerOptions } from './types';
import EmojiPicker from './components/EmojiPicker.svelte';

export { default as EmojiPicker } from './elements/EmojiPicker';
export type { EmojiRecord } from './data/types';
// export * from './data/types';

export function createPicker(options: Partial<PickerOptions>) {
  const picker = new EmojiPicker({
    target: options.rootElement,
    props: { options }
  });

  return picker;
}
