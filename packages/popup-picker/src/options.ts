import { PopupOptions } from './types';

const defaultOptions: Partial<PopupOptions> = {
  hideOnClickOutside: true,
  hideOnEmojiSelect: true,
  hideOnEscape: true,
  autoFocusSearch: true,
  position: 'auto'
};

export function getOptions(options: Partial<PopupOptions> = {}): PopupOptions {
  return { 
    ...defaultOptions,
    rootElement: document.body,
    ...options 
  } as PopupOptions;
}
