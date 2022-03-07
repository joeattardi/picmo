import { icon as faIcon, library, IconName, IconParams } from '@fortawesome/fontawesome-svg-core';

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
  faTags,
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
  faTags,
  faUser,
  faXmark
);

export function icon(iconName: IconName, params: IconParams): HTMLElement {
  return faIcon(
    {
      prefix: 'fas',
      iconName
    },
    params
  ).node[0] as HTMLElement;
}
