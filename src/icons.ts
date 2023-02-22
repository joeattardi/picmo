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
  type IconDefinition,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

export const categoryIcons: Record<CategoryKey, IconDefinition> = {
  // Categories from the emoji dataset
  'smileys-emotion': faSmile,
  'people-body': faUserAstronaut,
  'animals-nature': faLeaf,
  'food-drink': faCoffee,
  'travel-places': faCarAlt,
  activities: faGamepad,
  objects: faLightbulb,
  symbols: faIcons,
  flags: faFlag,

  // Additional categories for the picker
  recents: faHistory,
  custom: faStar,
  'search-results': faMagnifyingGlass
};
