import { Template } from '../Template';

export default new Template(({ classes, category, pickerId, icon, i18n }) => /* html */`
  <section class="${classes.emojiCategory}" role="tabpanel" aria-labelledby="${pickerId}-category-${category.key}">
    <h3 data-category="${category.key}" class="${classes.categoryName}">
      <i data-icon="${icon}"></i>
      ${i18n.get(`categories.${category.key}`, category.message || category.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);