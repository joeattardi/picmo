<script lang="ts">
  import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import type { Category } from '../data';

  import i18n from '../i18n';
  import EmojiCategory from './EmojiCategory.svelte';

  const searchResultsCategory: Category = {
    key: 'search-results',
    order: 1
  };

  export let searchResults;
</script>

<div class="searchResults">
  {#if searchResults.length}
    <EmojiCategory emojis={searchResults} category={searchResultsCategory} on:emojiselect />
  {:else}
    <div class="noResults">
      <div in:scale={{ duration: 250, opacity: 0.5, easing: backOut }} class="icon">
        <Icon data={faFaceFrown} scale={8} />
      </div>
      <h3>{i18n.search.notFound}</h3>
    </div>
  {/if}
</div>

<style>
  .searchResults {
    height: var(--content-area-height);
    overflow: auto;
    padding-bottom: 0.5em;
    background: var(--background-color);
  }

  .noResults {
    color: var(--secondary-text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .noResults h3 {
    color: var(--secondary-text-color);
    font-size: 1.2em;
    font-weight: bold;
  }

  .icon {
    opacity: 0.5;
  }

  h3 {
    position: sticky;
    top: 0;
    color: var(--category-header-color);
    background: var(--background-color);
    font-weight: 500;
    font-size: 1rem;
    margin: 0;
    padding: 0.5em;
  }
</style>
