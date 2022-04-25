import { View } from './view';
import { Template } from '../Template';
import classes from '../common.scss';

const template = new Template(({ classes }) => /* html */`
  <div class="${classes.placeholder} ${classes.imagePlaceholder}"></div>
`);

type ImageOptions = {
  classNames?: string;
};

export class Image extends View {
  private classNames?: string;

  constructor({ classNames }: ImageOptions = {}) {
    super({ template, classes });
    this.classNames = classNames;
  }

  load(src: string | Promise<string>) {
    const img = document.createElement('img');
    if (this.classNames) {
      img.className = this.classNames;
    }

    img.addEventListener('load', () => {
      this.el.replaceWith(img);
    }, { once: true });

    Promise.resolve(src).then(src => img.src = src);
  }

  renderSync() {
    super.renderSync();
    if (this.classNames) {
      const classNames = this.classNames.split(' ');
      classNames.forEach(className => this.el.classList.add(className));
    }

    return this.el;
  }
}
