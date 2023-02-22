<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { EmojiRecord } from '../data';
  import type { SearchService, SearchState } from '../search';
  import type { FocusState } from '../types';
  import SearchResultsContent from './SearchResultsContent.svelte';

  let lastSearch: EmojiRecord[];

  const focusStore = writable<FocusState>({ category: 0, column: 0, offset: 0 });
  setContext('focus', focusStore);

  const searchService = getContext<() => SearchService>('searchService')();
  let searchState: SearchState;
  const unsubscribe = searchService.subscribe(state => {
    searchState = state;
    if (state.search) {
      state.search.then(results => (lastSearch = results));
    }
  });

  onDestroy(unsubscribe);
</script>

{#if searchState?.search}
  <!-- Wait on the current search promise -->
  {#await searchState.search}
    <!-- 
        In the meantime, if there is a previous search result, show that
        to prevent flickering
    -->
    {#if lastSearch}
      <SearchResultsContent emojis={lastSearch} on:emojiselect />
    {/if}
  {:then searchResults}
    <!-- Now show the most up to date results. -->
    <SearchResultsContent emojis={searchResults} on:emojiselect />
  {/await}
{/if}
