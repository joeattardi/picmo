<script lang="ts">
  import type { EmojiRecord } from '../data';
  import type { PickerOptions, FocusStore } from '../types';
  import { getContext } from 'svelte';

  export let categoryCount: number;
  export let emojis: EmojiRecord[];
  export let isActive: boolean;
  export let wrap = false;

  const focusStore = getContext<FocusStore>('focus');

  const options = getContext<PickerOptions>('options');

  const rowCount = Math.floor(emojis.length / options.columns);
  const lastRowStart = rowCount * options.columns;

  function focusLeft({ offset, category }) {
    if (offset > 0) {
      return { offset: offset - 1 };
    }

    if (category > 0) {
      return { offset: -1, category: category - 1 };
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
    if (offset < lastRowStart) {
      return { offset: Math.min(offset + options.columns, emojis.length - 1) };
    }

    return { offset: 0, category: category + 1 };
  }

  function focusUp({ offset, category }) {
    if (offset > options.columns) {
      return { offset: offset - options.columns };
    }

    if (category > 0) {
      return { offset: -1, category: category - 1 };
    }
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
