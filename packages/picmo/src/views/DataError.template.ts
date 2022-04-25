import { Template } from '../Template';

export default new Template(({ classList, classes, icon, i18n, message }) => /* html */`
  <div class="${classList}">
    <div class="${classes.icon}"><i data-size="10x" data-icon="${icon}"></i></div>
    <h3 class="${classes.title}">${message}</h3>
    <button>${i18n.get('retry')}</button>
  </div>
`);
