import { PopupOptions } from './types';

const defaultOptions: Partial<PopupOptions> = {
  hideOnClickOutside: true,
  hideOnEmojiSelect: true,
  hideOnEscape: true,
  position: 'auto',
  showCloseButton: true
};

export function getOptions(options: Partial<PopupOptions> = {}): PopupOptions {
  return { 
    ...defaultOptions,
    rootElement: document.body,
    ...options 
  } as PopupOptions;
}
