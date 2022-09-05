import { createContext } from '@lit-labs/context';
import { DataStore } from '../data/DataStore';

export const dataContext = createContext<DataStore>('emojiData');
