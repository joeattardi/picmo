export function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}
