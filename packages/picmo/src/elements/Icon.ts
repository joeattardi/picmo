import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { icon, IconName } from '@fortawesome/fontawesome-svg-core';

import { iconStyles } from './icons';

@customElement('picmo-icon')
export class Icon extends LitElement {
  @property()
  icon: IconName;

  @property({ type: Boolean })
  fixedWidth = false;

  @property({ type: String })
  size;

  @property({ type: String })
  animation;

  static styles = [
    iconStyles
  ];

  render() {
    const [iconNode] = icon({ prefix: 'fas', iconName: this.icon }).node;

    if (this.fixedWidth) {
      iconNode.classList.add('fa-fw');
    }

    if (this.size) {
      iconNode.classList.add(`fa-${this.size}`);
    }

    if (this.animation) {
      iconNode.classList.add(`fa-${this.animation}`);
    }

    return iconNode;
  }
}
