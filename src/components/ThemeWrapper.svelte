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
    --background-color: #f9fafb;
    --secondary-background-color: #e2e8f0;
    --border-color: #cccccc;
    --text-color: #000000;

    --header-background-color: var(--secondary-background-color);

    --search-background-color: #f9fafb;
    --search-focus-background-color: #ffffff;
    --search-icon-color: #999999;
  }

  .dark {
  }
</style>
