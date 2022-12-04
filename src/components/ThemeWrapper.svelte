<script lang="ts">
  // TODO support auto theme
  export let theme: 'light' | 'dark' | 'auto' = 'light';
</script>

<div class={theme}>
  <slot />
</div>

<style>
  .light {
    color-scheme: light;
    --background-color: #ffffff;
    --secondary-background-color: #e2e8f0;
    --border-color: #cccccc;
    --text-color: #000000;

    --header-background-color: var(--secondary-background-color);

    --search-background-color: #f9fafb;
    --search-focus-background-color: #ffffff;
    --search-icon-color: #999999;
    --search-icon-focus-color: #60a5fa;

    --category-tab-icon-color: #64748b;
    --category-tab-icon-focus-color: #38bdf8;
    --category-tab-hover-background-color: rgba(167, 139, 250, 0.3);

    --category-header-color: #1e3a8a;
  }

  .dark {
  }
</style>
