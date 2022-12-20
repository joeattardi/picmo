<script lang="ts">
  import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  import i18n from '../i18n';
  import Emojis from './Emojis.svelte';

  export let searchResults;
</script>

<div class="searchResults">
  {#if searchResults.length}
    <h3>Search Results</h3>
    <Emojis emojis={searchResults} />
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
