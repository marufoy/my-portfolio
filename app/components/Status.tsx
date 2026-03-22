"use client";

import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './Status.module.css';
import Image from 'next/image';

const Status = ({ currentLv = 1, isMobile = false }) => {
  const [typingStep, setTypingStep] = useState(0);
  const [allInitialStatsTyped, setAllInitialStatsTyped] = useState(false); // 初期ステータスが全てタイプされたか

  const status = [
    { label: 'HANDLE NAME', value: 'Mt.Maru   ' },
    { label: 'NAME', value: 'Ryo Maruyama' },
    { label: 'ORIGIN', value: 'NAGANO' },
    { label: 'LOCATION', value: 'Tokyo, JPN' },
    { label: 'CONDITION', value: 'Ready' },
    { label: 'SKILLS', value: 'HTML/CSS/JavaScript, Java, Python ,React, Next.js, TypeScript' },
  ];

  // 初期ステータスのアニメーション完了を監視
  useEffect(() => {
    if (typingStep === status.length && !allInitialStatsTyped) {
      // 次のレンダリングサイクルで更新
      const timer = setTimeout(() => {
        setAllInitialStatsTyped(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [typingStep, status.length, allInitialStatsTyped]);

  if (isMobile) {
    return (
      <div className={styles.statusContainer}>
        <div className={styles.mobileCharacterImage}>
          <Image
            src="/images/standingman_toka.png"
            alt="Character"
            width={250}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.statusContentMobile}>
          <h2 className={styles.title}>STATUS</h2>
          {status.map((stat, index) => {
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
                    key={stat.label} // LV以外はラベルでキーを設定
                    sequence={[
                      stat.value,
                      1000,
                      () => {
                        if (index < status.length - 1) {
                          setTypingStep(s => s + 1);
                        } else {
                          // 最後の初期ステータスがタイプされたら
                          setAllInitialStatsTyped(true);
                        }
                      },
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={0}
                  />
                )}
              </div>
            );
          })}

          {/* LVの項目は、初期ステータスが全てタイプされた後に表示 */}
          {allInitialStatsTyped && (
            <div className={styles.statLine} key="LV">
              <span className={styles.label}>LV</span>
              <span>: </span>
              <TypeAnimation
                key={"LV" + currentLv} // currentLv が変更されたら再マウント
                sequence={[
                  currentLv.toString(),
                  1000, // 表示後の待機時間
                ]}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statusContainer}>
      <h2 className={styles.title}>STATUS</h2>
      {status.map((stat, index) => {
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
                key={stat.label} // LV以外はラベルでキーを設定
                sequence={[
                  stat.value,
                  1000,
                  () => {
                    if (index < status.length - 1) {
                      setTypingStep(s => s + 1);
                    } else {
                      // 最後の初期ステータスがタイプされたら
                      setAllInitialStatsTyped(true);
                    }
                  },
                ]}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            )}
          </div>
        );
      })}

      {/* LVの項目は、初期ステータスが全てタイプされた後に表示 */}
      {allInitialStatsTyped && (
        <div className={styles.statLine} key="LV">
          <span className={styles.label}>LV</span>
          <span>: </span>
          <TypeAnimation
            key={"LV" + currentLv} // currentLv が変更されたら再マウント
            sequence={[
              currentLv.toString(),
              1000, // 表示後の待機時間
            ]}
            wrapper="span"
            cursor={true}
            repeat={0}
          />
        </div>
      )}
    </div>
  );
};

export default Status;
