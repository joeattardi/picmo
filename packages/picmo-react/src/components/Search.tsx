import i18n from '../i18n';

import classes from './Search.module.css';

export default function Search() {
  return (
    <div className={classes.searchContainer}>
      <input className={classes.searchField} type="text" placeholder={i18n.search.placeholder}/>
    </div>
  );
}
