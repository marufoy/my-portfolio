import React from 'react';
import styles from './WorksSection.module.css';
import WorkCard from './WorkCard';

const sampleWorks = [
  {
    id: '1',
    title: 'コンタクトフォーム修正',
    description: 'これはプロジェクトアルファの説明です。技術スタックや役割などを記述します。',
    image: '/images/ariel.png',
    slug: 'ariel-form',
  },
  {
    id: '2',
    title: 'Project Beta',
    description: 'これはプロジェクトベータの説明です。ユーザー体験の改善に焦点を当てました。',
    image: '/images/background-1.png',
    slug: 'project-beta',
  },
  {
    id: '3',
    title: 'Project Gamma',
    description: 'これはプロジェクトガンマの説明です。新しい技術を試しました。',
    image: '/images/character-nomal.png',
    slug: 'project-gamma',
  },
];

const WorksSection: React.FC = () => {
  return (
    <section className={styles.worksSection}>
      <h2 className={styles.title}>Works</h2>
      <div className={styles.worksGrid}>
        {sampleWorks.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;