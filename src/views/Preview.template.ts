import { Template } from '../Template';

export default new Template(({ classes }) => /* html */`
  <div class="${classes.preview}">
    <div class="${classes.previewEmoji}"></div>
    <div class="${classes.previewName}"></div>
    <ul class="${classes.tagList}"></ul>
  </div>
`);