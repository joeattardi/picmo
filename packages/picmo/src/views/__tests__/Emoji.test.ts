import { fireEvent } from '@testing-library/dom';

import { Emoji } from '../Emoji';
import { testViewSync } from '../../../testHelpers/testView';

import { Events } from '../../events';
import { AppEvent } from '../../AppEvents';
import { CategoryKey } from '../../types';

describe('Emoji', () => {
  const emojiData = {
    emoji: '😎',
    label: 'smile'
  };

  const events = new Events<AppEvent>();
  const emitSpy = jest.spyOn(events, 'emit');

  function renderEmoji(category?: CategoryKey) {
    return testViewSync(Emoji, [{ emoji: emojiData, category }], {
      events
    });
  }

  afterEach(() => {
    emitSpy.mockReset();
  });

  test('renders an emoji', async () => {
    const { el } = renderEmoji();
    expect(el).toHaveTextContent('😎');
    expect(el).toHaveAttribute('title', 'smile');
    expect(el).toHaveAttribute('data-emoji', '😎');
  });

  test('emits focus:change event when the emoji receives focus and there is a category', () => {
    const { el } = renderEmoji('smileys-emotion');
    fireEvent.focus(el);
    expect(events.emit).toHaveBeenCalledWith('focus:change', 'smileys-emotion');
  });

  test('does not emit focus:change event if there is no category set', () => {
    const { el } = renderEmoji();
    fireEvent.focus(el);
    expect(events.emit).not.toHaveBeenCalled();
  });

  test('activates/deactivates focus', () => {
    const emoji = renderEmoji();
    expect(emoji.el).toHaveAttribute('tabindex', '-1');

    emoji.activateFocus();
    expect(document.activeElement).not.toBe(emoji.el);
    expect(emoji.el).toHaveAttribute('tabindex', '0');

    emoji.deactivateFocus();
    expect(emoji.el).toHaveAttribute('tabindex', '-1');
    
    emoji.activateFocus(true);
    expect(document.activeElement).toBe(emoji.el);
  });
});
