<script lang="ts">
  import type { DataState, DataStatus } from '../data';
  import type { PickerOptions } from '../types';

  import { onMount, setContext } from 'svelte';
  import { initDatabase, IndexedDbStoreFactory } from '../data';
  import { categoryStore, dataStore } from '../store';

  import ThemeWrapper from './ThemeWrapper.svelte';
  import Header from './Header.svelte';

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

  setContext('dataStore', dataStore);
  setContext('categories', categoryStore);

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
  </div>
</ThemeWrapper>

<style>
  .picker {
    --border-radius: 5px;

    background: var(--background-color);
    display: inline-flex;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }
</style>
