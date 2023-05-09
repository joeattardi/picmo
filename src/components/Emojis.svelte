<script lang="ts">
  import type { EmojiRecord } from '../data';
  import type { FocusStore, FocusState } from '../types';
  import { getContext, onDestroy } from 'svelte';
  import EmojiButton from './EmojiButton.svelte';
  import FocusGrid from './FocusGrid.svelte';

  export let categoryCount: number;
  export let emojis: EmojiRecord[];
  export let categoryIndex: number;

  let focused: string;

  let columnCount: number;

  const focusStore = getContext<FocusStore>('focus');
  let focusState: FocusState;
  const unsubscribe = focusStore.subscribe(state => {
    if (state.category === categoryIndex && state.offset < 0) {
      const lastRow = Math.ceil(emojis.length / columnCount);
      const lastRowStart = (lastRow - 1) * columnCount;
      focusStore.set({ ...state, offset: Math.min(emojis.length - 1, lastRowStart + state.column) });
    } else {
      focusState = state;
      focused = state.category === categoryIndex ? emojis?.[state.offset].emoji : null;
    }
  });

  function getColumnCount(element: HTMLElement) {
    const styles = getComputedStyle(element);
    columnCount = styles.gridTemplateColumns.split(' ').length;
  }

  onDestroy(unsubscribe);
</script>

<FocusGrid {emojis} isActive={focusState.category === categoryIndex} {categoryCount} {columnCount}>
  <div use:getColumnCount class="emojis">
    {#each emojis as emoji, index}
      <EmojiButton {categoryIndex} {index} {emoji} isFocused={focused === emoji.emoji} />
    {/each}
  </div>
</FocusGrid>

<style>
  .emojis {
    display: grid;
    font-size: var(--emoji-size);
    grid-template-columns: repeat(var(--emoji-columns), 1.5em);
    justify-items: center;
    justify-content: center;
    padding: 0.25em 0;
  }
</style>
