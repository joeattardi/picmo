import styleInject from 'style-inject';
import { PickerOptions, globalConfig } from 'picmo';
import { PopupOptions } from './types';
import { PopupPickerController } from './popupPicker';

import css from './index.css?inline';

export * from './types';
export { PopupPickerController };

let cssLoaded = false;

export function createPopup(pickerOptions: Partial<PickerOptions>, popupOptions: Partial<PopupOptions>) {
  if (globalConfig.injectStyles && !cssLoaded) {
    styleInject(css);
    cssLoaded = true;
  }

  const popup = new PopupPickerController({
    autoFocus: 'auto',
    ...pickerOptions
  }, popupOptions);
  return popup;
}
