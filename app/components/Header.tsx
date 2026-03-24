"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image 
            src="/images/header-logo.png" 
            alt="HeaderLogo" 
            width={100} 
            height={100} 
            className={styles.logoImage} 
          />
        </div>
        <nav className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                <span className={styles.prompt}>$</span> HOME
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#about" className={styles.navLink}>
                <span className={styles.prompt}>$</span> ABOUT
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#skills" className={styles.navLink}>
                <span className={styles.prompt}>$</span> SKILLS
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#works" className={styles.navLink}>
                <span className={styles.prompt}>$</span> WORKS
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#columns" className={styles.navLink}>
                <span className={styles.prompt}>$</span> COLUMN
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#contact" className={styles.navLink}>
                <span className={styles.prompt}>$</span> CONTACT
              </Link>
            </li>
          </ul>
        </nav>
        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.menuButtonLine}></span>
          <span className={styles.menuButtonLine}></span>
          <span className={styles.menuButtonLine}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;