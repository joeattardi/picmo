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
  .light {
    color-scheme: light;
    --background-color: #ffffff;
    --secondary-background-color: #e2e8f0;
    --border-color: #cccccc;
    --text-color: #000000;
    --secondary-text-color: #666666;

    --search-background-color: #f9fafb;
    --search-focus-background-color: #ffffff;
    --search-icon-color: #999999;
    --search-icon-focus-color: #60a5fa;

    --category-tab-icon-color: #64748b;
    --category-tab-icon-focus-color: #38bdf8;
    --category-tab-hover-background-color: rgba(167, 139, 250, 0.3);
    --category-tab-active-background-color: #4f46e5;
    --category-tab-active-color: #ffffff;

    --category-header-color: #1e3a8a;

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
