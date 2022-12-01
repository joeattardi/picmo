import type { PickerOptions } from './types';

import EmojiPicker from './components/EmojiPicker.svelte';

export function createPicker(options: Partial<PickerOptions>) {
  const picker = new EmojiPicker({
    target: options.rootElement
  });

  return picker;
}
