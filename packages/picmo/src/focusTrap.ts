export class FocusTrap {
  private rootElement: HTMLElement;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  activate(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.rootElement.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate() {
    this.rootElement?.removeEventListener('keydown', this.handleKeyDown);
  }

  get focusableElements(): NodeListOf<HTMLElement> {
    return this.rootElement.querySelectorAll<HTMLElement>('input, [tabindex="0"]');
  }

  get lastFocusableElement(): HTMLElement {
    return this.focusableElements[this.focusableElements.length - 1];
  }

  get firstFocusableElement(): HTMLElement {
    return this.focusableElements[0];
  }

  checkFocus(event: KeyboardEvent, referenceElement: HTMLElement, targetElement: HTMLElement) {
    if (event.target === referenceElement) {
      targetElement.focus();
      event.preventDefault();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      this.checkFocus(
        event,
        event.shiftKey ? this.firstFocusableElement : this.lastFocusableElement,
        event.shiftKey ? this.lastFocusableElement : this.firstFocusableElement
      );
    }
  }
}