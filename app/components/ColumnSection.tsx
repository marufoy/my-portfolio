import React from 'react';
import styles from './ColumnSection.module.css';
import ColumnCard from './ColumnCard';
import { getAllColumns } from '@/lib/microcms';

const ColumnSection: React.FC = async () => {
  // MicroCMSからColumnsを取得
  const columns = await getAllColumns();

  // データが取得できない場合は空配列を返す
  if (!columns || columns.length === 0) {
    return (
      <section className={styles.columnSection}>
        <h2 className={styles.title}>Column</h2>
        <p style={{ color: '#ffffff', textAlign: 'center' }}>
          Columnがまだ登録されていません
        </p>
      </section>
    );
  }

  return (
    <section className={styles.columnSection}>
      <h2 className={styles.title}>Column</h2>
      <div className={styles.columnGrid}>
        {columns.map((column) => (
          <ColumnCard key={column.id} column={column} />
        ))}
      </div>
    </section>
  );
};

export default ColumnSection;

