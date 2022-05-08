import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { testViewSync } from '../../../testHelpers/testView';
import { EmojiRecord } from '../../types';

import { VariantPopup } from '../VariantPopup';

describe('VariantPopup', () => {
  const emoji: EmojiRecord = {
    emoji: '👍',
    label: 'thumbs',
    skins: [
      { label: 'thumbs up1', emoji: '👍🏼' },
      { label: 'thumbs up2', emoji: '👍🏿' }
    ]
  }

  test('renders the emoji and its variants', () => {
    testViewSync(VariantPopup, [{ emoji, parent: document.body }]);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('👍');
    expect(buttons[1]).toHaveTextContent('👍🏼');
    expect(buttons[2]).toHaveTextContent('👍🏿');
  });

  test('navigates emojis with arrow keys', () => {
    testViewSync(VariantPopup, [{ emoji, parent: document.body }]);
    const buttons = screen.getAllByRole('button');

    buttons[0].focus();

    userEvent.keyboard('[ArrowLeft]');
    expect(buttons[2]).toHaveFocus();

    userEvent.keyboard('[ArrowRight]');
    expect(buttons[0]).toHaveFocus();

    userEvent.keyboard('[ArrowRight]');
    expect(buttons[1]).toHaveFocus();

    userEvent.keyboard('[ArrowRight]');
    expect(buttons[2]).toHaveFocus();

    userEvent.keyboard('[ArrowRight]');
    expect(buttons[0]).toHaveFocus();
  });
});
