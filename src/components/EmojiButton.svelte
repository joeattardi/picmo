<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import type { EmojiRecord } from '../data';
  import type { PickerOptions, FocusState, FocusStore } from '../types';
  import Emoji from './Emoji.svelte';

  export let emoji: EmojiRecord;
  export let index: number;
  export let categoryIndex: number;
  export let isFocused = false;

  let element: HTMLButtonElement;
  let focusState: FocusState;

  const focusStore = getContext<FocusStore>('focus');
  const unsubscribe = focusStore.subscribe(state => {
    focusState = state;
    if (state.offset === index && state.category === categoryIndex && state.applyFocus) {
      element?.focus();
    }
  });

  $: {
    const { offset, category, applyFocus } = focusState;

    if (element && offset === index && category === categoryIndex && applyFocus) {
      element.focus();
    }
  }

  onDestroy(unsubscribe);
</script>

<button bind:this={element} tabindex={isFocused ? 0 : -1} data-emoji={emoji.emoji}>
  <Emoji {emoji} />
</button>

<style>
  button {
    font-family: color-emoji;
    font-size: var(--emoji-size);
    width: var(--emoji-button-size);
    height: var(--emoji-button-size);
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
  }

  button:hover {
    background: var(--emoji-hover-background-color);
    border-radius: 5px;
    border: 1px solid var(--emoji-hover-border-color);
  }
</style>
