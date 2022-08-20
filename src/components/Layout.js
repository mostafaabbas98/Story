import React from 'react';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__mobile}>
        <img src="/mobile-mockup.png" alt="mobile mochup" />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
