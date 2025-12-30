import React from 'react';
import styles from './WorksSection.module.css';
import WorkCard from './WorkCard';

const sampleWorks = [
  {
    id: '1',
    title: 'コンタクトフォーム修正',
    description: '不具合修正、セキュリティ強化、運用自動化',
    image: '/images/ariel.png',
    slug: 'ariel-form',
  },
  {
    id: '2',
    title: 'YouTube運営代行LP作成',
    description: '短い作成期間の中で、メール機能付きのLPを作成。',
    image: '/images/Youtube-lp.png',
    slug: 'youtube-lp',
  },
  {
    id: '3',
    title: '建設会社HP作成',
    description: '山梨の建設会社のHPを新規作成',
    image: '/images/construction-hp.png',
    slug: 'construction-hp',
  },
  {
    id: '4',
    title: 'Python検索ツール開発',
    description: 'ドキュメント内の曖昧な語句を自動検出するツール',
    image: '/images/python-search-tool.png',
    slug: 'python-search-tool',
  },
  {
    id: '5',
    title: 'Javaテスト自動化ツール開発',
    description: 'Seleniumを使用したWebテスト自動化ツール',
    image: '/images/java-test-tool.png',
    slug: 'java-test-tool',
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