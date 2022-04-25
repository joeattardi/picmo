import { Template } from '../Template';

export default new Template(({ classes }) => /* html */`
  <div class="${classes.emojiContainer}">
    <div data-placeholder="emojis"></div>
  </div>
`);
