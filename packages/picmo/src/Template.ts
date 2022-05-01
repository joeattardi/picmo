import { icon, IconSize } from './icons';
import { View } from './views/view';
import { toElement } from './util';

export type TemplateData = Record<string, any>;
type ViewData = Record<string, View>;

type RenderMode = 'sync' | 'async';

type TemplateOptions = {
  mode: RenderMode;
}

const defaultOptions: TemplateOptions = {
  mode: 'sync'
};

export class Template<E extends HTMLElement = HTMLElement> {
  #templateFn: (TemplateData) => string;
  #mode: RenderMode;

  constructor(templateFn: (TemplateData) => string, options: Partial<TemplateOptions> = {}) {
    this.#templateFn = templateFn;
    this.#mode = options.mode || defaultOptions.mode;
  }

  renderSync(data: TemplateData = {}): E {
    const result = toElement<E>(this.#templateFn(data));
    this.#bindPlaceholders(result, data);
    this.#bindIcons(result);
    this.#renderChildViews(result, data);
    return result;
  }

  async renderAsync(data: TemplateData = {}): Promise<E> {
    const result = toElement<E>(this.#templateFn(data));
    this.#bindPlaceholders(result, data);
    this.#bindIcons(result);
    await this.#renderChildViews(result, data);
    return result;
  }

  render(data: TemplateData): E | Promise<E> {
    return this.#mode === 'sync' ? this.renderSync(data) : this.renderAsync(data);
  }

  async #renderChildViews(result: E, data: ViewData) {
    const placeholders = result.querySelectorAll<HTMLElement>('[data-view]');

    const asyncViews: Promise<HTMLElement>[] = [];

    for (const placeholder of placeholders) {
      const view = data[placeholder.dataset.view as string];
      if (view) {
        if (placeholder.dataset.render !== 'sync') {
          asyncViews.push(view.render().then(result => {
            placeholder.replaceWith(result);
            return result;
          }));
        } else {
          placeholder.replaceWith(view.renderSync());
        }
      } else {
        placeholder.remove();
      }
    }

    return Promise.all(asyncViews);
  }

  #bindIcons(result: E) {
    const icons = result.querySelectorAll<HTMLElement>('i[data-icon]');
    icons.forEach((placeholder: HTMLElement) => {
      const { icon: iconKey, size } = placeholder.dataset;
      placeholder.replaceWith(icon(iconKey as string, size as IconSize));
    })
  }

  #bindPlaceholders(result: E, data: TemplateData): E {
    const placeholders = result.querySelectorAll<HTMLElement>('[data-placeholder]');
    
    placeholders.forEach((placeholder: HTMLElement) => {
      const key = placeholder.dataset.placeholder;

      if (key && data[key]) {
        const replacement = data[key];
        placeholder.replaceWith(...[replacement].flat());
      } else {
        console.warn(`Missing placeholder element for key "${key}"`);
      }
    });

    return result;
  }
}
