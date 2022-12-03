<script>
  import CategoryTabs from './CategoryTabs.svelte';
  import Search from './Search.svelte';
</script>

<header>
  <Search />
  <CategoryTabs />
</header>

<style>
  header {
    background: var(--header-background-color);
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius);
  }
</style>
