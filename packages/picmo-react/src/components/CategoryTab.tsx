import { categoryIcons } from '../icons';
import { Category } from '../data';

import classes from './CategoryTab.module.css';

type CategoryTabProps = {
  category: Category;
}

export default function CategoryTab({ category }: CategoryTabProps) {
  const Icon = categoryIcons[category.key];

  return (
    <li className={classes.categoryTab}>
      <button type="button">
        <Icon />
      </button>
    </li>
  );
}

