import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Feature.module.css';

export default function Feature({ icon, title, children }) {
  return (
    <div className={styles.feature}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} size="3x" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
