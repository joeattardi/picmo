<script lang="ts">
  import type { EmojiRecord } from '../data';
  import EmojiButton from './EmojiButton.svelte';

  export let emojis: EmojiRecord[];
  export let categoryIndex: number;
  export let focused: string | null;
</script>

<div class="emojis">
  {#each emojis as emoji, index}
    <EmojiButton {categoryIndex} {index} {emoji} isFocused={focused === emoji.emoji} />
  {/each}
</div>

<style>
  .emojis {
    display: grid;
    grid-template-columns: repeat(auto-fill, 3em);
    justify-items: center;
    justify-content: center;
    padding: 0.25em 0;
  }
</style>
