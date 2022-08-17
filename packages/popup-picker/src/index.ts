import { PickerOptions, createStyleInjector } from 'picmo';
import { PopupOptions } from './types';
import { PopupPickerController } from './popupPicker';

import css from './styles/index.css?inline';

export * from './types';
export { PopupPickerController };

const styleInject = createStyleInjector();

export function createPopup(pickerOptions: Partial<PickerOptions>, popupOptions: Partial<PopupOptions>) {
  styleInject(css);

  const popup = new PopupPickerController({
    autoFocus: 'auto',
    ...pickerOptions
  }, popupOptions);
  return popup;
}
