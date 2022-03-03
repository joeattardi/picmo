import { dom } from '@fortawesome/fontawesome-svg-core';

import ejs, { Data } from 'ejs';

export type ElementTemplate = (data?: Data) => HTMLElement | Promise<HTMLElement>;

async function bindPlaceholders<E extends HTMLElement = HTMLElement>(result: E, data: Data): Promise<E> {
  await renderChildViews(result, data);

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
    return await bindPlaceholders(result, data);
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
  const result = await bindPlaceholders<E>(
    toElement<E>(ejs.render(template, data)),
    data
  );

  await dom.i2svg({ node: result });

  return result as E;
}

/**
 * Takes a rendered HTML string and renders a DOM node from it.
 *
 * @param html the HTML text
 * @returns the generated HTMLElement
 */
export function toElement<E extends HTMLElement = HTMLElement>(html: string): E {
  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content?.firstElementChild as E;
}
