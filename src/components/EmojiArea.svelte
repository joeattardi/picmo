<script lang="ts">
  import type { Category, EmojiMappings } from '../data';
  import type { SelectedCategoryStore, CategoryStore, FocusState } from '../types';

  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import EmojiCategory from './EmojiCategory.svelte';
  import RecentEmojisCategory from './RecentEmojisCategory.svelte';

  const focusStore = writable<FocusState>({ category: 0, offset: 0 });
  setContext('focus', focusStore);

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');

  export let categoryEmojis: EmojiMappings;

  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });

  let pauseScroll = false;
  let scrollableArea: HTMLElement;
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
    height: var(--content-area-height);
    padding-bottom: 0.5em;
    position: relative;
  }
</style>
