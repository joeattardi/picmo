import { toElement } from '../util';
import { CategoryKey } from '../types';
// import classes from './icons.module.scss';

import clock from './clock-solid.svg?raw';
import flag from './flag-solid.svg?raw';
import frown from './face-frown-open-solid.svg?raw';
import gamepad from './gamepad-solid.svg?raw';
import lightbulb from './lightbulb-solid.svg?raw';
import mug from './mug-saucer-solid.svg?raw';
import plane from './plane-solid.svg?raw';
import robot from './robot-solid.svg?raw';
import sad from './face-sad-tear-solid.svg?raw';
import search from './magnifying-glass-solid.svg?raw';
import smiley from './face-grin-solid.svg?raw';
import symbols from './icons-solid.svg?raw';
import tree from './tree-solid.svg?raw';
import users from './user-group-solid.svg?raw';
import warning from './triangle-exclamation-solid.svg?raw';
import xmark from './xmark-solid.svg?raw';

function createIcon(iconName: string, svg: string): SVGElement {
  const el = toElement<SVGSVGElement>(svg);
  el.dataset.icon = iconName;
  el.classList.add('icon');
  return el;
}

export type IconSize = 'small' | 'medium' | 'large' | '2x' | '3x' | '4x' | '5x';

const icons = {
  clock, 
  flag,
  frown,
  gamepad, 
  lightbulb, 
  mug, 
  plane, 
  robot, 
  sad,
  search,
  smiley, 
  symbols, 
  tree,
  users, 
  warning, 
  xmark,
};

export { icons };

export const categoryIcons: Record<CategoryKey, string> = {
  'recents': 'clock',
  'smileys-emotion': 'smiley',
  'people-body': 'users',
  'animals-nature': 'tree',
  'food-drink': 'mug',
  'activities': 'gamepad',
  'travel-places': 'plane',
  'objects': 'lightbulb',
  'symbols': 'symbols',
  'flags': 'flag',
  'custom': 'robot'
};

export function icon(name: string, size?: IconSize): Element {
  if (!(name in icons)) {
    console.warn(`Unknown icon: "${name}"`);
    return document.createElement('div');
  }

  const icon = createIcon(name, icons[name]);
  // const icon = icons[name].cloneNode(true);
  if (size) {
    icon.classList.add(`icon-${size}`);
  }

  return icon;
}
