<script lang="ts">
  import type { Category } from '../data';
  import type { CategoryStore } from '../store';

  import { getContext } from 'svelte';
  import EmojiCategory from './EmojiCategory.svelte';

  const categoryStore = getContext<CategoryStore>('categories');

  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });
</script>

{#if categories}
  <div class="emojiArea">
    {#each categories as category}
      <EmojiCategory {category} />
    {/each}
  </div>
{/if}

<style>
  .emojiArea {
    overflow: auto;
    --row-height: calc(var(--emoji-size) + 0.5em);
    height: calc(var(--emoji-rows) * var(--row-height) - 0.5em);
    padding: 0.5em;
    margin-bottom: 0.5em;
  }
</style>
