import { Template } from '../Template';

export default new Template(({ classes, i18n, category, pickerId, icon }) => /* html */`
<li class="${classes.categoryTab}">
  <button
    aria-selected="false"
    role="tab"
    class="${classes.categoryButton}"
    tabindex="-1"
    title="${i18n.get(`categories.${category.key}`, category.message || category.key)}"
    type="button"
    data-category="${category.key}"
    id="${pickerId}-category-${category.key}"
  >
    <i data-icon="${icon}"></i>
</li>
`);
