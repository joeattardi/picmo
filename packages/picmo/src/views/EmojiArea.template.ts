import { Template } from '../Template';

export default new Template(({ classes }) => /* html */`
  <div class="${classes.emojis}">
    <div data-placeholder="emojis"></div>
  </div>
`);