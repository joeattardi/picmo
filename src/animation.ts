import { expoOut } from 'svelte/easing';
// Honor prefers-reduced-motion: https://geoffrich.net/posts/accessible-svelte-transitions/
export function slideTransition(node: HTMLElement, { direction = 1, enabled = true }) {
  return {
    duration: 250,
    easing: expoOut,
    css: (t: number) => {
      if (enabled) {
        return `
          transform: translate3d(${(1 - t) * 100 * direction}%, 0, 0);
        `;
      }

      return `
        transform: translate3d(0, 0, 0);
      `;
    }
  };
}
