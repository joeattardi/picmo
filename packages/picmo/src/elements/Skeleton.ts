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
      width: 100px;
      height: 32px;
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
  width: string;

  @property()
  height: string;

  render() {
    return html` <div class="skeleton" style="width: ${this.width}; height: ${this.height};"></div> `;
  }
}
