import { Template } from '../Template';

export default new Template(({ classList, classes, icon, message }) => /* html */`
<div class="${classList}" role="alert">
  <div class="${classes.icon}"><i data-size="10x" data-icon="${icon}"></i></div>
  <h3 class="${classes.title}">${message}</h3>
</div>
`);
