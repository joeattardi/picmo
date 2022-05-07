import { Template } from '../Template';

function repeat(count, content) {
  return Array.from({ length: count }, () => content).join('');
}

function header({ showHeader, classes }) {
  return showHeader ? /* html */`
    <header class="${classes.header}">
      <div data-view="search"></div>
      <div data-view="categoryTabs" data-render="sync"></div>
    </header>
  ` : '';
}

function renderPicker(data) {
  const { classes, theme, className = ''} = data;
  return /* html */`
    <div class="${classes.picker} ${theme} ${className}">
      ${header(data)}
      <div class="${classes.content}">
        <div data-view="emojiArea"></div>
      </div>
      <div data-view="preview"></div>
    </div>
  `;
}

function renderPlaceholder(data) {
  const { emojiCount, classes, theme, className } = data;

  const search = ({ showSearch, classes }) => showSearch ? /* html */`
    <div class="${classes.searchSkeleton}">
      <div class="${classes.searchInput} ${classes.placeholder}"></div>
    </div>
  ` : '';

  const categoryTabs = ({ showCategoryTabs, classes }) => showCategoryTabs ? /* html */`
    <div class="${classes.categoryTabsSkeleton}">
      ${repeat(10, /* html */`<div class="${classes.placeholder} ${classes.categoryTab}"></div>`)}
    </div>
  ` : '';

  const header = ({ showHeader, classes }) => showHeader ? /* html */`
    <header class="${classes.header}">
      ${search(data)}
      ${categoryTabs(data)}
    </header>
  ` : '';

  const preview = ({ showPreview, classes }) => showPreview ? /* html */`
    <div class="${classes.previewSkeleton}">
      <div class="${classes.placeholder} ${classes.previewEmoji}"></div>
      <div class="${classes.placeholder} ${classes.previewName}"></div>
      <ul class="${classes.tagList}">
        ${repeat(3, /* html */`<li class="${classes.placeholder} ${classes.tag}"></li>`)}
      </ul>
    </div>
  ` : '';

  return /* html */`
    <div class="${classes.skeleton} ${classes.picker} ${theme} ${className}">
      ${header(data)}
      <div class="${classes.contentSkeleton}">
        <div class="${classes.placeholder} ${classes.categoryName}"></div>
        <div class="${classes.emojiGrid}">
          ${repeat(emojiCount, /* html */`<div class="${classes.placeholder} ${classes.emoji}"></div>`)}
        </div>
      </div>
      ${preview(data)}
    </div>
  `;
}

export default new Template(data => {
  return data.isLoaded ? renderPicker(data) : renderPlaceholder(data);
});
