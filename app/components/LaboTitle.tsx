"use client";

import React from 'react';
import styles from './LaboTitle.module.css';

interface LaboTitleProps {
  title: string;
  subtitle: string;
}

const LaboTitle: React.FC<LaboTitleProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.laboTitleContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default LaboTitle;
