import type { CategoryKey } from './data';

import {
  faHistory,
  faSmile,
  faUserAstronaut,
  faLeaf,
  faCoffee,
  faCarAlt,
  faGamepad,
  faLightbulb,
  faIcons,
  faFlag,
  faStar,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';

export const categoryIcons: Record<CategoryKey, IconDefinition> = {
  recents: faHistory,
  'smileys-emotion': faSmile,
  'people-body': faUserAstronaut,
  'animals-nature': faLeaf,
  'food-drink': faCoffee,
  'travel-places': faCarAlt,
  activities: faGamepad,
  objects: faLightbulb,
  symbols: faIcons,
  flags: faFlag,
  custom: faStar
};
