<script lang="ts">
  import type { EmojiRecord, Category, DataState, DataStatus } from '../data';
  import type { SearchState, CategorySelection, Navigation } from '../types';
  import type { DataStore, EmojiMappings } from '../data';
  import type { PickerOptions } from '../options';

  import { fade } from 'svelte/transition';
  import { onMount, setContext, createEventDispatcher, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { initDatabase } from '../data';
  import { getOptions } from '../options';
  import { determineEmojiVersion } from '../emojiSupport';

  import ThemeWrapper from './ThemeWrapper.svelte';
  import CategoryTabs from './CategoryTabs.svelte';
  import EmojiArea from './EmojiArea.svelte';
  import Preview from './Preview.svelte';
  import Search from './Search.svelte';
  import SearchResults from './SearchResults.svelte';
  import Loader from './Loader.svelte';
  import { LATEST_EMOJI_VERSION } from 'emojibase';
  import VariantPopup from './VariantPopup.svelte';

  export let options: Partial<PickerOptions> = {};

  const mergedOptions = getOptions(options);

  const dataStore = writable<DataState>({ status: 'IDLE' });
  const categoryStore = writable<Category[]>(null);
  const selectedCategoryStore = writable<CategorySelection>(null);
  const previewStore = writable<EmojiRecord>(null);
  const recentsStore = writable<EmojiRecord[]>([]);
  const variantStore = writable(null);
  const navigateStore = writable<Navigation>();
  const searchStore = writable<SearchState>();

  setContext('dataStore', dataStore);
  setContext('categories', categoryStore);
  setContext('selectedCategory', selectedCategoryStore);
  setContext('preview', previewStore);
  setContext('recents', recentsStore);
  setContext('variant', variantStore);
  setContext('options', mergedOptions);
  setContext('navigation', navigateStore);
  setContext('search', searchStore);

  let categoryEmojis: EmojiMappings | null = null;
  let dataStatus: DataStatus;
  let categories: Category[];
  let db: DataStore;
  let emojiVersion: number;
  let searchState: SearchState;
  let dataReady = false;

  const dispatch = createEventDispatcher();

  const unsubscribe = [];

  unsubscribe.push(
    dataStore.subscribe(state => {
      dataStatus = state.status;
      db = state.dataStore;
    })
  );

  unsubscribe.push(
    searchStore.subscribe(state => {
      searchState = state;
    })
  );

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

      emojiVersion = mergedOptions.emojiVersion === 'auto' ? determineEmojiVersion() : mergedOptions.emojiVersion;

      const allEmojis = await Promise.all(categories.map(category => db.getEmojis(category, emojiVersion)));
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
        emojiVersion: emojiVersion || parseFloat(LATEST_EMOJI_VERSION),
        status: 'READY',
        error: null
      });

      recentsStore.set(mergedOptions.recentsProvider.getRecents());
    } catch (error: unknown) {
      dataStore.update(state => ({ ...state, status: 'ERROR', error }));
    }
  });

  function onEmojiSelect({ detail: emoji }: { detail: EmojiRecord }) {
    recentsStore.set(mergedOptions.recentsProvider.addOrUpdateRecent(emoji));
    dispatch('emojiselect', emoji);
  }

  let searchComponent;
  function focusSearch() {
    searchComponent.focusSearch();
  }

  onDestroy(() => {
    unsubscribe.forEach(fn => fn());
  });
</script>

<ThemeWrapper theme={mergedOptions.theme}>
  {#if dataReady}
    <div
      class="picker"
      transition:fade={{ duration: 150 }}
      style={`--emoji-rows: ${mergedOptions.rows}; --emoji-columns: ${mergedOptions.columns}`}
    >
      <VariantPopup on:emojiselect={onEmojiSelect} />
      <header class="header">
        <Search {emojiVersion} {categories} {db} bind:this={searchComponent} />
        {#if !searchState?.search}
          <CategoryTabs on:navigatePrevious={focusSearch} isSearching={searchState?.search != null} />
        {/if}
      </header>
      {#if searchState?.search}
        {#key searchState.query}
          <SearchResults on:emojiselect={onEmojiSelect} search={searchState.search} />
        {/key}
      {:else}
        <EmojiArea {categoryEmojis} on:emojiselect={onEmojiSelect} />
      {/if}
      <Preview />
    </div>
  {/if}
  {#if dataStatus === 'LOADING'}
    <div class="picker" transition:fade on:outroend={() => (dataReady = true)}>
      <Loader />
    </div>
  {/if}
</ThemeWrapper>

<style>
  @font-face {
    font-family: 'color-emoji';
    src: local('Apple Color Emoji'), local('Segoe UI Emoji'), local('Segoe UI Symbol'), local('Noto Color Emoji');
  }
  .picker {
    --border-radius: 5px;
    --emoji-size: 32px;
    --category-header-height: 2.25em;
    --search-height: 2.5em;
    --preview-height: 3em;
    --category-tabs-height: 3em;

    width: 400px;
    height: 500px;

    display: grid;
    grid-template-areas:
      'header'
      'body'
      'footer';
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
      sans-serif;
    background: var(--background-color);
    flex-direction: column;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);

    position: relative;
    overflow: hidden;
  }

  .header {
    grid-area: header;
  }
</style>
