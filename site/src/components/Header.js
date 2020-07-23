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
