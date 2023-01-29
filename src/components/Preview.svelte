<script lang="ts">
  import type { PreviewStore } from '../types';
  import type { EmojiRecord } from '../data';

  import { getContext, onDestroy } from 'svelte';

  let currentPreview: EmojiRecord;

  const previewStore = getContext<PreviewStore>('preview');
  const unsubscribe = previewStore.subscribe(emoji => {
    currentPreview = emoji;
  });

  onDestroy(unsubscribe);
</script>

<div class="preview">
  {#if currentPreview}
    <div class="preview-emoji">{currentPreview.emoji}</div>
    <div class="preview-name">{currentPreview.label}</div>
    {#if currentPreview?.shortcodes.length}
      <div class="preview-shortcode">:{currentPreview.shortcodes[0]}:</div>
    {/if}
  {/if}
</div>

<style>
  .preview {
    display: grid;
    grid-template-areas:
      'emoji name'
      'emoji shortcode';
    grid-template-rows: 1.2em 1.2em;
    grid-template-columns: auto 1fr;
    column-gap: 0.75em;
    padding: 0.5em;
    border-top: 1px solid var(--border-color);
    height: 3em;
    align-items: center;
    align-content: center;
    font-weight: 500;
    z-index: 1;
    box-shadow: 0px -10px 15px 0px var(--white);
  }

  .preview-emoji {
    grid-area: emoji;
    font-family: color-emoji;
    font-size: 2.75em;
  }

  .preview-name {
    grid-area: name;
    text-transform: capitalize;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color);
  }

  .preview-shortcode {
    grid-area: shortcode;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }
</style>
