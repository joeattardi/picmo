<script lang="ts">
  import type { SelectedCategoryStore, FocusState, NavigationStore } from '../types';

  import type { DataServiceReturnValue } from '../data-service';
  import { getContext, onDestroy, setContext } from 'svelte';
  import { writable, type Unsubscriber } from 'svelte/store';
  import EmojiCategory from './EmojiCategory.svelte';
  import RecentEmojisCategory from './RecentEmojisCategory.svelte';

  const focusStore = writable<FocusState>({ category: 0, offset: 0 });
  setContext('focus', focusStore);

  const dataService = getContext<DataServiceReturnValue>('dataService');
  const selectedCategoryStore = getContext<SelectedCategoryStore>('selectedCategory');
  const navigationStore = getContext<NavigationStore>('navigation');

  const unsubscribe: Unsubscriber[] = [];

  let pauseScroll = false;

  let scrollableArea: HTMLElement;

  unsubscribe.push(
    navigationStore.subscribe(navigate => {
      if (navigate?.target === 'emojis') {
        scrollableArea.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
      }
    })
  );

  unsubscribe.push(
    selectedCategoryStore.subscribe(selection => {
      if (scrollableArea && selection && selection.method === 'click') {
        focusStore.set({
          category: dataService.categories.indexOf(selection.category),
          offset: 0
        });
        pauseScroll = true;
        const targetEl = scrollableArea.querySelector<HTMLElement>(`[data-category-key="${selection.category.key}"]`);
        scrollableArea.scrollTo({ top: targetEl.offsetTop + 5 });
      }
    })
  );

  onDestroy(() => {
    unsubscribe.forEach(fn => fn());
  });

  function intersectionObserver(node: HTMLElement) {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;

        if (pauseScroll) {
          pauseScroll = false;
          return;
        }

        if (entry.boundingClientRect.top < 0 || entry.boundingClientRect.height < scrollableArea.offsetHeight) {
          const targetElement = entry.target as HTMLElement;
          const categoryKey = targetElement.dataset.categoryKey;

          if (entry.isIntersecting) {
            // Category just entered from the top
            const newCategory = dataService.categories.find(category => category.key === categoryKey);
            selectedCategoryStore.set({ category: newCategory, method: 'scroll' });
          } else {
            // Category just left at the top, so select the next category
            const categoryIndex = dataService.categories.findIndex(category => category.key === categoryKey);
            const newCategory = dataService.categories[categoryIndex + 1];
            selectedCategoryStore.set({ category: newCategory, method: 'scroll' });
          }
        }
      },
      { root: node }
    );

    [...node.children].forEach(child => observer.observe(child));

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

<div use:intersectionObserver bind:this={scrollableArea} class="emojiArea">
  {#each dataService.categories as category, index}
    {#if category.key === 'recents'}
      <RecentEmojisCategory on:emojiselect {category} {index} categoryCount={dataService.categories.length} />
    {:else if category.key === 'custom'}
      <EmojiCategory
        {category}
        on:emojiselect
        emojis={dataService.customEmojis}
        {index}
        categoryCount={dataService.categories.length}
      />
    {:else}
      <EmojiCategory
        on:emojiselect
        emojis={dataService.categoryEmojis[category.key]}
        {category}
        {index}
        categoryCount={dataService.categories.length}
      />
    {/if}
  {/each}
</div>

<style>
  .emojiArea {
    overflow: auto;
    background: var(--emoji-area-background);
    padding-bottom: 0.5em;
    position: relative;
    height: var(--emoji-area-height);
  }
</style>
