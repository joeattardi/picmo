import ejs from 'ejs';
import { toElement } from './templates';
import placeholderTemplate from './templates/placeholder.ejs';

import classes from './lazyLoad.scss';

const placeholder = ejs.compile(placeholderTemplate);

type LazyLoadFactory = () => HTMLElement | Promise<HTMLElement>;

// TODO lazy load custom emojis too
export class LazyLoader {
  private elements: Map<Element, LazyLoadFactory> = new Map();

  lazyLoad(callback: LazyLoadFactory): HTMLElement {
    const element = toElement(placeholder({ classes }));
    this.elements.set(element, callback);
    return element;
  }

  observe(root: HTMLElement): void {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        entries => {
          entries
            .filter(entry => entry.intersectionRatio > 0)
            .map(entry => entry.target)
            .forEach(element => {
              const factory = this.elements.get(element);
              if (factory) {
                Promise.resolve(factory()).then(img => {
                  observer.unobserve(element);
                  element.replaceWith(img);
                });
              }
            });
        },
        {
          root
        }
      );

      this.elements.forEach((callback, element) => {
        observer.observe(element);
      });
    } else {
      this.elements.forEach((callback, element) => {
        Promise.resolve(callback()).then(img => {
          element.replaceWith(img);
        });
      });
    }
  }
}
