import type { Locale, Emoji, GroupMessage } from 'emojibase';
import type { PopulateOptions } from './DataStore';
import type { EmojiRecord, Category, CategoryKey, CustomEmoji } from './types';
import type { PickerOptions } from '../types';

import { getEmojiRecord, DataStore, queryMatches } from './DataStore';

import { applyRules } from './rules';

const instances = {} as Record<Locale, InMemoryStore>;

export function InMemoryStoreFactory(locale: Locale, customEmojis?: CustomEmoji[]): DataStore {
  if (!instances[locale]) {
    instances[locale] = new InMemoryStore(locale, customEmojis);
  }
  return instances[locale];
}

InMemoryStoreFactory.deleteDatabase = () => {
  // Not implemented for in memory datastore
};

export class InMemoryStore extends DataStore {
  private categories: GroupMessage[];
  private emojis: Emoji[];

  open(): Promise<void> {
    return Promise.resolve();
  }

  delete(): Promise<void> {
    return Promise.resolve();
  }

  close(): void {
    // Not implemented for in memory datastore
  }

  isPopulated(): Promise<boolean> {
    return Promise.resolve(false);
  }

  getEmojiCount(): Promise<number> {
    return Promise.resolve(this.emojis.length);
  }

  getEtags(): Promise<Record<string, string | undefined>> {
    // Not implemented for in memory datastore
    return Promise.resolve({ foo: 'bar' });
  }

  getHash(): Promise<string> {
    // Not implemented for in memory datastore
    return Promise.resolve('');
  }

  populate(options: PopulateOptions) {
    this.categories = options.groups;
    this.emojis = options.emojis;
    return Promise.resolve();
  }

  getCategories(options: PickerOptions): Promise<Category[]> {
    let categories: Category[] = this.categories.filter(category => category.key !== 'component') as Category[];

    if (options.showRecents) {
      categories.unshift({ key: 'recents', order: -1 });
    }

    if (options.custom?.length) {
      categories.push({ key: 'custom', order: 10 });
    }

    if (options.categories) {
      const includeList = options.categories as CategoryKey[];
      categories = categories.filter(category => includeList.includes(category.key));
      categories.sort((a: Category, b: Category) => includeList.indexOf(a.key) - includeList.indexOf(b.key));
    } else {
      categories.sort((a: Category, b: Category) => a.order - b.order);
    }

    return Promise.resolve(categories);
  }

  getEmojis(category: Category, emojiVersion: number): Promise<EmojiRecord[]> {
    const emojiResults = this.emojis
      .filter(emoji => emoji.group === category.order)
      .filter((e: Emoji) => e.version <= emojiVersion)
      .sort((a: Emoji, b: Emoji) => {
        if (a.order != null && b.order != null) {
          return a.order - b.order;
        }

        return 0;
      })
      .map(getEmojiRecord);

    return Promise.resolve(applyRules(emojiResults, emojiVersion));
  }

  searchEmojis(query: string, emojiVersion: number, categories: Category[]): Promise<EmojiRecord[]> {
    const matchingEmojis = this.emojis.filter(emoji => queryMatches(emoji, query, categories)).map(getEmojiRecord);
    const matchingCustom = this.customEmojis?.filter(emoji => queryMatches(emoji, query, categories)) || [];

    const results = [...applyRules(matchingEmojis, emojiVersion), ...matchingCustom];

    return Promise.resolve(results);
  }
}
