import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { DataStore } from '../data/DataStore';
import { initDatabase } from '../data/emojiData';
import { PickerOptions } from './types';

type PicMoProviderProps = {
  options: PickerOptions;
  children: ReactElement;
}

type ContextValue = {
  data: DataStore | null;
  options: PickerOptions;
};

export const PicMoContext = React.createContext<ContextValue>({} as ContextValue);

export default function PicMoProvider({ options, children }: PicMoProviderProps) {
  const [data, setData] = useState<DataStore | null>(null);

  useEffect(() => {
    initDatabase(options.locale, options.dataStore, options.messages, options.emojiData).then(db => {
      setData(db);
    })
  }, [options.locale, options.dataStore, options.messages, options.emojiData]);

  const contextValue = useMemo(() => ({
    data,
    options
  }), [data, options]);

  return (
    <PicMoContext.Provider value={contextValue}>
      {children}
    </PicMoContext.Provider>
  );
}