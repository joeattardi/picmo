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

import classes from './styles';
import { compileTemplate } from './templates';

const iconTemplate = compileTemplate(`
  <svg class="<%- iconClass %>" width="24" height="24" viewBox="0 0 24 24">
    <path d="<%- icon %>" />
  </svg>
`);

function createIcon(icon) {
  return () => {
    return iconTemplate({
      icon,
      iconClass: classes.icon
    });
  };
}

export default {
  activities: createIcon(mdiBasketball),
  animals: createIcon(mdiCat),
  clear: createIcon(mdiCloseCircle),
  custom: createIcon(mdiRobot),
  flags: createIcon(mdiFlag),
  food: createIcon(mdiFood),
  notFound: createIcon(mdiMagnifyClose),
  objects: createIcon(mdiLightbulb),
  people: createIcon(mdiAccountMultiple),
  recents: createIcon(mdiHistory),
  search: createIcon(mdiMagnify),
  smile: createIcon(mdiEmoticon),
  symbols: createIcon(mdiMusicBox),
  travel: createIcon(mdiTrainCar)
};
