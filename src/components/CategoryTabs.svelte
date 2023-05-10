<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore, NavigationStore } from '../types';
  import type { DataServiceReturnValue } from '../data-service';

  import { getContext, createEventDispatcher, tick, onDestroy } from 'svelte';

  import CategoryTab from './CategoryTab.svelte';

  let tabs: HTMLUListElement;
  let selectedCategoryIndex: number;

  const dataService = getContext<DataServiceReturnValue>('dataService');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');
  const navigationStore = getContext<NavigationStore>('navigation');

  const dispatch = createEventDispatcher();

  const unsubscribe = selectedCategoryStore.subscribe(value => {
    const { categories } = dataService;
    selectedCategoryIndex = categories.indexOf(value.category);
  });

  const unsubscribeNavigation = navigationStore.subscribe(navigate => {
    if (navigate?.target === 'categories') {
      tabs.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    }
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
    const { categories } = dataService;
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

  const offsets: Record<string, number> = {
    ArrowRight: 1,
    ArrowLeft: -1
  };

  function handleKeyDown(event: KeyboardEvent) {
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

  onDestroy(() => {
    unsubscribeNavigation();
    unsubscribe();
  });
</script>

{#if !dataService.categories}
  <!-- TODO improve this -->
  <div>loading</div>
{:else}
  <div class="container" style={`--category-count: ${dataService.categories.length};`}>
    <ul class="categoryTabs" bind:this={tabs} on:keydown={handleKeyDown}>
      {#each dataService.categories as category}
        <CategoryTab on:selectCategory={setSelectedCategory} {category} />
      {/each}
    </ul>
    <div
      class="bar"
      style={`--bar-width: ${
        (1 / dataService.categories.length) * 100
      }%; --selection-offset: ${selectedCategoryIndex};`}
    />
  </div>
{/if}

<style>
  .container {
    background: var(--gray-9);
    height: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0.5em;
    border-bottom: 1px solid var(--border-color);
  }

  .categoryTabs {
    overflow-x: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(var(--category-count), 1fr);
    flex-direction: row;
    justify-content: space-between;
  }

  .categoryTabs::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .bar {
    height: 4px;
    border-radius: 5px;
    background: var(--category-tab-active-color);
    transform: translateX(calc(var(--selection-offset) * 100%));
    width: var(--bar-width);
    transition: transform 150ms ease-in-out;
  }
</style>
