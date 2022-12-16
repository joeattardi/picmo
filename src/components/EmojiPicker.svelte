<script lang="ts">
  import type { EmojiRecord, Category, DataState, DataStatus } from '../data';
  import type { PickerOptions, CategorySelection } from '../types';

  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { initDatabase, IndexedDbStoreFactory } from '../data';

  import ThemeWrapper from './ThemeWrapper.svelte';
  import Header from './Header.svelte';
  import EmojiArea from './EmojiArea.svelte';
  import Preview from './Preview.svelte';

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

  let dataStatus: DataStatus;

  dataStore.subscribe((state: DataState) => (dataStatus = state.status));

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
      const categories = await db.getCategories(mergedOptions);
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
</script>

<ThemeWrapper>
  <div class="picker">
    <Header />
    <EmojiArea />
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

    width: calc(var(--emoji-columns) * var(--emoji-size) * 1.75);

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
      sans-serif;
    background: var(--secondary-background-color);
    display: inline-flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }
</style>
