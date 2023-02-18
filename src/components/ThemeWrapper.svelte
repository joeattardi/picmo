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
  /* Refactoring UI Palette 8 */

  .light, .dark {
    --blue-1: #002159;
    --blue-2: #01337D;
    --blue-3: #03449E;
    --blue-4: #0552B5;
    --blue-5: #0967D2;
    --blue-6: #2186EB;
    --blue-7: #47A3F3;
    --blue-8: #7CC4FA;
    --blue-9: #BAE3FF;
    --blue-10: #E6F6FF;

    --gray-1: #1F2933;
    --gray-2: #323F4B;
    --gray-3: #3E4C59;
    --gray-4: #52606D;
    --gray-5: #616E7C;
    --gray-6: #7B8794;
    --gray-7: #9AA5B1;
    --gray-8: #CBD2D9;
    --gray-9: #E4E7EB;
    --gray-10: #F5F7FA;



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
    --background-color: var(--gray-10);
    --secondary-background-color: var(--gray-9);

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

    --category-header-background: var(--white);
    --category-header-color: var(--blue-dark);

    --emoji-hover-background-color: var(--blue-10);
    --emoji-hover-border-color: var(--blue-9);
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
