<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }
</script>

<div class="overlay" transition:fade={{ duration: 150 }} on:keydown={handleKeyDown}>
  <div class="content" transition:fade={{ duration: 150, delay: 150 }}>
    <button>Variant popup</button>
  </div>
</div>

<style>
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    background: white;
  }
</style>
