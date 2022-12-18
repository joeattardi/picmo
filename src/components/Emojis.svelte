<script lang="ts">
  import type { EmojiRecord } from '../data';
  import Emoji from './Emoji.svelte';

  export let emojis: EmojiRecord[];
</script>

<div class="emojis">
  {#each emojis as emoji}
    <Emoji {emoji} />
  {/each}
</div>

<style>
  .emojis {
    display: grid;
    grid-template-columns: repeat(var(--emoji-columns), 1fr);
  }
</style>
