<script lang="ts">
  import { faSmile } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'svelte-awesome';
  import { Smiley } from 'phosphor-svelte';
</script>

<div class="loader">
  <div class="icon">
    <Smiley size={128} weight="duotone" />
    <!-- <Icon data={faSmile} scale={4} /> -->
  </div>
</div>

<style>
  @keyframes pulse {
    from {
      opacity: 1;
      transform: translateY(-10%);
      /* transform: scale(0.95); */
    }
    to {
      opacity: 0.5;
      transform: translateY(0);
      /* transform: scale(1); */
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .icon {
    position: absolute;
    color: var(--text-color);
    animation: pulse 1000ms alternate infinite;
  }

  .loader {
    grid-area: body;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
