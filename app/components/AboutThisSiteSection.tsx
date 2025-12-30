"use client";

import React from 'react';
import styles from './AboutThisSiteSection.module.css';

const AboutThisSiteSection: React.FC = () => {
  return (
    <section className={styles.aboutMeContainer}>
      <h2 className={styles.aboutMeTitle}>このサイトについて</h2>
      <div className={styles.aboutMeContent}>
      <p>
          こんにちは！わさび丸のポートフォリオサイトへようこそ。
          ここでは、私がこれまでに取り組んできたプロジェクトやスキルについて紹介しています。
          新しい技術を学ぶこと、そしてそれを活用して何かを創造することに情熱を注いでいます。
        </p>
        <p>
          このサイトはNext.jsとReactで構築されており、
          インタラクティブな要素を取り入れることで、訪問者の方々に楽しんでいただけるよう工夫しました。
          ごゆっくりとご覧ください。
        </p>
      </div>
    </section>
  );
};

export default AboutThisSiteSection;
