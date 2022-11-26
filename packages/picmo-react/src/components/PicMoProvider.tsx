import React, { ReactElement, useMemo } from 'react';
import { PickerOptions } from './types';

import useEmojiData, { DataState } from '../hooks/useEmojiData';

type PicMoProviderProps = {
  options: PickerOptions;
  children: ReactElement;
}

type ContextValue = {
  dataState: DataState;
  options: PickerOptions;
};

export const PicMoContext = React.createContext<ContextValue>({} as ContextValue);

export default function PicMoProvider({ options, children }: PicMoProviderProps) {
  const dataState = useEmojiData({
    locale: options.locale,
    dataStoreFactory: options.dataStore,
    messages: options.messages,
    emojiData: options.emojiData
  });

  const contextValue = useMemo(() => ({
    dataState,
    options
  }), [dataState, options]);

  return (
    <PicMoContext.Provider value={contextValue}>
      {children}
    </PicMoContext.Provider>
  );
}