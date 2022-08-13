export const globalConfig = {
  injectStyles: false
};

export default function setGlobalConfig(options) {
  Object.assign(globalConfig, options);
}
