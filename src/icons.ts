import {
  mdiBasketball,
  mdiCat,
  mdiCloseCircle,
  mdiRobot,
  mdiFlag,
  mdiFood,
  mdiLightbulb,
  mdiAccountMultiple,
  mdiHistory,
  mdiMagnify,
  mdiMagnifyClose,
  mdiEmoticon,
  mdiMusicBox,
  mdiTrainCar
} from '@mdi/js';
import ejs from 'ejs';

import classes from './styles';
import { toElement } from './templates';

const iconTemplate = ejs.compile(`
  <svg class="<%- iconClass %>" width="24" height="24" viewBox="0 0 24 24">
    <path d="<%- icon %>" />
  </svg>
`);

function createIcon(icon) {
  return () => {
    return toElement(
      iconTemplate({
        icon,
        iconClass: classes.icon
      })
    );
  };
}

function createIconPartial(icon) {
  return iconTemplate({
    icon,
    iconClass: classes.icon
  });
}

const icons = {};
const templatePartials = {};

function addIcon(name, icon) {
  icons[name] = createIcon(icon);
  templatePartials[name] = createIconPartial(icon);
}

export default icons;
export { templatePartials };

addIcon('activities', mdiBasketball);
addIcon('animals', mdiCat);
addIcon('clear', mdiCloseCircle);
addIcon('custom', mdiRobot);
addIcon('flags', mdiFlag);
addIcon('food', mdiFood);
addIcon('notFound', mdiMagnifyClose);
addIcon('objects', mdiLightbulb);
addIcon('people', mdiAccountMultiple);
addIcon('recents', mdiHistory);
addIcon('search', mdiMagnify);
addIcon('smile', mdiEmoticon);
addIcon('symbols', mdiMusicBox);
addIcon('travel', mdiTrainCar);
