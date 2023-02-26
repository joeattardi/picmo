<script lang="ts">
  import type { Category, DataState, EmojiMappings } from '../data';
  import type { SelectedCategoryStore, CategoryStore, FocusState, NavigationStore, DataStore } from '../types';

  import { getContext, onDestroy, setContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { writable, type Unsubscriber } from 'svelte/store';
  import EmojiCategory from './EmojiCategory.svelte';
  import RecentEmojisCategory from './RecentEmojisCategory.svelte';

  const focusStore = writable<FocusState>({ category: 0, offset: 0 });
  setContext('focus', focusStore);

  const dataStore = getContext<DataStore>('dataStore');

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');
  const navigationStore = getContext<NavigationStore>('navigation');

  export let categoryEmojis: EmojiMappings;

  let categories: Category[];
  let data: DataState;

  const unsubscribe: Unsubscriber[] = [];

  unsubscribe.push(
    dataStore.subscribe(state => {
      data = state;
    })
  );

  unsubscribe.push(
    categoryStore.subscribe(categoryList => {
      categories = categoryList;
    })
  );

  let pauseScroll = false;

  let scrollableArea: HTMLElement;

  unsubscribe.push(
    navigationStore.subscribe(navigate => {
      if (navigate?.target === 'emojis') {
        scrollableArea.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
      }
    })
  );

  unsubscribe.push(
    selectedCategoryStore.subscribe(selection => {
      if (scrollableArea && selection && selection.method === 'click') {
        focusStore.set({
          category: categories.indexOf(selection.category),
          offset: 0
        });
        pauseScroll = true;
        const targetEl = scrollableArea.querySelector<HTMLElement>(`[data-category-key="${selection.category.key}"]`);
        scrollableArea.scrollTo({ top: targetEl.offsetTop + 5 });
      }
    })
  );

  onDestroy(() => {
    unsubscribe.forEach(fn => fn());
  });

  function intersectionObserver(node: HTMLElement) {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;

        if (pauseScroll) {
          pauseScroll = false;
          return;
        }

        if (entry.boundingClientRect.top < 0 || entry.boundingClientRect.height < scrollableArea.offsetHeight) {
          const targetElement = entry.target as HTMLElement;
          const categoryKey = targetElement.dataset.categoryKey;

          if (entry.isIntersecting) {
            // Category just entered from the top
            const newCategory = categories.find(category => category.key === categoryKey);
            selectedCategoryStore.set({ category: newCategory, method: 'scroll' });
          } else {
            // Category just left at the top, so select the next category
            const categoryIndex = categories.findIndex(category => category.key === categoryKey);
            const newCategory = categories[categoryIndex + 1];
            selectedCategoryStore.set({ category: newCategory, method: 'scroll' });
          }
        }
      },
      { root: node }
    );

    [...node.children].forEach(child => observer.observe(child));

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

{#if categoryEmojis}
  <div use:intersectionObserver bind:this={scrollableArea} class="emojiArea">
    {#each categories as category, index}
      {#if category.key === 'recents'}
        <RecentEmojisCategory on:emojiselect {category} {index} categoryCount={categories.length} />
      {:else if category.key === 'custom'}
        <EmojiCategory
          {category}
          on:emojiselect
          emojis={data.dataStore.customEmojis}
          {index}
          categoryCount={categories.length}
        />
      {:else}
        <EmojiCategory
          on:emojiselect
          emojis={categoryEmojis[category.key]}
          {category}
          {index}
          categoryCount={categories.length}
        />
      {/if}
    {/each}
  </div>
{/if}

<style>
  .emojiArea {
    overflow: auto;
    background: var(--emoji-area-background);
    padding-bottom: 0.5em;
    position: relative;
  }
</style>
