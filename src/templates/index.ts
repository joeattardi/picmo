import { icon, IconSize } from '../icons';
import ejs, { Data } from 'ejs';

import { toElement } from '../util';

export type ElementTemplate = (data?: Data) => HTMLElement | Promise<HTMLElement>;
export type ElementTemplateSync = (data?: Data) => HTMLElement;

function bindPlaceholders<E extends HTMLElement = HTMLElement>(template: string, result: E, data: Data): E {
  const placeholders = result.querySelectorAll<E>('[data-placeholder]');
  placeholders.forEach((placeholder: E) => {
    const key = placeholder.dataset.placeholder;
    if (key) {
      if (data[key]) {
        const replacement = data[key];
        if (Array.isArray(replacement)) {
          placeholder.replaceWith(...replacement);
        } else {
          placeholder.replaceWith(replacement);
        }
      } else {
        throw new Error(`Missing placeholder element for key "${key}"`);
      }
    }
  });

  return result;
}

function replaceIcons<E extends HTMLElement = HTMLElement>(result: E): E {
  const icons = result.querySelectorAll<E>('[data-icon]');
  icons.forEach((iconEl: E) => {
    const key = iconEl.dataset.icon;
    const size = iconEl.dataset.size as IconSize;

    if (key) {
      iconEl.replaceWith(icon(key, size));
    }
  });

  return result;
}

async function renderChildViews<E extends HTMLElement = HTMLElement>(result: E, views: object = {}): Promise<E> {
  const childViews = result.querySelectorAll<E>('[data-view]');
 
  for (const childView of childViews) {
    const key = childView.dataset.view;

    if (key && views[key]) {
      const view = views[key];
      childView.replaceWith(await view.render());
    } else {
      throw new Error(`Missing view element for key "${key}"`);
    }
  }

  return result;
}

/**
 * Compiles a template for later use.
 *
 * @param template the template text
 * @returns a template function that will render an HTMLElement
 */
export function compileTemplate(template: string): ElementTemplate {
  // Standard compiled EJS template
  const compiled = ejs.compile(template);

  // The returned function will add the helpers to the
  // supplied data.
  return async (data: Data = {}) => {
    const result = toElement(compiled(data));
    bindPlaceholders(template ,result, data);
    return renderChildViews(result, data);
  };
}

export function compileTemplateSync(template: string): ElementTemplateSync {
  const compiled = ejs.compile(template);

  return (data: Data = {}) => {
    const result = toElement(compiled(data));
    return bindPlaceholders(template, result, data);
  };
}

/**
 * Renders a template to an HTML element.
 *
 * @param template the template text
 * @param data data to supply to the template
 * @returns the rendered HTMLElement
 */
export async function renderTemplate<E extends HTMLElement = HTMLElement>(template: string, data: Data = {}): Promise<E> {
  const result = bindPlaceholders<E>(
    template,
    toElement<E>(ejs.render(template, data)),
    data
  );
  
  replaceIcons(result);
  await renderChildViews<E>(result, data);

  return result as E;
}

export function renderTemplateSync<E extends HTMLElement = HTMLElement>(template: string, data: Data = {}): E {
  const result = bindPlaceholders<E>(
    template,
    toElement<E>(ejs.render(template, data)),
    data
  );
  
  replaceIcons(result);
  return result as E;
}
