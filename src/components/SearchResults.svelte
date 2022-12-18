<script lang="ts">
  import Emojis from './Emojis.svelte';

  export let searchResults;
</script>

<div class="searchResults">
  <h3>Search Results</h3>
  <Emojis emojis={searchResults} />
</div>

<style>
  .searchResults {
    height: var(--content-area-height);
    overflow: auto;
    padding-bottom: 0.5em;
    background: var(--background-color);
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
