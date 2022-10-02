import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { PicMoElement } from './PicMoElement';

@customElement('picmo-skeleton')
export class Skeleton extends PicMoElement {
  static styles = css`
    @keyframes shine {
      to {
        transform: translateX(100%);
      }
    }

    .skeleton {
      background: var(--placeholder-background-color);
      position: relative;
      overflow: hidden;
    }

    .skeleton::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 20%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shine 2s infinite;
      content: '';
    }
  `;

  @property()
  width = '100px';

  @property()
  height = '32px';

  @property()
  borderRadius = '5px';

  @property()
  margin = "0";

  render() {
    return html` <div class="skeleton" style="width: ${this.width}; height: ${this.height}; border-radius: ${this.borderRadius}; margin: ${this.margin};"></div> `;
  }
}
