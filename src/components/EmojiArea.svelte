<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore, CategoryStore } from '../types';

  import { getContext } from 'svelte';
  import EmojiCategory from './EmojiCategory.svelte';

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');

  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });

  let pauseScroll = false;
  let scrollableArea: HTMLElement;
  selectedCategoryStore.subscribe(selection => {
    if (scrollableArea && selection && selection.method === 'click') {
      pauseScroll = true;
      const targetEl = scrollableArea.querySelector<HTMLElement>(`[data-category-key="${selection.category.key}"]`);
      scrollableArea.scrollTo({ top: targetEl.offsetTop });
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

        if (entry.boundingClientRect.top < 0) {
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

{#if categories}
  <div use:intersectionObserver bind:this={scrollableArea} class="emojiArea">
    {#each categories as category}
      <EmojiCategory {category} />
    {/each}
  </div>
{/if}

<style>
  .emojiArea {
    overflow: auto;
    background: var(--background-color);
    --row-height: calc(var(--emoji-size) + 0.5em);
    height: calc(var(--emoji-rows) * var(--row-height) - 1em);
    padding-bottom: 0.5em;
    position: relative;
  }
</style>
