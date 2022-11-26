import themes from '../themes.module.css';

import { PickerOptions, Theme } from './types';
import { IndexedDbStoreFactory } from '../data/IndexedDbStore';
import PicMoProvider from './PicMoProvider';
import PickerContent from './PickerContent';

export default function EmojiPicker({ 
  theme = themes.light as Theme,
  dataStore = IndexedDbStoreFactory,
  locale = 'en',
  ...props
}: PickerOptions) {
  const providerProps = {
    theme,
    dataStore,
    locale,
    ...props
  };

  return (
    
    <PicMoProvider options={providerProps}>
      <PickerContent />
    </PicMoProvider>
  );
}

