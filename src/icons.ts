import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
  faCat,
  faCoffee,
  faFutbol,
  faHistory,
  faIcons,
  faMusic,
  faTimesCircle,
  faSearch,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faFlag, faFrown, faImage, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';

// TODO: Find a lighter weight alternative to fontawesome
library.add(
  faBuilding,
  faCat,
  faCoffee,
  faFlag,
  faFrown,
  faFutbol,
  faHistory,
  faIcons,
  faImage,
  faLightbulb,
  faMusic,
  faSearch,
  faSmile,
  faTimes,
  faTimesCircle,
  faUser
);

export const building = icon({ prefix: 'far', iconName: 'building' }).html[0];
export const cat = icon({ prefix: 'fas', iconName: 'cat' }).html[0];
export const coffee = icon({ prefix: 'fas', iconName: 'coffee' }).html[0];
export const flag = icon({ prefix: 'far', iconName: 'flag' }).html[0];
export const futbol = icon({ prefix: 'fas', iconName: 'futbol' }).html[0];
export const frown = icon({ prefix: 'far', iconName: 'frown' }).html[0];
export const history = icon({ prefix: 'fas', iconName: 'history' }).html[0];
export const icons = icon({ prefix: 'fas', iconName: 'icons' }).html[0];
export const image = icon({ prefix: 'far', iconName: 'image' }).html[0];
export const lightbulb = icon({ prefix: 'far', iconName: 'lightbulb' }).html[0];
export const music = icon({ prefix: 'fas', iconName: 'music' }).html[0];
export const search = icon({ prefix: 'fas', iconName: 'search' }).html[0];
export const smile = icon({ prefix: 'far', iconName: 'smile' }).html[0];
export const times = icon({ prefix: 'fas', iconName: 'times' }).html[0];
export const timesCircle = icon({ prefix: 'fas', iconName: 'times-circle' }).html[0];
export const user = icon({ prefix: 'fas', iconName: 'user' }).html[0];
