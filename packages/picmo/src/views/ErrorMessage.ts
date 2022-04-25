import { View } from './view';
import { Template } from '../Template';
import errorTemplate from './ErrorMessage.template';
import classes from './ErrorMessage.scss';

type ErrorMessageOptions = {
  message: string;
  icon?: string;
  template?: Template;
  className?: string;
};

export class ErrorMessage extends View {
  private message: string;
  private icon: string;
  private className?: string;

  constructor({ message, icon = 'warning', template = errorTemplate, className }: ErrorMessageOptions) {
    super({ template, classes });

    this.message = message;
    this.icon = icon;
    this.className = className;
  }

  renderSync() {
    const classList = [classes.error, this.className].join(' ').trim();
    return super.renderSync({ message: this.message, icon: this.icon, classList });
  }
}