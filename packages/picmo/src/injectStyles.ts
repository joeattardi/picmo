import styleInject from 'style-inject';
import globalConfig from './globalConfig';

export function createStyleInjector() {
  let isInjected = false;

  return function inject(css) {
    if (globalConfig.injectStyles && !isInjected) {
      styleInject(css);
      isInjected = true;
    }
  }
}