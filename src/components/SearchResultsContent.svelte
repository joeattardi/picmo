<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';

  import type { EmojiRecord, Category } from '../data';
  import type { NavigationStore } from '../types';
  import i18n from '../i18n';
  import EmojiCategory from './EmojiCategory.svelte';

  export let emojis: EmojiRecord[];

  let element: HTMLElement;

  const searchResultsCategory: Category = {
    key: 'search-results',
    order: 1
  };

  const navigationStore = getContext<NavigationStore>('navigation');
  const unsubscribe = navigationStore.subscribe(navigate => {
    if (navigate?.target === 'searchResults') {
      element.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    }
  });

  onDestroy(unsubscribe);
</script>

<div bind:this={element}>
  {#if emojis.length}
    <EmojiCategory {emojis} category={searchResultsCategory} on:emojiselect />
  {:else}
    <div class="noResults">
      <div class="icon">
        <Icon data={faFaceFrown} scale={8} />
      </div>
      <h3>{i18n.search.notFound}</h3>
    </div>
  {/if}
</div>

<style>
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
