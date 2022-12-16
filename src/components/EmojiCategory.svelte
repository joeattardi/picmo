<script lang="ts">
  import type { Category, EmojiRecord } from '../data';

  import { getContext } from 'svelte';
  import type { DataStore, PreviewStore } from '../types';
  import i18n from '../i18n';
  import Emoji from './Emoji.svelte';
  import { getEmojiForEvent } from '../util';

  export let category: Category;
  let emojis: EmojiRecord[] = [];

  const dataStore = getContext<DataStore>('dataStore');
  const previewStore = getContext<PreviewStore>('preview');

  dataStore.subscribe(async emojiData => {
    emojis = await emojiData.dataStore.getEmojis(category, 14); // TODO get emoji version
  });

  function showPreview(event) {
    const emoji = getEmojiForEvent(event, emojis);
    if (emoji) {
      previewStore.set(emoji);
    }
  }

  function hidePreview() {
    previewStore.set(null);
  }
</script>

<div
  on:mouseover={showPreview}
  on:mouseout={hidePreview}
  on:focus={showPreview}
  on:blur={hidePreview}
  class="category"
  data-category-key={category.key}
>
  <h3>{i18n.categories[category.key] || category.message || category.key}</h3>
  <div class="emojis">
    {#each emojis as emoji}
      <Emoji {emoji} />
    {/each}
  </div>
</div>

<style>
  .category {
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

  .emojis {
    display: grid;
    grid-template-columns: repeat(var(--emoji-columns), 1fr);
  }
</style>
