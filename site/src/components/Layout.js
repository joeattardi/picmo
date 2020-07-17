import React from 'react';

import Header from './Header';

import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className={styles.install}>
        <h3>Installation</h3>
        <code>npm install @joeattardi/emoji-button</code>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
