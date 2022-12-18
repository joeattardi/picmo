<script lang="ts">
  import type { EmojiRecord, Category, DataState, DataStatus, CategoryKey } from '../data';
  import type { PickerOptions, CategorySelection } from '../types';
  import type { DataStore, EmojiMappings } from '../data';

  import { onMount, setContext, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { initDatabase, IndexedDbStoreFactory } from '../data';

  import ThemeWrapper from './ThemeWrapper.svelte';
  import Emojis from './Emojis.svelte';
  import CategoryTabs from './CategoryTabs.svelte';
  import EmojiArea from './EmojiArea.svelte';
  import Preview from './Preview.svelte';
  import Search from './Search.svelte';
  import SearchResults from './SearchResults.svelte';

  export let options: Partial<PickerOptions> = {};

  const mergedOptions: PickerOptions = {
    dataStore: IndexedDbStoreFactory,
    locale: 'en',
    showCategoryTabs: true,
    showPreview: true,
    showRecents: true,
    showSearch: true,
    showVariants: true,
    ...options
  } as PickerOptions;

  const dataStore = writable<DataState>({ status: 'IDLE' });
  const categoryStore = writable<Category[]>(null);
  const selectedCategoryStore = writable<CategorySelection>(null);
  const previewStore = writable<EmojiRecord>(null);

  setContext('dataStore', dataStore);
  setContext('categories', categoryStore);
  setContext('selectedCategory', selectedCategoryStore);
  setContext('preview', previewStore);

  let categoryEmojis: EmojiMappings | null = null;
  let searchResults: EmojiRecord[];
  let dataStatus: DataStatus;
  let categories: Category[];
  let db: DataStore;

  dataStore.subscribe(state => {
    db = state.dataStore;
  });

  onMount(async () => {
    try {
      dataStore.update(state => ({ ...state, status: 'LOADING' }));
      const db = await initDatabase(
        mergedOptions.locale,
        mergedOptions.dataStore,
        mergedOptions.custom,
        mergedOptions.messages,
        mergedOptions.emojiData
      );
      categories = await db.getCategories(mergedOptions);

      const allEmojis = await Promise.all(categories.map(category => db.getEmojis(category, 14)));
      categoryEmojis = categories.reduce(
        (result, category, index) => ({
          ...result,
          [category.key]: allEmojis[index]
        }),
        {} as EmojiMappings
      );

      categoryStore.set(categories);

      selectedCategoryStore.set({ category: categories[0], method: 'initial' });
      dataStore.set({
        dataStore: db,
        status: 'READY',
        error: null
      });
    } catch (error: unknown) {
      dataStore.update(state => ({ ...state, status: 'ERROR', error }));
    }
  });

  async function search(event) {
    if (event.detail) {
      searchResults = await db.searchEmojis(event.detail, 14, categories);
    } else {
      searchResults = null;
      // await tick();
      selectedCategoryStore.set({ category: categories[0], method: 'click' });
    }
  }

  function clearSearchResults(event) {
    searchResults = null;
  }
</script>

<ThemeWrapper>
  <div class="picker">
    <header>
      <Search on:search={search} />
      <CategoryTabs on:categoryClick={clearSearchResults} isSearching={searchResults != null} />
    </header>
    {#if searchResults}
      <SearchResults on:emojiselect {searchResults} />
    {:else}
      <EmojiArea {categoryEmojis} on:emojiselect />
    {/if}
    <Preview />
  </div>
</ThemeWrapper>

<style>
  @font-face {
    font-family: 'color-emoji';
    src: local('Apple Color Emoji'), local('Segoe UI Emoji'), local('Segoe UI Symbol'), local('Noto Color Emoji');
  }
  .picker {
    --border-radius: 5px;

    --emoji-columns: 8;
    --emoji-rows: 8;
    --emoji-size: 1.75rem;

    --row-height: calc(var(--emoji-size) + 0.5em);
    --content-area-height: calc(var(--emoji-rows) * var(--row-height) - 1em);

    width: calc(var(--emoji-columns) * var(--emoji-size) * 1.75);

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
      sans-serif;
    background: var(--secondary-background-color);
    display: inline-flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }

  header {
    background: var(--header-background-color);
    display: flex;
    flex-direction: column;
  }
</style>
