import { LitElement } from 'lit';
import { contextProvided } from '@lit-labs/context';
import { property } from 'lit/decorators.js';

import { i18nContext } from './I18nContext';
import { emojiPickerContext } from './EmojiPickerContext';
import { PickerContextData } from './EmojiPickerContext';
import { Bundle } from '../i18n/bundle';

export class Element extends LitElement {
  @contextProvided({ context: i18nContext })
  @property({ attribute: false })
  i18n: Bundle;

  @contextProvided({ context: emojiPickerContext })
  @property({ attribute: false })
  contextData: PickerContextData;

  get pickerId() {
    return this.contextData.pickerId;
  }
}
