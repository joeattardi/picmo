<script lang="ts">
  import { getContext, createEventDispatcher, onMount, setContext, tick } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  import { computePosition, shift, arrow, offset } from '@floating-ui/dom';

  import type { FocusState, VariantStore } from '../types';
  import type { EmojiRecord } from '../data';

  import Emoji from './Emoji.svelte';
  import { getEmojiForEvent } from '../util';
  import FocusGrid from './FocusGrid.svelte';
  import { writable } from 'svelte/store';

  let emoji: EmojiRecord;
  let variants: EmojiRecord[];

  let arrowElement: HTMLElement;
  let emojiElement: HTMLElement;
  let contentElement: HTMLElement;

  const dispatch = createEventDispatcher();

  const store = getContext<VariantStore>('variant');

  let focusState: FocusState;
  const focusStore = writable<FocusState>({ category: 0, offset: 0 });
  setContext('focus', focusStore);

  focusStore.subscribe(state => {
    focusState = state;
  });

  store.subscribe(data => {
    emoji = data?.emoji;
    variants = data && [{ ...emoji, skins: [] }, ...emoji.skins];
    emojiElement = data?.element;
  });

  function close() {
    store.set(null);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      close();
    }
  }

  function handleClick(event) {
    if (event.target.dataset.emoji) {
      const emoji = getEmojiForEvent(event, variants);
      if (emoji) {
        close();
        dispatch('emojiselect', emoji);
      }
    }
  }

  onMount(async () => {
    await tick();

    focusStore.set({
      category: 0,
      offset: 0,
      applyFocus: true
    });

    function checkClickOutside(event) {
      if (!event.composedPath().includes(contentElement)) {
        close();
      }
    }

    document.addEventListener('click', checkClickOutside, true);

    return () => {
      document.removeEventListener('click', checkClickOutside, true);
    };
  });

  $: {
    if (emojiElement && contentElement && arrowElement) {
      computePosition(emojiElement, contentElement, {
        middleware: [
          offset(5),
          shift({
            padding: 8
          }),
          arrow({
            element: arrowElement
          })
        ]
      }).then(({ x, y, middlewareData }) => {
        Object.assign(contentElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });

        if (middlewareData.arrow) {
          const { x: arrowX } = middlewareData.arrow;
          Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: `${-arrowElement.offsetWidth / 2}px`
          });
        }
      });
    }
  }
</script>

{#if emoji}
  <div class="overlay" transition:fade={{ duration: 150 }} on:keydown={handleKeyDown} on:click={handleClick}>
    <div bind:this={contentElement} class="content" transition:scale={{ duration: 150 }}>
      <FocusGrid emojis={variants} isActive={true} wrap={true} categoryCount={1}>
        {#each variants as emoji, index}
          <Emoji categoryIndex={0} {emoji} {index} isFocused={focusState.offset === index} />
        {/each}
      </FocusGrid>
      <div bind:this={arrowElement} class="arrow" />
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    border-radius: var(--border-radius);
    position: absolute;
    padding: 0.25em 0;
    flex-grow: 1;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
    background: white;
    z-index: 1;
    --grid-template-columns: repeat(auto-fit, minmax(3em, 3em));
  }

  .arrow {
    background: white;
    width: 12px;
    height: 12px;
    position: absolute;
    transform: rotate(45deg);
    z-index: -1;
    pointer-events: none;
  }
</style>
