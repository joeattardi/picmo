import React from 'react';

import { Link } from 'gatsby';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <a href="https://github.com/joeattardi/emoji-button">
          <img src="https://img.shields.io/github/stars/joeattardi/emoji-button?style=social" />
        </a>
        <a href="https://www.npmjs.com/package/@joeattardi/emoji-button">
          <img src="https://img.shields.io/npm/v/@joeattardi/emoji-button" />
        </a>
      </div>
      <div className={styles.buttons}>
        <a href="https://github.com/joeattardi/emoji-button">
          <FontAwesomeIcon icon={faGithub} /> GitHub Repository
        </a>
        <Link to="/docs">
          <FontAwesomeIcon icon={faBook} /> Documentation
        </Link>
      </div>
    </header>
  );
}
