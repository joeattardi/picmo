<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore, CategoryStore } from '../store';

  import { getContext } from 'svelte';
  import EmojiCategory from './EmojiCategory.svelte';

  const categoryStore = getContext<CategoryStore>('categories');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');

  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });

  let scrollableArea: HTMLElement;
  selectedCategoryStore.subscribe(category => {
    if (scrollableArea) {
      const targetEl = scrollableArea.querySelector<HTMLElement>(`[data-category-key="${category.key}"]`);
      scrollableArea.scrollTo({ top: targetEl.offsetTop });
    }
  });
</script>

{#if categories}
  <div bind:this={scrollableArea} class="emojiArea">
    {#each categories as category}
      <EmojiCategory {category} />
    {/each}
  </div>
{/if}

<style>
  .emojiArea {
    overflow: auto;
    --row-height: calc(var(--emoji-size) + 0.5em);
    height: calc(var(--emoji-rows) * var(--row-height) - 1em);
    margin-bottom: 0.5em;
  }
</style>
