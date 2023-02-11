<script lang="ts">
  import { getContext } from 'svelte';

  import type { EmojiRecord } from '../data';
  import type { PickerOptions } from '../types';
  import CustomEmoji from './renderers/CustomEmoji.svelte';

  export let emoji: EmojiRecord;

  const options = getContext<PickerOptions>('options');
</script>

{#if emoji.custom}
  <CustomEmoji {emoji} />
{:else}
  <svelte:component this={options.renderer} {emoji} />
{/if}
