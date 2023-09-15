import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import logo from '@site/static/img/logo-white-with-name.png';
import EmojiGrid from '../components/EmojiGrid';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <>
      <div className={styles.deprecationNotice}>
        <h2>Deprecation Notice</h2>
        <p>
          As of <strong>September 14, 2023</strong>, PicMo is no longer being maintained. I just don't have the time to keep it updated anymore, and its usage seems to be
          declining. You can still install the package but there will be no further updates.
        </p>
        <p>
          If you're looking for an emoji picker, I highly recommend <a href="https://missiveapp.com/open/emoji-mart">Emoji Mart</a>.
        </p>
        <p>
          Thanks for using PicMo/Emoji Button over the years!
        </p>
      </div>
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.heroGrid}>
        <div>
          <h1 className={clsx('hero__title', styles.heroTitle)}>
            <img className={styles.heroLogo} src={logo} />
          </h1>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
          <a href="https://npmjs.com/package/picmo"><img src="https://img.shields.io/npm/v/picmo?color=9cf&label=npm%20package&logo=npm" /></a>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started/overview">
            Get Started
            </Link>
          </div>
        </div>
        <EmojiGrid />
      </div>
    </header>
    </>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
