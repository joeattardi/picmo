import { PickerOptions } from 'picmo';
import { PopupOptions } from './types';
import { PopupPickerController } from './popupPicker';

export * from './types';

export function createPopup(pickerOptions: Partial<PickerOptions>, popupOptions: Partial<PopupOptions>) {
  console.log('hi');
  const popup = new PopupPickerController(pickerOptions, popupOptions);
  return popup;
}
