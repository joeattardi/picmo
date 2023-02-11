<script lang="ts">
  import type { EmojiRecord } from '../../data';

  export let emoji: EmojiRecord;
</script>

<img alt={emoji.emoji} src={emoji.url} />

<style>
  img {
    width: var(--emoji-size);
    height: var(--emoji-size);
  }
</style>
