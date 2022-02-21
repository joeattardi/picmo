export abstract class View implements IView {
  el: HTMLElement;
  abstract doRender(): Promise<HTMLElement>;
  uiEvents = {};

  async render(): Promise<HTMLElement> {
    this.el = await this.doRender();
    // this.bindListeners();
    return this.el;
  }

  private bindListeners() {
    const events = Object.keys(this.uiEvents);

    Object.entries(this.uiEvents).forEach(([event, handler]): [Event, EventListenerOrEventListenerObject] => {
      this.el.addEventListener(event, handler.bind(this));
    });
  }
}
