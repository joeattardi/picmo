import { Template } from '../Template';

export default new Template(({ classes, emoji }) => /* html */`
  <button
    class="${classes.emoji}"
    title="${emoji.label}"
    data-emoji="${emoji.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`);