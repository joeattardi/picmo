import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faCat, faCoffee, faFutbol, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faFlag, faFrown, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';

library.add(
  faBuilding,
  faCat,
  faCoffee,
  faFlag,
  faFrown,
  faFutbol,
  faLightbulb,
  faMusic,
  faSearch,
  faSmile
);

export const building = icon({ prefix: 'far', iconName: 'building' }).html;
export const cat = icon({ prefix: 'fas', iconName: 'cat' }).html;
export const coffee = icon({ prefix: 'fas', iconName: 'coffee' }).html;
export const flag = icon({ prefix: 'far', iconName: 'flag' }).html;
export const futbol = icon({ prefix: 'fas', iconName: 'futbol' }).html;
export const frown = icon({ prefix: 'far', iconName: 'frown' }).html;
export const lightbulb = icon({ prefix: 'far', iconName: 'lightbulb' }).html;
export const music = icon({ prefix: 'fas', iconName: 'music' }).html;
export const search = icon({ prefix: 'fas', iconName: 'search' }).html;
export const smile = icon({ prefix: 'far', iconName: 'smile' }).html;