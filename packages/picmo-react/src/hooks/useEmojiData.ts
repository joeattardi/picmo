import { Emoji, Locale, MessagesDataset } from 'emojibase';
import { useEffect, useState } from 'react';
import { DataStore, DataStoreFactory } from '../data/DataStore';
import { initDatabase } from '../data/emojiData';
import { Category, CustomEmoji } from '../data/types';
import { PickerOptions } from '../types';

export type DataStatus = 
  'IDLE' |
  'LOADING' |
  'READY' |
  'ERROR';

export type DataState = {
  status: DataStatus;
  error?: unknown | null;
  dataStore?: DataStore | null;
};

type Options = {
  locale: Locale;
  custom?: CustomEmoji[];
  dataStoreFactory: DataStoreFactory;
  messages?: MessagesDataset;
  emojiData?: Emoji[];
}

export default function useEmojiData(options: PickerOptions) {
  const { locale, dataStore: dataStoreFactory, messages, emojiData, custom } = options;
  const [categories, setCategories] = useState<Category[]>([]);
  const [dataState, setDataState] = useState<DataState>({
    status: 'IDLE'
  });

  useEffect(() => {
    async function loadInitialData() {
      try {
        const dataStore = await initDatabase(locale, dataStoreFactory, custom, messages, emojiData);
        const categories = await dataStore.getCategories(options);
        setDataState({
          status: 'READY',
          dataStore,
          error: null
        });
        setCategories(categories);
      } catch (error: unknown) {
        setDataState({
          status: 'ERROR',
          error
        });
      }
    }

    loadInitialData();
  }, []);

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

  return {
    dataState,
    categories
  };
}
