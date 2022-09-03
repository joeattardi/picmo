import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Category } from '../types';

@customElement('picmo-category-tab')
export class CategoryTabElement extends LitElement {
  @property()
  category: Category;

  render() {
    return html`
      <div>${this.category.key}</div>
    `;
  } 
}