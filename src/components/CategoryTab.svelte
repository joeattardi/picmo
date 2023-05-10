<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore } from '../types';

  import { getContext, createEventDispatcher, onDestroy } from 'svelte';
  import { categoryIcons } from '../icons';
  import i18n from '../i18n';

  export let category: Category;

  let button: HTMLButtonElement;

  let isSelected = false;
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');
  const unsubscribe = selectedCategoryStore.subscribe(value => {
    isSelected = value?.category?.key === category?.key;

    if (isSelected && value?.method === 'click') {
      button?.focus();
    }
  });

  const dispatch = createEventDispatcher();

  function onClickCategory() {
    dispatch('selectCategory', category);
  }

  onDestroy(unsubscribe);
</script>

<li data-category-key={category.key}>
  <button
    tabindex={isSelected ? 0 : -1}
    class:selected={isSelected}
    bind:this={button}
    on:click={onClickCategory}
    title={i18n.categories[category.key] || category.message || category.key}
  >
    <svelte:component this={categoryIcons[category.key]} size={24} weight="duotone" />
  </button>
</li>

<style>
  li {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    width: 100%;
    height: 1.75em;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid transparent;
    background: transparent;
    color: var(--category-tab-icon-color);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button:disabled:hover {
    background: transparent;
  }

  .selected,
  .selected:hover {
    /* background: var(--category-tab-active-background-color); */
    color: var(--category-tab-active-color);
  }

  button:hover {
    color: var(--category-tab-hover-color);
    /* background: var(--category-tab-hover-background-color); */
  }
</style>
