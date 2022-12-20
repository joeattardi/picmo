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
      opacity: 0.3;
      transform: scale(0.9);
    }
    to {
      opacity: 0.9;
      transform: scale(1);
    }
  }

  .icon {
    position: absolute;
    color: #334155;
    animation: pulse 1s alternate infinite;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--full-height);
  }
</style>
