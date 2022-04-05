import '@testing-library/jest-dom';

global.afterEach(() => {
  document.body.replaceChildren();
});
