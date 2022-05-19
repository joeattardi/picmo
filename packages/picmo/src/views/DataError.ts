import { View } from './view';
import { ErrorMessage } from './ErrorMessage';
import { initDatabase } from '../data/emojiData';

import classes from './DataError.scss';
import template from './DataError.template';

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
      await this.options.dataStore.deleteDatabase(this.options.locale);
    }

    this.events.emit('reinitialize');
    const db = await initDatabase(this.options.locale, this.options.dataStore, this.options.messages, this.options.emojiData, this.emojiData);
    this.viewFactory.setEmojiData(db);
    this.events.emit('data:ready', db);
  }
}
