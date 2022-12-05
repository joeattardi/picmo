<script lang="ts">
  import type { Category } from '../data';
  import type { SelectedCategoryStore } from '../store';

  import { getContext, createEventDispatcher } from 'svelte';
  import Icon from 'svelte-awesome';
  import { categoryIcons } from '../icons';
  import i18n from '../i18n';

  export let category: Category;

  let isSelected = false;
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');
  selectedCategoryStore.subscribe(value => {
    isSelected = value.category.key === category.key;
  });

  const dispatch = createEventDispatcher();

  function onClickCategory() {
    dispatch('selectCategory', category);
  }
</script>

<li>
  <button
    class={isSelected ? 'selected' : ''}
    on:click={onClickCategory}
    title={i18n.categories[category.key] || category.message || category.key}
  >
    <Icon data={categoryIcons[category.key]} scale={1.2} />
  </button>
</li>

<style>
  button {
    width: 2.75em;
    height: 2.75em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid transparent;
    background: transparent;
    color: var(--category-tab-icon-color);
  }

  .selected,
  .selected:hover {
    background: var(--category-tab-active-background-color);
    color: var(--category-tab-active-color);
  }

  button:hover {
    background: var(--category-tab-hover-background-color);
  }
</style>
