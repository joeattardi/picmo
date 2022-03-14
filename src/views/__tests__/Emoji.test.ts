import { screen } from '@testing-library/dom';

import { Emoji } from '../Emoji';
import { renderToBody } from '../view';

import NativeRenderer from '../../renderers/native';

describe('Emoji', () => {
  test('renders an emoji', async () => {
    const emojiData = {
      emoji: '😎',
      name: 'smile'
    };

    const emoji = new Emoji({ emoji: emojiData });
    emoji.setRenderer(new NativeRenderer());

    await renderToBody(emoji);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('😎');
    expect(button).toHaveAttribute('title', 'smile');
    expect(button).toHaveAttribute('data-emoji', '😎');
  });
});
