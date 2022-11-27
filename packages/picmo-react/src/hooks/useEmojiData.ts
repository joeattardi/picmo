import { Emoji, Locale, MessagesDataset } from 'emojibase';
import { useEffect, useState } from 'react';
import { DataStore, DataStoreFactory } from '../data/DataStore';
import { initDatabase } from '../data/emojiData';
import { CustomEmoji } from '../data/types';

export type DataStatus = 
  'IDLE' |
  'LOADING' |
  'READY' |
  'ERROR';

export type DataState = {
  status: DataStatus;
  error?: Error | null;
  dataStore?: DataStore | null;
};

type Options = {
  locale: Locale;
  custom?: CustomEmoji[];
  dataStoreFactory: DataStoreFactory;
  messages?: MessagesDataset;
  emojiData?: Emoji[];
}

export default function useEmojiData({
  locale,
  dataStoreFactory,
  messages,
  emojiData,
  custom
}: Options) {
  const [dataState, setDataState] = useState<DataState>({
    status: 'IDLE'
  });

  useEffect(() => {
    initDatabase(locale, dataStoreFactory, custom, messages, emojiData).then(dataStore => {
      setDataState({
        status: 'READY',
        dataStore,
        error: null
      });
    }).catch((error: Error) => {
      setDataState({
        status: 'ERROR',
        error
      });
    })
  }, [locale, custom, dataStoreFactory, messages, emojiData]);

  return dataState;
}
