import { View } from './view';
import { ErrorMessage } from './ErrorMessage';
import { initDatabase } from '../emojiData';

import template from '../templates/dataError.ejs';
import { Database } from '../db';

type DataErrorOptions = {
  message: string;
};

export class DataError extends ErrorMessage {
  constructor({ message }: DataErrorOptions) {
    super({ message, template });
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
