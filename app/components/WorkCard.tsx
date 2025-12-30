"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WorkCard.module.css';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  return (
    <Link href={`/works/${work.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={work.image}
          alt={work.title}
          width={300}
          height={200}
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{work.title}</h3>
      <p className={styles.description}>{work.description}</p>
    </Link>
  );
};

export default WorkCard;

