import themes from '../themes.module.css';
import { CategoryKey, CustomEmoji } from '../data/types';

export type Theme = keyof typeof themes;

export type PickerOptions = {
  theme: Theme;
  categories?: CategoryKey[];
  custom?: CustomEmoji[];
  showCategoryTabs: boolean;
  showPreview: boolean;
  showRecents: boolean;
  showSearch: boolean;
  showVariants: boolean;
}
