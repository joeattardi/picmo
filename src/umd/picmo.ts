import en from '../i18n/lang-en';

export * from '../index';
export * from '../themes';
export { NativeRenderer } from '../renderers/native';

// TODO: When there are more i18n bundles, separate them into other modules
export const i18n = { en };
