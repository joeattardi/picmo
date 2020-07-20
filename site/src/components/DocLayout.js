import React, { useEffect } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-bash.min';
import { Helmet } from 'react-helmet';

import Sidebar from './Sidebar';

import styles from './DocLayout.module.css';

export default function DocLayout({ children }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={styles.layout}>
      <Helmet>
        <title>Emoji Button</title>
      </Helmet>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
