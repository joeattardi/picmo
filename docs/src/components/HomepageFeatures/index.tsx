import React from 'react';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faIcons, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, faJs } from '@fortawesome/free-brands-svg-icons';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: IconDefinition;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Just JavaScript',
    icon: faJs,
    description: (
      <>
        Use PicMo to add a rich emoji picker to any JavaScript project,
        regardless of the framework.
      </>
    ),
  },
  {
    title: 'Emojis',
    icon: faIcons,
    description: (
      <>
        Use the platform's native emojis, or cross-platform emojis from <a href="https://twemoji.twitter.com/">Twemoji</a>.
        Even add your own custom emojis and GIFs.
      </>
    ),
  },
  {
    title: 'Searchable',
    icon: faMagnifyingGlass,
    description: (
      <>
       Search for emojis by name or tags.
      </>
    ),
  },
  {
    title: 'Customizable',
    icon: faGear,
    description: (
      <>
        Customize sizing, layout, and UI elements.
      </>
    )
  }
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center margin--md">
        <FontAwesomeIcon className={styles.featureIcon} size="5x" icon={icon} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
