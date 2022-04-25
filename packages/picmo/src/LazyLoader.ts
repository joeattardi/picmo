type Callback = () => void;

export class LazyLoader {
  private elements: Map<Element, Callback> = new Map();

  lazyLoad(placeholder: HTMLElement, callback: Callback): HTMLElement {
    this.elements.set(placeholder, callback);
    return placeholder;
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
