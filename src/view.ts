export abstract class View {
  el: HTMLElement;
  abstract doRender(): Promise<HTMLElement>;
  uiEvents = {};

  async render(): Promise<HTMLElement> {
    this.el = await this.doRender();
    this.bindListeners();
    return this.el;
  }

  private bindListeners() {
    Object.entries(this.uiEvents).forEach(([event, handler]: [string, any]) => {
      this.el.addEventListener(event, handler);
    });
  }
}
