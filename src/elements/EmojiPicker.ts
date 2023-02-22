import type { PickerOptions } from '../options';
import EmojiPicker from '../components/EmojiPicker.svelte';

export default class PicmoPicker extends HTMLElement {
  options: Partial<PickerOptions>;
  component: EmojiPicker;

  constructor(options: Partial<PickerOptions> = {}) {
    super();
    this.options = options;

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.component = new EmojiPicker({
      target: this.shadowRoot,
      props: { options: this.options }
    });

    this.component.$on('emojiselect', event => {
      this.dispatchEvent(event);
    });
  }

  disconnectedCallback() {
    this.component.$destroy();
  }
}

if (!customElements.get('picmo-picker')) {
  customElements.define('picmo-picker', PicmoPicker);
}
