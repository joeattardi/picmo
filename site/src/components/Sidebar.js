import React from 'react';

import { Link } from 'gatsby';

import logo from '../images/header.png';

import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <ul>
        <li>
          <Link activeClassName={styles.active} to="/docs">
            Home
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/styles">
            Styles
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/custom">
            Custom Emojis
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/themes">
            Themes
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/recents">
            Recent Emojis
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/position">
            Positioning
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/customize">
            Customization
          </Link>
        </li>
      </ul>
    </nav>
  );
}
