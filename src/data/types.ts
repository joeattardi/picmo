import type { DataStore } from './DataStore';

export type DataStatus = 'IDLE' | 'LOADING' | 'READY' | 'ERROR';

export type DataState = {
  status: DataStatus;
  error?: unknown | null;
  dataStore?: DataStore | null;
};

export type EmojiRecord = {
  custom?: boolean;
  data?: object;
  emoji: string;
  hexcode?: string;
  label: string;
  order?: number;
  skins?: EmojiRecord[];
  tags?: string[];
  url?: string;
  version?: number;
};

export type CustomEmoji = {
  emoji: string;
  label: string;
  url: string;
  tags?: string[];
  data?: object;
};

export type CategoryKey =
  | 'activities'
  | 'animals-nature'
  | 'custom'
  | 'flags'
  | 'food-drink'
  | 'objects'
  | 'people-body'
  | 'recents'
  | 'smileys-emotion'
  | 'symbols'
  | 'travel-places';

export type Category = {
  key: CategoryKey;
  message?: string;
  order: number;
};
