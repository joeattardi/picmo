import React from 'react';

import Header from './Header';

import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className={styles.install}></div>
      {children}
    </div>
  );
}
