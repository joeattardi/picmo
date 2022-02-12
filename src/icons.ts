import { config, dom, icon as faIcon, library } from '@fortawesome/fontawesome-svg-core';

import {
  faCar,
  faCat,
  faClockRotateLeft,
  faFaceSmile,
  faFlag,
  faFutbol,
  faIcons,
  faImage,
  faLightbulb,
  faMagnifyingGlass,
  faMugSaucer,
  faSquareXmark,
  faUser,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCar,
  faCat,
  faClockRotateLeft,
  faFaceSmile,
  faFlag,
  faFutbol,
  faIcons,
  faImage,
  faLightbulb,
  faMagnifyingGlass,
  faMugSaucer,
  faSquareXmark,
  faUser,
  faXmark
);

export function icon(iconName, params) {
  return faIcon(
    {
      prefix: 'fas',
      iconName
    },
    params
  ).node[0];
}
