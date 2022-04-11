import React from 'react';

import styles from './styles.module.css';

type Property = {
  type: string;
  defaultValue?: string;
};

export default function APIProperty({ type, defaultValue }: Property) {
  return (
    <dl className={styles.property}>
      <dt>Type</dt>
      <dd>{type}</dd>
      {defaultValue ? <><dt>Default</dt><dd>{defaultValue}</dd></> : null}
    </dl>
  )
}
