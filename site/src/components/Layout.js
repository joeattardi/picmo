import React from 'react';

import { faNpm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';

import Footer from './Footer';
import Header from './Header';

import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div>
      <Helmet>
        <title>Emoji Button</title>
      </Helmet>
      <Header />
      <div className={styles.install}>
        <FontAwesomeIcon icon={faNpm} size="3x" /> <code>npm install @joeattardi/emoji-button</code>
      </div>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
