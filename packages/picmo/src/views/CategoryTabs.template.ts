import { Template } from '../Template';

export default new Template(({ classes }) => /* html */`
  <div class="${classes.categoryButtonsContainer}">
    <ul role="tablist" class="${classes.categoryButtons}">
      <div data-placeholder="tabs"></div>
    </ul>
  </div>
`);