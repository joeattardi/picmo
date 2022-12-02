<style>
  .light {
    color-scheme: light;
    --background-color: #f9fafb;
  }

  .dark {

  }
</style>

<script lang="ts">
  // TODO support auto theme
  export let theme: 'light' | 'dark' | 'auto' = 'light';
</script>

<div class={theme}>
  <slot></slot>
</div>
