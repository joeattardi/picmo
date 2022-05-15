import { toElement } from '../util';
import { CategoryKey } from '../types';
import classes from './icons.scss';

import clock from './clock-solid.svg';
import flag from './flag-solid.svg';
import frown from './face-frown-open-solid.svg';
import gamepad from './gamepad-solid.svg';
import lightbulb from './lightbulb-solid.svg';
import mug from './mug-saucer-solid.svg';
import plane from './plane-solid.svg';
import robot from './robot-solid.svg';
import sad from './face-sad-tear-solid.svg';
import search from './magnifying-glass-solid.svg';
import smiley from './face-grin-solid.svg';
import symbols from './icons-solid.svg';
import tree from './tree-solid.svg';
import users from './user-group-solid.svg';
import warning from './triangle-exclamation-solid.svg';
import xmark from './xmark-solid.svg';

function createIcon(iconName: string, svg: string): SVGElement {
  const el = toElement<SVGSVGElement>(svg);
  el.dataset.icon = iconName;
  el.classList.add(classes.icon);
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
    icon.classList.add(classes[`icon-${size}`]);
  }

  return icon;
}
