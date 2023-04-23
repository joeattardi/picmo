<script lang="ts">
  import type { Category, EmojiRecord } from '../data';

  import { createEventDispatcher, getContext } from 'svelte';
  import type { PreviewStore, VariantStore } from '../types';
  import i18n from '../i18n';
  import { getEmojiForEvent } from '../util';
  import Emojis from './Emojis.svelte';

  export let emptyMessage: string = null;
  export let category: Category;
  export let categoryCount = 1;
  export let index = 0;
  export let emojis: EmojiRecord[] = [];

  const previewStore = getContext<PreviewStore>('preview');
  const variantStore = getContext<VariantStore>('variant');

  const dispatch = createEventDispatcher();

  function showPreview(event: Event) {
    const emoji = getEmojiForEvent(event, emojis);
    if (emoji) {
      previewStore.set(emoji);
    }
  }

  function hidePreview() {
    previewStore.set(null);
  }

  function handleSelect(event: MouseEvent | KeyboardEvent) {
    const emoji = getEmojiForEvent(event, emojis);
    if (emoji) {
      if (emoji.skins?.length) {
        variantStore.set({
          emoji,
          element: event.target as HTMLElement
        });
      } else {
        dispatch('emojiselect', emoji);
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      handleSelect(event);
    }
  }
</script>

<div
  on:mouseover={showPreview}
  on:mouseout={hidePreview}
  on:focus={showPreview}
  on:blur={hidePreview}
  on:click={handleSelect}
  on:keydown={handleKeyDown}
  class="category"
  data-category-key={category.key}
>
  <h3>{i18n.categories[category.key] || category.message || category.key}</h3>
  {#if emojis.length}
    <Emojis {categoryCount} {emojis} categoryIndex={index} />
  {:else if emptyMessage}
    <p class="empty">{emptyMessage}</p>
  {/if}
</div>

<style>
  .empty {
    padding: 0.5em;
    margin: 0;
    font-size: 0.8em;
    color: var(--secondary-text-color);
    text-align: center;
  }

  h3 {
    box-sizing: border-box;
    position: sticky;
    top: 0;
    color: var(--category-header-color);
    background: linear-gradient(0deg, var(--category-shadow-color) 0%, var(--emoji-area-background) 15%);
    font-weight: 500;
    font-size: 0.9rem;
    margin: 0;
    padding: 0.5em;
  }
</style>
