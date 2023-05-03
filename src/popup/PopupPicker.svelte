<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { backOut, cubicInOut } from 'svelte/easing';

  import { computePosition, shift, arrow, offset } from '@floating-ui/dom';

  import EmojiPicker from '../components/EmojiPicker.svelte';
  import type { PopupOptions } from './types';

  export let options: PopupOptions;

  let popupElement: HTMLElement;
  let isOpen = false;

  export function open() {
    isOpen = true;
  }

  export function close() {
    isOpen = false;
  }

  export function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  // TODO: add document listener to close on click outside

  $: {
    if (popupElement && options.triggerElement && typeof options.position === 'string') {
      computePosition(options.triggerElement, popupElement, {
        placement: options.position,
        middleware: [offset(5)]
      }).then(({ x, y }) => {
        Object.assign(popupElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  }
</script>

{#if isOpen}
  <div
    bind:this={popupElement}
    transition:scale={{ duration: 250, opacity: 0, start: 0.8, easing: backOut }}
    class="popup-picker"
  >
    <EmojiPicker />
  </div>
{/if}

<style>
  .popup-picker {
    position: absolute;
    /* background: #ccc; */
  }
</style>
