import { IconType } from 'react-icons';
import { BsClockHistory, BsEmojiSmile, BsPerson, BsTree, BsCupStraw, BsBuilding, BsController, BsLightbulb, BsSuitSpade, BsFlag, BsStar } from 'react-icons/bs';
import { CategoryKey } from './data';

export const categoryIcons: Record<CategoryKey, IconType> = {
  'recents': BsClockHistory,
  'smileys-emotion': BsEmojiSmile,
  'people-body': BsPerson,
  'animals-nature': BsTree,
  'food-drink': BsCupStraw,
  'travel-places': BsBuilding,
  'activities': BsController,
  'objects': BsLightbulb,
  'symbols': BsSuitSpade,
  'flags': BsFlag,
  'custom': BsStar
};
