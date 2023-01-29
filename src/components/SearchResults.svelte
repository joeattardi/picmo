<script lang="ts">
  import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';
  import { getContext, onDestroy, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import type { Category, EmojiRecord } from '../data';
  import type { NavigationStore, FocusState } from '../types';

  import i18n from '../i18n';
  import EmojiCategory from './EmojiCategory.svelte';

  export let searchResults: EmojiRecord[];

  let element: HTMLElement;

  const searchResultsCategory: Category = {
    key: 'search-results',
    order: 1
  };

  const focusStore = writable<FocusState>({ category: 0, offset: 0 });
  setContext('focus', focusStore);

  const navigationStore = getContext<NavigationStore>('navigation');
  const unsubscribe = navigationStore.subscribe(navigate => {
    if (navigate?.target === 'searchResults') {
      element.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    }
  });

  onDestroy(unsubscribe);
</script>

<div bind:this={element} class="searchResults">
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
    background: var(--emoji-area-background);
  }

  .noResults {
    color: var(--secondary-text-color);
    background: var(--emoji-area-background);
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
    background: var(--emoji-area-background);
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
