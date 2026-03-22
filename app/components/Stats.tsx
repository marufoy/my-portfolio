"use client";

import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './Stats.module.css';

interface StatsProps {
  currentLv: number;
}

const Stats: React.FC<StatsProps> = ({ currentLv }) => {
  const [typingStep, setTypingStep] = useState(0);

  const stats = [
    { label: 'HANDLE', value: 'Mt.Maru   ' },
    { label: 'NAME', value: 'Ryo Maruyama' },
    { label: 'ORIGIN', value: 'NAGANO' },
    { label: 'LOCATION', value: 'Tokyo, JPN' },
    { label: 'SKILLS', value: 'HTML/CSS/JavaScript, Java, Python ,React, Next.js, TypeScript, Security' },
  ];

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.title}>STATS</h2>
      {stats.map((stat, index) => {
        if (index > typingStep) {
          return null; // Don't render future lines yet
        }

        return (
          <div className={styles.statLine} key={stat.label}>
            <span className={styles.label}>{stat.label}</span>
            <span>: </span>
            {index < typingStep ? (
              // Render completed lines as static text
              <span>{stat.value}</span>
            ) : (
              // Render the current line with typing animation
              <TypeAnimation
                sequence={[
                  stat.value,
                  1000,
                  () => {
                    if (index < stats.length - 1) {
                      setTypingStep(s => s + 1);
                    }
                  },
                ]}
                wrapper="span"
                cursor={true}
                repeat={index === stats.length - 1 ? Infinity : 0}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
