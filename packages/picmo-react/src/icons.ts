import { IconType } from 'react-icons';
import { BsClockHistory, BsEmojiSmile, BsPerson, BsTree, BsCupStraw, BsBuilding, BsController, BsLightbulb, BsSuitSpade, BsFlag, BsStar } from 'react-icons/bs';

import { ImSmile2, ImUser, ImLeaf } from 'react-icons/im';

import { FaHistory, FaSmile, FaUserAstronaut, FaLeaf, FaCoffee, FaCarAlt, FaGamepad, FaLightbulb, FaIcons, FaFlag, FaStar } from 'react-icons/fa';

import { GiCoffeeCup } from 'react-icons/gi';

import { CategoryKey } from './data';

export const categoryIcons: Record<CategoryKey, IconType> = {
  'recents': FaHistory,
  'smileys-emotion': FaSmile,
  'people-body': FaUserAstronaut,
  'animals-nature': FaLeaf,
  'food-drink': FaCoffee,
  'travel-places': FaCarAlt,
  'activities': FaGamepad,
  'objects': FaLightbulb,
  'symbols': FaIcons,
  'flags': FaFlag,
  'custom': FaStar
};
