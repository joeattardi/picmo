<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  import type { EmojiRecord } from '../data';

  import Emojis from './Emojis.svelte';

  export let emoji: EmojiRecord;

  const dispatch = createEventDispatcher();

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }
</script>

<div class="overlay" transition:fade={{ duration: 150 }} on:keydown={handleKeyDown}>
  <div class="content" transition:scale={{ duration: 150 }}>
    <Emojis emojis={[emoji, ...emoji.skins]} />
  </div>
</div>

<style>
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    border-radius: var(--border-radius);
    padding: 1em 0;
    flex-grow: 1;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
    background: white;
    --grid-template-columns: repeat(auto-fit, minmax(3em, 3em));
    max-width: 90%;
  }
</style>
