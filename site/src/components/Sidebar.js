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
      <h2>Documentation</h2>
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
          <Link activeClassName={styles.active} to="/docs/customData">
            Custom Emoji Data
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/icons">
            Custom Icons
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/plugins">
            Plugins
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
          <Link activeClassName={styles.active} to="/docs/variants">
            Variants
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
        <li>
          <Link activeClassName={styles.active} to="/docs/styleCustomization">
            Style Customization
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/i18n">
            I18N Strings
          </Link>
        </li>
      </ul>

      <h2>Reference</h2>
      <ul>
        <li>
          <Link activeClassName={styles.active} to="/docs/api">
            API
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/cssVariables">
            CSS Variables
          </Link>
        </li>
        <li>
          <Link activeClassName={styles.active} to="/docs/events">
            Events
          </Link>
        </li>
      </ul>
    </nav>
  );
}
