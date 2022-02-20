import { dom } from '@fortawesome/fontawesome-svg-core';

import ejs, { Data } from 'ejs';

type ElementTemplate = (data?: Data) => HTMLElement;

// TODO: add i18n to helpers

/**
 * Takes the data passed to a template, and adds the common template
 * helpers.
 *
 * This prevents the need to add common things to each individual template.
 *
 * @param data the data supplied to the template
 * @returns a new data object containing the original data plus helpers
 */
function addHelpers(data: Data = {}): Data {
  return {
    ...data
  };
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
  return (data: Data = {}) => {
    return toElement(compiled(addHelpers(data)));
  };
}

/**
 * Renders a template to an HTML element.
 *
 * @param template the template text
 * @param data data to supply to the template
 * @returns the rendered HTMLElement
 */
export function renderTemplate<E extends HTMLElement = HTMLElement>(template: string, data: Data = {}): E {
  const result = toElement<E>(ejs.render(template, addHelpers(data)));

  const placeholders = result.querySelectorAll<E>('[data-placeholder]');
  if (placeholders.length) {
    placeholders.forEach((placeholder: HTMLElement) => {
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
  }

  dom.i2svg({ node: result });

  return result;
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
