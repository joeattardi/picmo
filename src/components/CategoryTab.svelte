<script lang="ts">
  import type { Category } from '../data';

  import Icon from 'svelte-awesome';
  import { categoryIcons } from '../icons';

  export let category: Category;
</script>

<style>
  button {
    width: 2.75em;
    height: 2.75em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid transparent;
    background: transparent;
  }

  button:hover {
    background: #ccc;
  }
</style>

<li>
  <button
    title={category.message || category.key}
  >
    <Icon data={categoryIcons[category.key]} scale={1.2} />
  </button>
</li>