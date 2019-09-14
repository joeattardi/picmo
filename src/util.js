export function createElement(tagName, className) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  return element;
}

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function getEmojiName(emoji) {
  return typeof emoji.n === 'string' ? emoji.n : emoji.n[0];
}
