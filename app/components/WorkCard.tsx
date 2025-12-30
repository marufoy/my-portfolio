"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WorkCard.module.css';
import { Work } from '@/lib/microcms';

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  return (
    <Link href={`/works/${work.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={typeof work.image === 'string' ? work.image : work.image.url}
          alt={work.title}
          width={300}
          height={200}
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{work.title}</h3>
      {work.subtitle && (
        <p className={styles.subtitle}>{work.subtitle}</p>
      )}
    </Link>
  );
};

export default WorkCard;

