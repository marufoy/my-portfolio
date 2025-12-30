"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ColumnCard.module.css';
import { Column } from '@/lib/microcms';

interface ColumnCardProps {
  column: Column;
}

const ColumnCard: React.FC<ColumnCardProps> = ({ column }) => {
  return (
    <Link href={`/columns/${column.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={typeof column.image === 'string' ? column.image : column.image.url}
          alt={column.title}
          width={300}
          height={200}
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{column.title}</h3>
      {column.subtitle && (
        <p className={styles.subtitle}>{column.subtitle}</p>
      )}
    </Link>
  );
};

export default ColumnCard;

