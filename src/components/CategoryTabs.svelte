<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore, CategoryStore } from '../store';

  import { getContext } from 'svelte';

  import CategoryTab from './CategoryTab.svelte';

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');

  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });

  function setSelectedCategory(event: CustomEvent<Category>) {
    selectedCategoryStore.set(event.detail);
  }
</script>

{#if !categories}
  <div>loading</div>
{:else}
  <div>
    <ul class="categoryTabs">
      {#each categories as category}
        <CategoryTab on:select={setSelectedCategory} {category} />
      {/each}
    </ul>
  </div>
{/if}

<style>
  .categoryTabs {
    list-style-type: none;
    padding: 0.5em;
    margin: 0;
    display: flex;
    flex-direction: row;
  }
</style>
