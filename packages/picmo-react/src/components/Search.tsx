import { useContext } from 'react';

import { PicMoContext } from './PicMoProvider';
import i18n from '../i18n';

export default function Search() {
  return (
    <input type="text" placeholder={i18n.search.placeholder}/>
  );
}
