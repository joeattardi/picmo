import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { DataStore } from '../data/DataStore';
import { initDatabase } from '../data/emojiData';
import { PickerOptions } from './types';

type PicMoProviderProps = {
  options: PickerOptions;
  children: ReactElement;
}

export type DataState = 
  'IDLE' |
  'LOADING' |
  'READY' |
  'ERROR';

type ContextValue = {
  data?: DataStore | null;
  error?: Error | null;
  dataState: DataState;
  options: PickerOptions;
};

export const PicMoContext = React.createContext<ContextValue>({} as ContextValue);

export default function PicMoProvider({ options, children }: PicMoProviderProps) {
  const [data, setData] = useState<DataStore | null>(null);
  const [dataState, setDataState] = useState<DataState>('IDLE');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initDatabase(options.locale, options.dataStore, options.messages, options.emojiData).then(db => {
      setData(db);
      setDataState('READY');
    }).catch((error: Error) => {
      setError(error);
      setDataState('ERROR');
    })
  }, [options.locale, options.dataStore, options.messages, options.emojiData]);

  const contextValue = useMemo(() => ({
    dataState,
    data,
    error,
    options
  }), [data, dataState, error, options]);

  return (
    <PicMoContext.Provider value={contextValue}>
      {children}
    </PicMoContext.Provider>
  );
}