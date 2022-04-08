import { View } from './view';

import classes from './ErrorMessage.scss';
import errorTemplate from '../templates/error.ejs';

type ErrorMessageOptions = {
  message: string;
  icon?: string;
  template?: string;
};

export class ErrorMessage extends View {
  private message: string;
  private icon: string;

  constructor({ message, icon = 'fa-triangle-exclamation', template = errorTemplate }: ErrorMessageOptions) {
    super({ template, classes });
    this.message = message;
    this.icon = icon;
  }

  renderSync() {
    return super.renderSync({ message: this.message, icon: this.icon });
  }
}