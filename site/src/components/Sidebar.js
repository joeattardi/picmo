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
          <Link to="/docs">Home</Link>
        </li>
        <li>
          <Link to="/docs/styles">Styles</Link>
        </li>
      </ul>
    </nav>
  );
}
