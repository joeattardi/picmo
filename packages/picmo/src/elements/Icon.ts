import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { icon, IconName } from '@fortawesome/fontawesome-svg-core';

import { iconStyles } from '../icons';

@customElement('picmo-icon')
export class Icon extends LitElement {
  @property()
  icon: IconName;

  static styles = [
    iconStyles
  ];

  render() {
    return icon({ prefix: 'fas', iconName: this.icon }).node;
  }
}
