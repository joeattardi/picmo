import { useContext } from 'react';

import { PicMoContext } from './PicMoProvider';
import { categoryIcons } from '../icons';

import CategoryTab from './CategoryTab';

import classes from './CategoryTabs.module.css';

export default function CategoryTabs() {
  const { dataState, categories, options } = useContext(PicMoContext);
  const { dataStore, status } = dataState;

  if (status === 'READY') {
    return (
      <ul className={classes.categoryTabs}>
        {categories.map(category => {
          const Icon = categoryIcons[category.key];
          return <CategoryTab key={category.key} category={category} />;
        })}
      </ul>
    )
  }

  return null;
}
