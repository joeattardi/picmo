import type { Emoji, GroupMessage, Locale } from 'emojibase';
import type { EmojiRecord, Category, CustomEmoji } from './types';
import type { PickerOptions } from '../types';
import { caseInsensitiveIncludes } from '../util';

export type PopulateOptions = {
  groups: GroupMessage[];
  emojis: Emoji[];
  emojisEtag?: string | null;
  messagesEtag?: string | null;
  hash?: string | null;
}

type SearchableEmoji = {
  label: string;
  tags?: string[];
}

export type Meta = {
  emojisEtag?: string;
  messagesEtag?: string;
  hash?: string;
}

export type DataStoreFactory = { 
  (locale: Locale, customEmojis?: CustomEmoji[]): DataStore; 
  deleteDatabase(locale: Locale): void;
}

/**
 * Transforms an Emoji from emojibase into an EmojiRecord.
 * 
 * @param emoji the Emoji from the database
 * @returns the equivalent EmojiRecord
 */
 export function getEmojiRecord(emoji: Emoji): EmojiRecord {
  return {
    emoji: emoji.emoji,
    label: emoji.label,
    tags: emoji.tags,
    skins: emoji.skins?.map(skin => getEmojiRecord(skin)),
    order: emoji.order,
    custom: false,
    hexcode: emoji.hexcode,
    version: emoji.version
  };
}

  /**
   * Given an emoji, determine if the query matches.
   * 
   * The emoji matches if the text query matches the name or one of its tags, and if it is in the array of
   * categories (if given).
   * 
   * @param emoji The emoji to check
   * @param query The text query
   * @param categories The categories to check
   * @returns a boolean indicating whether or not the emoji matches the query
   */
   export function queryMatches(emoji: SearchableEmoji, query: string, categories?: Category[]) {
    if (categories && !categories.some(category => category.order === (emoji as Emoji).group)) {
      return false;
    }

    return (
      caseInsensitiveIncludes(emoji.label, query) ||
      emoji.tags?.some(tag => caseInsensitiveIncludes(tag, query))
    );
  }

export abstract class DataStore {
  locale: Locale;
  customEmojis?: EmojiRecord[];

  constructor(locale: Locale = 'en', customEmojis?: CustomEmoji[]) {
    this.locale = locale;
    this.customEmojis = customEmojis;

    if (customEmojis?.length) {
      this.customEmojis = customEmojis.map((custom: CustomEmoji) => ({
        ...custom,
        custom: true,
        tags: ['custom', ...(custom.tags || [])]
      }));
    }
  }

  abstract open(): Promise<void>;
  abstract delete(): Promise<void>;
  abstract close(): void;
  abstract getEmojiCount(): Promise<number>;
  abstract getEtags(): Promise<Record<string, string | undefined>>;
  // abstract setMeta(meta: Meta): void;
  abstract getHash(): Promise<string>;
  abstract isPopulated(): Promise<boolean>;
  abstract populate(options: PopulateOptions): Promise<void>;
  abstract getCategories(options: PickerOptions): Promise<Category[]>;
  abstract getEmojis(category: Category, emojiVersion: number): Promise<EmojiRecord[]>;
  abstract searchEmojis(query: string, emojiVersion: number, categories: Category[]): Promise<EmojiRecord[]>;
}
