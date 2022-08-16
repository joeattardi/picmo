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

  test('navigates emojis with arrow keys', async () => {
    const user = userEvent.setup();
    testViewSync(VariantPopup, [{ emoji, parent: document.body }]);
    const buttons = screen.getAllByRole('button');

    buttons[0].focus();

    await user.keyboard('[ArrowLeft]');
    expect(buttons[2]).toHaveFocus();

    await user.keyboard('[ArrowRight]');
    expect(buttons[0]).toHaveFocus();

    await user.keyboard('[ArrowRight]');
    expect(buttons[1]).toHaveFocus();

    await user.keyboard('[ArrowRight]');
    expect(buttons[2]).toHaveFocus();

    await user.keyboard('[ArrowRight]');
    expect(buttons[0]).toHaveFocus();
  });
});
