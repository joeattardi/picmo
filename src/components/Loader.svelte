<script lang="ts">
  import { faSmile } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';
</script>

<div class="loader">
  <div class="icon">
    <Icon data={faSmile} scale={4} />
  </div>
</div>

<style>
  @keyframes pulse {
    from {
      opacity: 0.5;
      transform: scale(0.95);
    }
    to {
      opacity: 0.9;
      transform: scale(1);
    }
  }

  .icon {
    position: absolute;
    color: var(--text-color);
    animation: pulse 1s alternate infinite;
  }

  .loader {
    grid-area: body;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
