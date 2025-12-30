import React from 'react';
import styles from './WorksSection.module.css';
import WorkCard from './WorkCard';
import { getAllWorks } from '@/lib/microcms';

const WorksSection: React.FC = async () => {
  // MicroCMSからWorksを取得
  const works = await getAllWorks();

  // データが取得できない場合は空配列を返す
  if (!works || works.length === 0) {
    return (
      <section className={styles.worksSection}>
        <h2 className={styles.title}>Works</h2>
        <p style={{ color: '#ffffff', textAlign: 'center' }}>
          Worksがまだ登録されていません
        </p>
      </section>
    );
  }

  return (
    <section className={styles.worksSection}>
      <h2 className={styles.title}>Works</h2>
      <div className={styles.worksGrid}>
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;