<script lang="ts">
  import type { EmojiRecord, Category, DataState, DataStatus } from '../data';
  import type { CategorySelection, Navigation } from '../types';
  import type { PickerOptions } from '../options';

  import { fade } from 'svelte/transition';
  import { onMount, setContext, createEventDispatcher, onDestroy } from 'svelte';
  import { writable, type Unsubscriber } from 'svelte/store';
  import { getOptions } from '../options';

  import ThemeWrapper from './ThemeWrapper.svelte';
  import CategoryTabs from './CategoryTabs.svelte';
  import EmojiArea from './EmojiArea.svelte';
  import Preview from './Preview.svelte';
  import Search from './Search.svelte';
  import SearchResults from './SearchResults.svelte';
  import Loader from './Loader.svelte';
  import VariantPopup from './VariantPopup.svelte';
  import { SearchService, type SearchState } from '../search';
  import { DataService } from '../data-service';

  export let options: Partial<PickerOptions> = {};
  let searchQuery: string;

  const mergedOptions = getOptions(options);

  const dataStore = writable<DataState>({ status: 'IDLE' });
  const selectedCategoryStore = writable<CategorySelection>(null);
  const previewStore = writable<EmojiRecord>(null);
  const recentsStore = writable<EmojiRecord[]>([]);
  const variantStore = writable(null);
  const navigateStore = writable<Navigation>();

  let searchService: SearchService;
  const dataService = DataService(mergedOptions);

  setContext('dataStore', dataStore);
  setContext('selectedCategory', selectedCategoryStore);
  setContext('preview', previewStore);
  setContext('recents', recentsStore);
  setContext('variant', variantStore);
  setContext('options', mergedOptions);
  setContext('navigation', navigateStore);
  setContext('dataService', dataService);
  setContext('searchService', () => searchService);

  let dataStatus: DataStatus;
  let categories: Category[];
  let emojiVersion: number;
  let searchState: SearchState;
  let dataReady = false;

  const dispatch = createEventDispatcher();

  const unsubscribe: Unsubscriber[] = [];

  unsubscribe.push(
    dataService.store.subscribe(state => {
      dataStatus = state.status;
    })
  );

  onMount(async () => {
    const db = await dataService.initialize();

    selectedCategoryStore.set({ category: dataService.categories[0], method: 'initial' });
    recentsStore.set(mergedOptions.recentsProvider.getRecents());
    categories = dataService.categories;
    emojiVersion = dataService.emojiVersion;

    searchService = SearchService(db, dataService.emojiVersion, dataService.categories);
    unsubscribe.push(
      searchService.subscribe(state => {
        searchState = state;
      })
    );
  });

  function onEmojiSelect({ detail: emoji }: { detail: EmojiRecord }) {
    recentsStore.set(mergedOptions.recentsProvider.addOrUpdateRecent(emoji));
    dispatch('emojiselect', emoji);
  }

  async function handleSearchInput(event: CustomEvent) {
    searchQuery = event.detail;
    if (searchQuery) {
      await searchService.search(searchQuery);
    }
  }

  onDestroy(() => {
    unsubscribe.forEach(fn => fn());
  });

  // TODO: cleanup this component in general!
</script>

<ThemeWrapper
  theme={mergedOptions.theme}
  rows={mergedOptions.rows}
  columns={mergedOptions.columns}
  emojiSize={mergedOptions.emojiSize}
>
  {#if dataReady}
    <div class="picker" transition:fade={{ duration: 150 }}>
      <VariantPopup on:emojiselect={onEmojiSelect} />
      <header class="header">
        <Search on:searchinput={handleSearchInput} />
        {#if !searchQuery}
          <CategoryTabs />
        {/if}
      </header>
      <div class="body">
        {#if searchQuery}
          <div class="results panel">
            <SearchResults on:emojiselect={onEmojiSelect} />
          </div>
        {:else}
          <div class="panel">
            <EmojiArea on:emojiselect={onEmojiSelect} />
          </div>
        {/if}
      </div>
      <footer class="footer">
        <Preview />
      </footer>
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
    height: 100%;
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
    background: var(--header-background-color);
    grid-area: header;
    z-index: 1;
    position: relative;
  }

  .body {
    grid-area: body;
    /* overflow: auto; */
    position: relative;
  }

  .footer {
    grid-area: footer;
  }

  .panel {
    /* position: absolute; */
    background: var(--panel-background);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .results {
    overflow: auto;
    background: var(--emoji-area-background);
  }
</style>
