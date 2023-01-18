<script lang="ts">
  import type { EmojiRecord } from '../data';
  import Emoji from './Emoji.svelte';

  export let emojis: EmojiRecord[];
  export let focused: string | null;
</script>

<div class="emojis">
  {#each emojis as emoji}
    <Emoji isFocused={focused === emoji.emoji} {emoji} />
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
