<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore, CategoryStore } from '../types';

  import { getContext, createEventDispatcher, tick } from 'svelte';

  import CategoryTab from './CategoryTab.svelte';

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');

  const dispatch = createEventDispatcher();

  export let isSearching: boolean;

  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });

  async function setSelectedCategory(event: CustomEvent<Category>) {
    dispatch('categoryClick');
    await tick();
    selectedCategoryStore.set({
      category: event.detail,
      method: 'click'
    });
  }
</script>

{#if !categories}
  <div>loading</div>
{:else}
  <div class="container">
    <ul class="categoryTabs">
      {#each categories as category}
        <CategoryTab on:selectCategory={setSelectedCategory} {isSearching} {category} />
      {/each}
    </ul>
  </div>
{/if}

<style>
  .container {
    height: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid var(--border-color);
  }

  .categoryTabs {
    list-style-type: none;
    padding: 0.5em;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
