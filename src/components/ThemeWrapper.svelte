<script lang="ts">
  import { onMount } from 'svelte';

  export let theme: 'light' | 'dark' | 'auto' = 'light';

  let className = theme;

  function themeUpdate(event) {
    className = event.matches ? 'dark' : 'light';
  }

  onMount(() => {
    if (window.matchMedia && theme === 'auto') {
      const match = window.matchMedia('(prefers-color-scheme: dark');
      className = match.matches ? 'dark' : 'light';

      match.addEventListener('change', themeUpdate);
      return () => match.removeEventListener('change', themeUpdate);
    }
  });
</script>

<div class={className}>
  <slot />
</div>

<style>
  /* Refactoring UI Palette 2 */

  .light, .dark {
    --blue-dark: #003E6B;
    --blue-medium: #2680C2;
    --blue-light: #DCEEFB;

    --yellow-dark: #F0B429;
    --yellow-medium: #FADB5F;
    --yellow-light: #FFFBEA;

    --neutral-dark: #243B53;
    --neutral-medium: #627D98;
    --neutral-light: #F0F4F8;

    --white: #fafafa;
  }

  .light {
    color-scheme: light;
    /* --background-color: #ffffff; */
    --background-color: var(--neutral-light);
    --emoji-area-background: var(--white);
    --secondary-background-color: #e2e8f0;
    --border-color: #cccccc;
    --text-color: #000000;
    --secondary-text-color: #666666;

    --search-background-color: #f9fafb;
    --search-focus-background-color: #ffffff;
    --search-icon-color: #999999;
    --search-icon-focus-color: #60a5fa;

    --category-tab-icon-color: #486581;
    --category-tab-icon-focus-color: #38bdf8;
    --category-tab-hover-background-color: #BCCCDC;
    --category-tab-active-background-color: #0F609B;
    --category-tab-active-color: #ffffff;

    --category-header-background: var(--white);
    --category-header-color: var(--blue-dark);

    --emoji-hover-background-color: #e2e8f0;
  }

  .dark {
    color-scheme: dark;
    --background-color: #333333;
    --secondary-background-color: #000000 ;
    --border-color: --border-color: #666666;
    --text-color: #ffffff;
    --secondary-text-color: #999999;

    --search-background-color: #71717a;
    --search-focus-background-color: #333333;
    --search-icon-color: #cccccc;
    --search-icon-focus-color: #60a5fa;

    --category-tab-icon-color: #94a3b8;
    --category-tab-icon-focus-color: #7dd3fc;
    --category-tab-hover-background-color: rgba(167, 139, 250, 0.3);
    --category-tab-active-background-color: #4f46e5;
    --category-tab-active-color: #ffffff;

    --category-header-color: #93c5fd;

    --emoji-hover-background-color: #e2e8f0;
  }
</style>
