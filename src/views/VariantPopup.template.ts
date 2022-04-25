import { Template } from '../Template';

export default new Template(({ classes }) => /* html */`
  <div class="${classes.variantOverlay}">
    <div class="${classes.variantPopup}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
  </div>
`);
