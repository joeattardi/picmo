import { screen } from '@testing-library/dom';

import { Emoji } from '../Emoji';
import { renderSyncToBody } from '../view';

import NativeRenderer from '../../renderers/native';

describe('Emoji', () => {
  test('renders an emoji', async () => {
    const emojiData = {
      emoji: '😎',
      label: 'smile'
    };

    const emoji = new Emoji({ emoji: emojiData });
    emoji.setRenderer(new NativeRenderer());

    renderSyncToBody(emoji);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('😎');
    expect(button).toHaveAttribute('title', 'smile');
    expect(button).toHaveAttribute('data-emoji', '😎');
  });
});
