<script lang="ts">
  import type { Category, EmojiRecord } from '../data';
  import { getContext } from 'svelte';
  import type { DataStore } from '../store';
  import i18n from '../i18n';
  import Emoji from './Emoji.svelte';

  export let category: Category;
  let emojis: EmojiRecord[] = [];
  const dataStore = getContext<DataStore>('dataStore');

  dataStore.subscribe(async emojiData => {
    emojis = await emojiData.dataStore.getEmojis(category, 14);
  });
</script>

<div class="category">
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
  }

  .emojis {
    display: grid;
    grid-template-columns: repeat(var(--emoji-columns), 1fr);
  }
</style>
