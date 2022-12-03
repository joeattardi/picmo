<script lang="ts">
  import type { EmojiRecord } from '../data';

  export let emoji: EmojiRecord;
</script>

<button>{emoji.emoji}</button>

<style>
  button {
    font-size: var(--emoji-size);
    width: 1.25em;
    height: 1.25em;
    background: transparent;
    border: none;
    cursor: pointer;
  }
</style>
