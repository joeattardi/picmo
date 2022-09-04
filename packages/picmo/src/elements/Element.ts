import { LitElement } from 'lit';
import { contextProvided } from '@lit-labs/context';
import { state } from 'lit/decorators.js';

import { i18nContext } from './I18nContext';
import { emojiPickerContext } from './EmojiPickerContext';
import { PickerContextData } from './EmojiPickerContext';
import { Bundle } from '../i18n/bundle';
import { dataContext } from './EmojiDataContext';
import { DataStore } from '../data/DataStore';
import { optionsContext } from './OptionsContext';
import { PickerOptions } from '../types';

export class Element extends LitElement {
  @contextProvided({ context: i18nContext })
  @state()
  i18n: Bundle;

  @contextProvided({ context: emojiPickerContext })
  @state()
  contextData: PickerContextData;

  @contextProvided({ context: dataContext })
  @state()
  emojiData: DataStore;

  @contextProvided({ context: optionsContext })
  @state()
  options: PickerOptions;

  get pickerId() {
    return this.contextData.pickerId;
  }

  get emojiVersion() {
    return this.contextData.emojiVersion;
  }

}
