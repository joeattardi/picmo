import React from 'react';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.joe}>
        Created with ♥️ by <a href="https://joeattardi.codes">Joe Attardi</a>.
      </div>
      <div>
        <a href="https://github.com/joeattardi/emoji-button">
          GitHub Repository
        </a>
      </div>
      <div>
        &copy; 2019-2020{' '}
        <a href="https://github.com/joeattardi/emoji-button/blob/master/LICENSE">
          MIT License
        </a>
      </div>
    </footer>
  );
}
