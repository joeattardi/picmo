<script lang="ts">
  import type { Category } from '../data';
  import type { CategoryStore } from '../store';

  import { getContext } from 'svelte';

  import CategoryTab from './CategoryTab.svelte';

  const categoryStore = getContext<CategoryStore>('categories');
  
  let categories: Category[];
  categoryStore.subscribe(categoryList => {
    categories = categoryList;
  });
</script>

<style>
  .categoryTabs {
    list-style-type: none;
    padding: 0.5em;
    margin: 0;
    display: flex;
    flex-direction: row;;
  }
</style>

{#if !categories}
  <div>loading</div>
{:else}
  <div>
    <ul class="categoryTabs">
      {#each categories as category}
        <CategoryTab category={category} />
      {/each}
    </ul>
  </div>
{/if}

