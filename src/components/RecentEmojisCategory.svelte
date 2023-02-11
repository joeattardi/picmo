<script lang="ts">
  import type { Category, EmojiRecord } from '../data';

  import { getContext, onDestroy } from 'svelte';
  import EmojiCategory from './EmojiCategory.svelte';
  import type { RecentsStore } from '../types';
  import i18n from '../i18n';

  export let category: Category;
  export let index: number;
  export let categoryCount: number;

  const recentsStore = getContext<RecentsStore>('recents');

  let recents: EmojiRecord[];
  const unsubscribe = recentsStore.subscribe(value => (recents = value));

  onDestroy(unsubscribe);
</script>

<EmojiCategory on:emojiselect emojis={recents} emptyMessage={i18n.recents.none} {category} {index} {categoryCount} />
