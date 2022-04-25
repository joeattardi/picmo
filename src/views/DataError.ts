import { View } from './view';
import { ErrorMessage } from './ErrorMessage';
import { initDatabase } from '../emojiData';
import { Database } from '../db';
import { Template } from '../Template';

import classes from './DataError.scss';

const template = new Template(({ classList, classes, icon, i18n, message }) => /* html */`
  <div class="${classList}">
    <div class="${classes.icon}"><i data-size="10x" data-icon="${icon}"></i></div>
    <h3 class="${classes.title}">${message}</h3>
    <button>${i18n.get('retry')}</button>
  </div>
`);

type DataErrorOptions = {
  message: string;
};

export class DataError extends ErrorMessage {
  constructor({ message }: DataErrorOptions) {
    super({ message, template, className: classes.dataError });
  }

  initialize() {
    this.uiElements = { retryButton: 'button' };
    this.uiEvents = [View.childEvent('retryButton', 'click', this.onRetry)];

    super.initialize();
  }

  private async onRetry() {
    if (this.emojiData) {
      await this.emojiData.delete();
    } else {
      await Database.deleteDatabase(this.options.locale);
    }

    this.events.emit('reinitialize');
    const db = await initDatabase(this.options.locale, this.options.messages, this.options.emojiData, this.emojiData);
    this.viewFactory.setEmojiData(db);
    this.events.emit('data:ready', db);
  }
}
