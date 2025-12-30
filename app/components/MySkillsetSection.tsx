
"use client";

import React from 'react';
import styles from './MySkillsetSection.module.css';
import LaboTitle from './LaboTitle'; // 既存のコンポーネントを再利用

const MySkillsetSection: React.FC = () => {
  // 仮のスキルデータ
  const skills = [
    { name: 'TypeScript', level: 90, category: 'language' },
    { name: 'React', level: 85, category: 'framework' },
    { name: 'Next.js', level: 80, category: 'framework' },
    { name: 'Node.js', level: 70, category: 'language' },
    { name: 'Figma', level: 75, category: 'tool' },
  ];

  // 仮のカテゴリ
  const categories = ['All', 'Language', 'Framework', 'Tool'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory.toLowerCase());

  return (
    <section className={styles.skillsetSection}>
      <LaboTitle title="SKILL SET" subtitle="MY ARSENAL" /> {/* タイトルをゲーム風に */}

      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.skillGrid}>
        {filteredSkills.map(skill => (
          <div key={skill.name} className={styles.skillCard}>
            <div className={styles.skillIcon}></div> {/* 仮のアイコン */}
            <h3 className={styles.skillName}>{skill.name}</h3>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${skill.level}%` }}></div>
            </div>
            <span className={styles.skillLevel}>{skill.level}%</span>
            {/* 詳細説明は後で追加 */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySkillsetSection;
