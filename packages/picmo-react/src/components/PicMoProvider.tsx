import React, { ReactElement, useMemo } from 'react';
import { PickerOptions } from '../types';

import useEmojiData, { DataState } from '../hooks/useEmojiData';
import { Category } from '../data';

type PicMoProviderProps = {
  options: PickerOptions;
  children: ReactElement;
}

type ContextValue = {
  dataState: DataState;
  categories: Category[];
  options: PickerOptions;
};

export const PicMoContext = React.createContext<ContextValue>({} as ContextValue);

export default function PicMoProvider({ options, children }: PicMoProviderProps) {
  const { dataState, categories } = useEmojiData(options);

  const contextValue = useMemo<ContextValue>(() => ({
    dataState,
    categories,
    options
  }), [dataState, categories, options]);

  return (
    <PicMoContext.Provider value={contextValue}>
      {children}
    </PicMoContext.Provider>
  );
}