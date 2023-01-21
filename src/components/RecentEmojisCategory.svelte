<script lang="ts">
  import type { Category, EmojiRecord } from '../data';

  import { getContext } from 'svelte';
  import EmojiCategory from './EmojiCategory.svelte';
  import type { RecentsStore } from '../types';

  export let category: Category;
  export let index: number;
  export let categoryCount: number;

  const recentsStore = getContext<RecentsStore>('recents');

  let recents: EmojiRecord[];
  recentsStore.subscribe(value => (recents = value));
</script>

<EmojiCategory on:emojiselect emojis={recents} {category} {index} {categoryCount} />
