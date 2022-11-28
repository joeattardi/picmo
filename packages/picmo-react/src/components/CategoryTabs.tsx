import { useContext } from 'react';

import { PicMoContext } from './PicMoProvider';
import { categoryIcons } from '../icons';

export default function CategoryTabs() {
  const { dataState, categories, options } = useContext(PicMoContext);
  const { dataStore, status } = dataState;

  if (status === 'READY') {
    return (
      <ul>
        {categories.map(category => {
          const Icon = categoryIcons[category.key];
          return <li key={category.key}><Icon /></li>;
        })}
      </ul>
    )
  }

  return null;
}
