import type { CategoryKey } from './data';
import type { IconProps } from 'phosphor-svelte/lib/shared';

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

import {
  Airplane,
  Smiley,
  Users,
  Cat,
  Coffee,
  GameController,
  LightbulbFilament,
  MusicNotes,
  Flag,
  ClockCounterClockwise,
  Star
} from 'phosphor-svelte';

export const categoryIcons: Record<CategoryKey, SvelteComponent<IconProps>> = {
  // Categories from the emoji dataset
  'smileys-emotion': Smiley,
  'people-body': Users,
  'animals-nature': Cat,
  'food-drink': Coffee,
  'travel-places': Airplane,
  activities: GameController,
  objects: LightbulbFilament,
  symbols: MusicNotes,
  flags: Flag,

  // Additional categories for the picker
  recents: ClockCounterClockwise,
  custom: Star,
  'search-results': faMagnifyingGlass
};
