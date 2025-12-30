"use client";

import React from 'react';
import styles from './HiddenMessage.module.css';

interface HiddenMessageProps {
  message: string;
  onClose: () => void;
}

const HiddenMessage: React.FC<HiddenMessageProps> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.messageBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default HiddenMessage;

