import { View } from './view';
import { compileTemplateSync } from '../templates';
import placeholderTemplate from '../templates/placeholder.ejs';
const template = compileTemplateSync(placeholderTemplate);
import classes from '../common.scss';

type ImageOptions = {
  classNames?: string;
};

export class Image extends View {
  private classNames?: string;

  constructor({ classNames }: ImageOptions = {}) {
    super({ template, classes });
    this.classNames = classNames;
  }

  load(src: string) {
    const img = document.createElement('img');
    if (this.classNames) {
      img.className = this.classNames;
    }

    img.addEventListener('load', () => {
      this.el.replaceWith(img);
    }, { once: true });

    img.src = src;
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
