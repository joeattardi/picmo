<script lang="ts">
  import type { EmojiRecord } from '../data';
  import Emoji from './Emoji.svelte';

  export let emojis: EmojiRecord[];
  export let categoryIndex: number;
  export let focused: string | null;
</script>

<div class="emojis">
  {#each emojis as emoji, index}
    <Emoji {categoryIndex} {index} {emoji} isFocused={focused === emoji.emoji} />
  {/each}
</div>

<style>
  .emojis {
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    justify-items: center;
    justify-content: center;
  }
</style>
