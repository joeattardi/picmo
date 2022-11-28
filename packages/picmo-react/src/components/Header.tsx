import { useContext } from 'react';

import { PicMoContext } from './PicMoProvider';
import CategoryTabs from './CategoryTabs';
import Search from './Search';
import classes from './Header.module.css';

export default function Header() {
  const { options } = useContext(PicMoContext);
  const { showSearch, showCategoryTabs } = options;

  return (
    <header className={classes.header}>
      <Search />
      <CategoryTabs />
    </header>
  );
}
