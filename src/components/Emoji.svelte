<script lang="ts">
  import type { EmojiRecord } from '../data';

  export let emoji: EmojiRecord;
</script>

<button data-emoji={emoji.emoji}>{emoji.emoji}</button>

<style>
  button {
    font-family: color-emoji;
    font-size: var(--emoji-size);
    width: 1.5em;
    height: 1.5em;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid transparent;
  }

  button:hover {
    background: var(--emoji-hover-background-color);
    border-radius: 10px;
    border: 1px solid #cbd5e1;
  }
</style>
