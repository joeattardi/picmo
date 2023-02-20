<script lang="ts">
  import type { EmojiRecord } from '../data';
  import type { FocusStore } from '../types';
  import { getContext } from 'svelte';

  export let categoryCount: number;
  export let columnCount: number;
  export let emojis: EmojiRecord[];
  export let isActive: boolean;
  export let wrap = false;

  const focusStore = getContext<FocusStore>('focus');

  let rowCount;
  let lastRowStart;

  $: {
    if (columnCount) {
      rowCount = Math.floor(emojis.length / columnCount);
      lastRowStart = rowCount * columnCount;
    }
  }

  function getCoordinates(offset) {
    const row = Math.floor(offset / columnCount);
    const column = offset - (columnCount * row);

    return [row, column];
  }

  function focusLeft({ offset, category }) {
    const [ row, column ] = getCoordinates(offset);

    if (row === 0 && column === 0 && category > 0) {
      return { offset: -1, column: columnCount, category: category - 1 };
    }

    if (offset > 0) {
      return { offset: offset - 1 };
    }

    if (wrap) {
      return { offset: emojis.length - 1 };
    }
  }

  function focusRight({ offset, category }) {
    if (offset < emojis.length - 1) {
      return { offset: offset + 1 };
    }

    if (category < categoryCount - 1) {
      // Overflow - move to the next category
      return { offset: 0, category: category + 1 };
    }

    if (wrap) {
      return { offset: 0 };
    }
  }

  function focusDown({ offset, category }) {
    const [row, column] = getCoordinates(offset);

    if (row < rowCount - 1) {
      return { offset: Math.min(offset + columnCount, emojis.length - 1) };
    }

    if (category < categoryCount - 1) {
      return { offset: column, category: category + 1 };
    }

    // if wrap
  }

  function focusUp({ offset, category }) {
    const [row, column] = getCoordinates(offset);
    debugger;
  
    if (row === 0 && category > 0) {
        return { column, offset: -1, category: category - 1 };
    }

    return { offset: offset - columnCount };
  }

  const keyBindings = {
    ArrowLeft: focusLeft,
    ArrowRight: focusRight,
    ArrowDown: focusDown,
    ArrowUp: focusUp
  };

  function onKeyDown(event: KeyboardEvent) {
    if (isActive && event.key in keyBindings) {
      event.preventDefault();
      focusStore.update(state => ({
        ...state,
        applyFocus: true,
        ...keyBindings[event.key](state)
      }));
    }
  }
</script>

<div on:keydown={onKeyDown}>
  <slot />
</div>
