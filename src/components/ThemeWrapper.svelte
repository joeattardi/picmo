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
    --border-color: #cccccc;
  }

  .dark {
  }
</style>
