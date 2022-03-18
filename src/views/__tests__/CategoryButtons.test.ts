import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { Category } from '../../types';
import { CategoryButtons } from '../CategoryButtons';

import { renderView } from '../../test-helpers/renderView';

describe('CategoryButtons', () => {
  const categories: Category[] = [
    { key: 'smileys-emotion', message: 'Smileys & Emotion', order: 1 },
    { key: 'people-body', message: 'People & Body', order: 2 },
    { key: 'animals-nature', message: 'Animals & Nature', order: 3 }
  ];

  test('renders the category buttons', async () => {
    const view = new CategoryButtons({ categories });
    await renderView(view);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    expect(buttons[0]).toHaveAccessibleName('Smileys & Emotion');
    expect(buttons[0]).toHaveAttribute('data-category', 'smileys-emotion');

    expect(buttons[1]).toHaveAccessibleName('People & Body');
    expect(buttons[1]).toHaveAttribute('data-category', 'people-body');

    expect(buttons[2]).toHaveAccessibleName('Animals & Nature');
    expect(buttons[2]).toHaveAttribute('data-category', 'animals-nature');
  });

  test('marks a button as active', async () => {
    const view = new CategoryButtons({ categories });
    await renderView(view);

    const buttons = screen.getAllByRole('button');
    view.setActiveButton(0);
    expect(buttons[0].ariaSelected).toBe('true');

    view.setActiveButton(1);
    expect(buttons[0].ariaSelected).toBe('false');
    expect(buttons[1].ariaSelected).toBe('true');
  });
});
