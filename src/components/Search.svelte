<script lang="ts">
  import type { SelectedCategoryStore } from '../types';

  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import { createEventDispatcher, getContext } from 'svelte';
  import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';

  import i18n from '../i18n';

  let searchQuery = '';
  const dispatch = createEventDispatcher();

  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');

  selectedCategoryStore.subscribe(() => {
    if (searchQuery.length) {
      clearSearch(false);
    }
  });

  function clearSearch(dispatchAction = true) {
    searchQuery = '';
    if (dispatchAction) {
      dispatch('search');
    }
  }

  function handleSearchKeyDown(event) {
    if (event.key === 'Escape') {
      clearSearch();
    }
  }

  async function handleSearchInput(event) {
    if (searchQuery) {
      dispatch('search', searchQuery);
    } else {
      clearSearch();
    }
  }
</script>

<div class="search-container">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder={i18n.search.placeholder}
    on:keydown={handleSearchKeyDown}
    on:input={handleSearchInput}
  />
  <div class="search-icon">
    <Icon data={faMagnifyingGlass} />
  </div>
  {#if searchQuery.length}
    <div transition:scale={{ duration: 250, opacity: 0.5, easing: backOut }} class="clear-search-button">
      <button type="button" on:click={() => clearSearch()} title={i18n.search.clear}>
        <Icon data={faCircleXmark} />
      </button>
    </div>
  {/if}
</div>

<style>
  .clear-search-button {
    position: absolute;
    right: 0;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    color: var(--search-icon-color);
    opacity: 0.5;
  }

  .clear-search-button:hover {
    opacity: 1;
  }

  .clear-search-button button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .clear-search-button:hover {
    opacity: 1;
  }

  .search-icon {
    position: absolute;
    height: 100%;
    width: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.5em;
    color: var(--search-icon-color);
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .search-container {
    display: flex;
    position: relative;
    height: var(--search-height);
  }

  .search-container input {
    flex-grow: 1;
    flex-direction: row;
    padding: 0.75em;
    padding-left: 2.5em;
    padding-right: 2em;
    background: var(--search-background-color);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    border: none;
    font-size: 1em;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    outline: none;
  }

  .search-container input:focus {
    background: var(--search-focus-background-color);
    outline: 1px solid var(--search-icon-focus-color);
    border-bottom-color: transparent;
  }

  .search-container input:focus + .search-icon {
    opacity: 1;
    color: var(--search-icon-focus-color);
  }

  .search-container input::placeholder {
    opacity: 0;
  }

  .search-container input:focus::placeholder {
    opacity: 1;
  }
</style>
