const Emitter = require('tiny-emitter');

const { Tabs } = require('./tabs');

const { i18n } = require('./i18n');

describe('Tabs', () => {
  function isActive(tab) {
    return tab.classList.contains('active');
  }

  test('should set the active tab', () => {
    const events = new Emitter();
    const options = { showRecents: true };
    const tabsContainer = new Tabs(events, i18n, options).render();

    const tab2 = tabsContainer.querySelectorAll('.emoji-picker__tab')[2];
    const body2 = tabsContainer.querySelectorAll('.emoji-picker__tab-body')[2];
    expect(isActive(tab2)).toBe(false);
    expect(isActive(body2)).toBe(false);
    tab2.dispatchEvent(new MouseEvent('click'));
    expect(isActive(tab2)).toBe(true);
    expect(isActive(body2)).toBe(true);

    const tab0 = tabsContainer.querySelectorAll('.emoji-picker__tab')[0];
    const body0 = tabsContainer.querySelectorAll('.emoji-picker__tab-body')[0];
    expect(isActive(tab0)).toBe(false);
    expect(isActive(body0)).toBe(false);
    tab0.dispatchEvent(new MouseEvent('click'));
    expect(isActive(tab0)).toBe(true);
    expect(isActive(body0)).toBe(true);
    expect(isActive(tab2)).toBe(false);
    setTimeout(() => {
      expect(isActive(body2)).toBe(false);
    });
  });
});
