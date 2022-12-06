<script lang="ts">
  import type { PreviewStore } from '../types';
  import type { EmojiRecord } from '../data';

  import { getContext } from 'svelte';

  let currentPreview: EmojiRecord;

  const previewStore = getContext<PreviewStore>('preview');
  previewStore.subscribe(emoji => {
    currentPreview = emoji;
  });
</script>

<div class="preview">
  {#if currentPreview}
    <div class="preview-emoji">{currentPreview.emoji}</div>
    <div class="preview-name">{currentPreview.label}</div>
    <ul class="preview-tags">tags</ul>
  {/if}
</div>

<style>
  .preview {
    display: grid;
    grid-template-areas:
      'emoji name'
      'emoji tags';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: auto 1fr;
    column-gap: 0.5em;
    padding: 0.5em;
    border-top: 1px solid var(--border-color);
    height: 3em;
  }

  .preview-emoji {
    grid-area: emoji;
    font-family: color-emoji;
    font-size: 2.5em;
  }

  .preview-name {
    grid-area: name;
    text-transform: capitalize;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .preview-tags {
    font-size: 0.9em;
    grid-area: tags;
    margin: 0;
    padding: 0;
  }
</style>
