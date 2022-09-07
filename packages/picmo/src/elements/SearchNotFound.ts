import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { EmojiRecord } from '../types';

import { PicMoElement } from './PicMoElement';

@customElement('picmo-search-not-found')
export class SearchNotFound extends PicMoElement {
  static styles = css`
    @keyframes appear {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 0.4;
      }
    }

    .notFoundMessage {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color);
    }

    .icon {
      --fa-animation-duration: 10000ms;
      opacity: 0.4;
    }

    .title {
      animation: appear 250ms;
      animation-delay: 50ms;
      animation-fill-mode: both;
    }
  `;

  render() {
    return html`
      <div class="notFoundMessage">
        <div class="icon">
          <picmo-icon icon="ghost" size="10x" animation="beat-fade"></picmo-icon>
        </div>
        <h3 class="title">${this.i18n.get('search.notFound')}</h3>
      </div>
    `;
  }
}