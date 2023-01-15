<script lang="ts">
  import type { Category, EmojiRecord } from '../data';

  import { createEventDispatcher, getContext } from 'svelte';
  import type { PreviewStore } from '../types';
  import i18n from '../i18n';
  import Emojis from './Emojis.svelte';
  import { getEmojiForEvent } from '../util';

  export let category: Category;
  export let emojis: EmojiRecord[];

  const previewStore = getContext<PreviewStore>('preview');

  const dispatch = createEventDispatcher();

  function showPreview(event) {
    const emoji = getEmojiForEvent(event, emojis);
    if (emoji) {
      previewStore.set(emoji);
    }
  }

  function hidePreview() {
    previewStore.set(null);
  }

  function handleClick(event) {
    if (event.target.dataset.emoji) {
      const emoji = getEmojiForEvent(event, emojis);
      dispatch('emojiselect', emoji);
    }
  }
</script>

<div
  on:mouseover={showPreview}
  on:mouseout={hidePreview}
  on:focus={showPreview}
  on:blur={hidePreview}
  on:click={handleClick}
  class="category"
  data-category-key={category.key}
>
  <h3>{i18n.categories[category.key] || category.message || category.key}</h3>
  <Emojis {emojis} />
</div>

<style>
  .category {
    --grid-template-columns: repeat(var(--emoji-columns), 1fr);
  }

  h3 {
    height: var(--category-header-height);
    box-sizing: border-box;
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
