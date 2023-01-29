<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore, CategoryStore, NavigationStore } from '../types';

  import { getContext, createEventDispatcher, tick } from 'svelte';

  import CategoryTab from './CategoryTab.svelte';

  let tabs: HTMLUListElement;

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');
  const navigationStore = getContext<NavigationStore>('navigation');

  const dispatch = createEventDispatcher();

  export let isSearching: boolean;

  navigationStore.subscribe(navigate => {
    if (navigate?.target === 'categories') {
      tabs.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    }
  });

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

  function getNewCategory(current: Category, offset: number) {
    const currentIndex = categories.indexOf(current);

    const newIndex = currentIndex + offset;

    if (newIndex < 0) {
      return categories[categories.length - 1];
    }

    if (newIndex >= categories.length) {
      return categories[0];
    }

    return categories[newIndex];
  }

  const offsets = {
    ArrowRight: 1,
    ArrowLeft: -1
  };

  function handleKeyDown(event) {
    if (event.key in offsets) {
      selectedCategoryStore.update(selection => ({
        category: getNewCategory(selection.category, offsets[event.key]),
        method: 'click'
      }));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      navigationStore.set({ target: 'search' });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      navigationStore.set({ target: 'emojis' });
    }
  }
</script>

{#if !categories}
  <div>loading</div>
{:else}
  <div class="container">
    <ul class="categoryTabs" bind:this={tabs} on:keydown={handleKeyDown}>
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
