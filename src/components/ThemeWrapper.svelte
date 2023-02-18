<script lang="ts">
  import { onMount } from 'svelte';
  import { themes } from '../themes';

  export let theme = themes.light;

  let className = theme;

  function themeUpdate(event) {
    className = event.matches ? themes.dark : themes.light;
  }

  onMount(() => {
    if (window.matchMedia && theme === themes.auto) {
      const match = window.matchMedia('(prefers-color-scheme: dark');
      className = match.matches ? themes.dark : themes.light;

      match.addEventListener('change', themeUpdate);
      return () => match.removeEventListener('change', themeUpdate);
    }
  });
</script>

<div class={className}>
  <slot />
</div>

<style>
  /* Refactoring UI Palette 8 */

  /* The color palette */
  .light,
  .dark {
    --blue-1: #002159;
    --blue-2: #01337d;
    --blue-3: #03449e;
    --blue-4: #0552b5;
    --blue-5: #0967d2;
    --blue-6: #2186eb;
    --blue-7: #47a3f3;
    --blue-8: #7cc4fa;
    --blue-9: #bae3ff;
    --blue-10: #e6f6ff;

    --gray-1: #1f2933;
    --gray-2: #323f4b;
    --gray-3: #3e4c59;
    --gray-4: #52606d;
    --gray-5: #616e7c;
    --gray-6: #7b8794;
    --gray-7: #9aa5b1;
    --gray-8: #cbd2d9;
    --gray-9: #e4e7eb;
    --gray-10: #f5f7fa;

    --white: #fafafa;
  }

  .light {
    color-scheme: light;
    --background-color: var(--gray-9);
    --category-shadow-color: hsla(216, 33%, 97%, 0.5);
    --preview-shadow-color: hsl(216, 33%, 97%);
    --emoji-area-background: var(--white);
    --border-color: var(--gray-8);

    --text-color: var(--gray-1);
    --secondary-text-color: var(--gray-4);

    --search-background-color: var(--gray-10);
    --search-focus-background-color: var(--white);
    --search-icon-color: var(--gray-3);
    --search-icon-focus-color: var(--blue-6);

    --category-tab-icon-color: var(--gray-4);
    --category-tab-icon-focus-color: var(--blue-1);
    --category-tab-hover-background-color: var(--gray-8);
    --category-tab-active-background-color: var(--blue-6);
    --category-tab-active-color: var(--white);

    --category-header-color: var(--text-color);

    --emoji-hover-background-color: var(--blue-10);
    --emoji-hover-border-color: var(--blue-9);
  }

  .dark {
    color-scheme: dark;
    --background-color: var(--gray-2);
    --category-shadow-color: hsla(210, 24%, 16%, 0.5);
    --preview-shadow-color: hsl(210, 24%, 16%);
    --emoji-area-background: var(--gray-1);
    --border-color: var(--gray-4);

    --text-color: var(--gray-9);
    --secondary-text-color: var(--gray-7);

    --search-background-color: var(--gray-3);
    --search-focus-background-color: var(--gray-2);
    --search-icon-color: var(--gray-8);
    --search-icon-focus-color: var(--blue-8);

    --category-tab-icon-color: var(--gray-7);
    --category-tab-icon-focus-color: var(--blue-8);
    --category-tab-hover-background-color: var(--gray-1);
    --category-tab-active-background-color: var(--blue-6);
    --category-tab-active-color: var(--white);

    --category-header-color: var(--gray-8);

    --emoji-hover-background-color: var(--gray-3);
    --emoji-hover-border-color: var(--gray-5);
  }
</style>
