import React from 'react';

import styles from './styles.module.css';

type Property = {
  type: string;
  defaultValue?: string;
};

export default function APIProperty({ types, defaultValue }: Property) {
  return (
    <dl className={styles.property}>
      <dt>Type:</dt>
      <dd>
        {types.map((type, index) => 
          <>
            {type.link ? 
              <a key={type.name} href={type.link}><code>{type.name}</code></a> : 
              <code key={type.name}>{type.name}</code>}

            {index < types.length - 1 && <span> | </span>}
          </>)}
      </dd>
      {defaultValue ? <><dt>Default</dt><dd>{defaultValue}</dd></> : null}
    </dl>
  )
}
