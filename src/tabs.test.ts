import { TinyEmitter as Emitter } from 'tiny-emitter';

import { Tabs } from './tabs';
import { i18n } from './i18n';

describe('Tabs', () => {
  let tabsContainer;
  let tabs;
  let tabBodies;

  function isActive(tab): boolean {
    return (
      tabs[tab].classList.contains('active') &&
      tabBodies[tab].classList.contains('active')
    );
  }

  beforeEach(() => {
    const events = new Emitter();
    const options = { showRecents: true };
    tabsContainer = new Tabs(events, i18n, options).render();
    tabs = tabsContainer.querySelectorAll('.emoji-picker__tab');
    tabBodies = tabsContainer.querySelectorAll('.emoji-picker__tab-body');
  });

  test('should set the active tab by clicking', () => {
    expect(isActive(2)).toBe(false);
    tabs[2].dispatchEvent(new MouseEvent('click'));
    expect(isActive(2)).toBe(true);

    expect(isActive(0)).toBe(false);
    tabs[0].dispatchEvent(new MouseEvent('click'));
    expect(isActive(0)).toBe(true);
    expect(isActive(2)).toBe(false);
  });

  test('should set the active tab via keyboard navigation', () => {
    const tabsList = tabsContainer.querySelector('.emoji-picker__tabs');

    // tab 1 (smileys) starts out selected
    expect(isActive(1)).toBe(true);

    // go one left, tab 0 (recents) should be selected
    tabsList.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(isActive(1)).toBe(false);
    expect(isActive(0)).toBe(true);

    // go one more left, should wrap to last tab
    tabsList.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(isActive(0)).toBe(false);
    expect(isActive(tabs.length - 1)).toBe(true);

    // go right, should wrap back to first tab
    tabsList.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(isActive(tabs.length - 1)).toBe(false);
    expect(isActive(0)).toBe(true);

    // go one more right, tab 1 should be selected
    tabsList.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(isActive(0)).toBe(false);
    expect(isActive(1)).toBe(true);
  });
});
