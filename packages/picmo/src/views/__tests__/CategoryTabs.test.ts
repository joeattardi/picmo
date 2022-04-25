import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { CategoryTabs } from '../CategoryTabs';

import { testViewSync } from '../../../testHelpers/testView';
import { Category, CategoryKey } from '../../types';

describe('CategoryTabs', () => {
  function createCategory(key: CategoryKey, order: number): Category {
    return { key, message: key, order };
  }

  function renderTabs() {
    const categories = [
      createCategory('smileys-emotion', 0),
      createCategory('people-body', 1),
      createCategory('animals-nature', 2)
    ];

    return testViewSync(CategoryTabs, [{ categories }]);
  }

  test('renders category tabs', async () => {
    await renderTabs();
    const tabs = screen.getAllByRole('tab');

    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('title', 'smileys-emotion');
    expect(tabs[1]).toHaveAttribute('title', 'people-body');
    expect(tabs[2]).toHaveAttribute('title', 'animals-nature');
  });

  test('sets the active tab', async () => {
    const container = await renderTabs();

    container.setActiveTab(1);
    expect(screen.getByTitle('smileys-emotion').ariaSelected).toBe('false');
    expect(container.currentTabView.category.key).toBe('people-body');
    expect(screen.getByTitle('people-body').ariaSelected).toBe('true');
  });

  test('cycles tabs with the arrow keys', async () => {
    const container = await renderTabs();
    container.currentTabView.ui.button.focus();

    expect(container.currentCategory.key).toEqual('smileys-emotion');
    
    userEvent.keyboard('[ArrowRight]');
    expect(container.currentCategory.key).toEqual('people-body');

    userEvent.keyboard('[ArrowRight]');
    expect(container.currentCategory.key).toEqual('animals-nature');

    // should cycle back to first tab
    userEvent.keyboard('[ArrowRight]');
    expect(container.currentCategory.key).toEqual('smileys-emotion');

    // should cycle back to last tab
    userEvent.keyboard('[ArrowLeft]');
    expect(container.currentCategory.key).toEqual('animals-nature');

    userEvent.keyboard('[ArrowLeft]');
    expect(container.currentCategory.key).toEqual('people-body');

  });
});