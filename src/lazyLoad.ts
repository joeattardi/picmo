import { compileTemplate } from './templates';
import placeholderTemplate from './templates/placeholder.ejs';

const placeholder = compileTemplate(placeholderTemplate);

type LazyLoadFactory = () => HTMLElement | Promise<HTMLElement>;

// TODO lazy load custom emojis too
export class LazyLoader {
  private elements: Map<Element, LazyLoadFactory> = new Map();

  lazyLoad(callback: LazyLoadFactory): HTMLElement {
    const element = placeholder();
    this.elements.set(element, callback);
    return element;
  }

  observe(root: HTMLElement): void {
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
  }
}
