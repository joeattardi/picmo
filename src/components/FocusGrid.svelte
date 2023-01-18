<script lang="ts">
  import type { EmojiRecord } from '../data';
  import type { PickerOptions, FocusStore } from '../types';
  import { getContext } from 'svelte';

  export let emojis: EmojiRecord[];
  export let isActive: boolean;

  const focusStore = getContext<FocusStore>('focus');

  const options = getContext<PickerOptions>('options');

  const rowCount = Math.floor(emojis.length / options.columns);
  const lastRowStart = rowCount * options.columns;

  function focusLeft() {
    focusStore.update(state => {
      // console.log({ state });
      if (state.offset > 0) {
        return { ...state, offset: state.offset - 1 };
      }

      // Underflow - move to previous category if there is one
      if (state.category > 0) {
        return { ...state, offset: -1, category: state.category - 1 };
      }

      return state;
    });
  }

  function focusRight() {
    focusStore.update(state => {
      if (state.offset < emojis.length - 1) {
        return { ...state, offset: state.offset + 1 };
      }

      // Overflow - move to the next category
      return { ...state, offset: 0, category: state.category + 1 };
    });
  }

  function focusDown() {
    focusStore.update(state => {
      if (state.offset < lastRowStart) {
        return { ...state, offset: state.offset + options.columns };
      }

      return { ...state, offset: 0, category: state.category + 1 };
    });
  }

  function focusUp() {
    focusStore.update(state => {
      if (state.offset > options.columns) {
        return { ...state, offset: state.offset - options.columns };
      }

      if (state.category > 0) {
        return { ...state, offset: -1, category: state.category - 1 };
      }

      return state;
    });
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
      keyBindings[event.key]();
    }
  }
</script>

<div on:keydown={onKeyDown}>
  <slot />
</div>
