"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

type FooterProps = {
  ownerName: string;
  year: number;
};

const Footer: React.FC<FooterProps> = ({ ownerName, year }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMessageContainer}>
          <Image
            src="/images/bye.png"
            alt="Bye character waving"
            width={60}
            height={60}
            className={styles.byeImage}
          />
          <p className={styles.footerMessage}>ThankYou For Coming</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
