import { Image } from './views/Image';

type Callback = () => void;

export class LazyLoader {
  private elements: Map<Element, Callback> = new Map();

  lazyLoad(img: Image, callback: Callback): HTMLElement {
    this.elements.set(img.el, callback);
    return img.el;
  }

  observe(root: HTMLElement): void {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        entries => {
          entries
            .filter(entry => entry.intersectionRatio > 0)
            .map(entry => entry.target)
            .forEach(element => {
              const callback = this.elements.get(element);
              callback?.();
              observer.unobserve(element);
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
      this.elements.forEach(callback => {
        callback();
      });
    }
  }
}
