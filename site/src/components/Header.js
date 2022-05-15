import React from 'react';

import { Link } from 'gatsby';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OutboundLink } from 'gatsby-plugin-gtag';

import logo from '../images/header.png';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.alert}>
        <h2>
          🚨 Emoji Button is now{' '}
          <a href="https://npmjs.com/package/picmo">PicMo</a>!
        </h2>
        <p>An all new design, smaller bundle size, and more!</p>
        <p>
          This website and documentation will remain, but no further updates are
          planned for Emoji Button 4.x. Upgrade today! Check it out at{' '}
          <a href="https://picmojs.com">https://PicmoJS.com</a>.
        </p>
      </div>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <h2>Vanilla JavaScript Emoji Picker</h2>
      <div className={styles.badges}>
        <OutboundLink href="https://github.com/joeattardi/emoji-button">
          <img src="https://img.shields.io/github/stars/joeattardi/emoji-button?style=for-the-badge" />
        </OutboundLink>
        <OutboundLink href="https://www.npmjs.com/package/@joeattardi/emoji-button">
          <img src="https://img.shields.io/npm/v/@joeattardi/emoji-button?style=for-the-badge" />
        </OutboundLink>
      </div>
      <div className={styles.buttons}>
        <OutboundLink href="https://github.com/joeattardi/emoji-button">
          <FontAwesomeIcon icon={faGithub} /> GitHub Repository
        </OutboundLink>
        <Link to="/docs">
          <FontAwesomeIcon icon={faBook} /> Documentation
        </Link>
      </div>
    </header>
  );
}
