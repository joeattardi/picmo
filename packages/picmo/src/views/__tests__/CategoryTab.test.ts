import userEvent from '@testing-library/user-event';
import { testViewSync } from '../../../testHelpers/testView';

import { Events } from '../../events';
import { AppEvent } from '../../AppEvents';

import { CategoryTab } from '../CategoryTab';
import { Category } from '../../types';

describe('CategoryTab', () => {
  const category: Category = {
    key: 'smileys-emotion',
    message: 'Smileys & Emotion',
    order: 0
  };

  const events = new Events<AppEvent>();
  const emitSpy = jest.spyOn(events, 'emit');

  const icon = 'smiley';

  afterEach(() => {
    emitSpy.mockReset();
  });

  function renderTab() {
    return testViewSync(CategoryTab, [{ category, icon }], { events });
  }

  test('renders a category tab', () => {
    const tab = renderTab();

    const button = tab.ui.button;
    expect(button).toHaveAttribute('data-category', 'smileys-emotion');
    expect(button).toHaveAttribute('title', 'Smileys & Emotion');
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  test('toggles the active status', () => {
    const tab = renderTab();
    const button = tab.ui.button;
    expect(button.ariaSelected).toBe('false');

    // By default it should make the tab focusable and set aria-selected to true
    tab.setActive(true);
    expect(button.ariaSelected).toBe('true');
    expect(button.tabIndex).toBe(0);

    // Deactivation should reset tabindex and aria-selected
    tab.setActive(false);
    expect(button.ariaSelected).toBe('false');
    expect(button.tabIndex).toBe(-1);

    // Setting active without focus (like when scrolling) should not change tabindex or aria-selected
    tab.setActive(true, false);
    expect(button.ariaSelected).toBe('false');
  });

  test('emits a category:select event when clicked', () => {
    const tab = renderTab();
    const button = tab.ui.button;

    userEvent.click(button);
    expect(events.emit).toHaveBeenCalledWith('category:select', 'smileys-emotion', expect.anything());
  });
});
