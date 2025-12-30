import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getWorkBySlug, getAllSlugs } from '@/lib/microcms';
import styles from './page.module.css';

// 静的生成用のパスを生成
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// メタデータを生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  
  if (!work) {
    return {
      title: 'Work Not Found',
    };
  }

  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/#works" className={styles.backLink}>
          ← Works一覧に戻る
        </Link>
        <h1 className={styles.title}>{work.title}</h1>
      </div>

      <div className={styles.topSection}>
        <div className={styles.imageSection}>
          <Image
            src={typeof work.image === 'string' ? work.image : work.image.url}
            alt={work.title}
            width={800}
            height={600}
            className={styles.mainImage}
            priority
          />
        </div>

        <div className={styles.overviewSection}>
          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>概要</h2>
            <p>{work.description}</p>
          </div>

          {work.technologies && Array.isArray(work.technologies) && work.technologies.length > 0 && (
            <div className={styles.technologiesSection}>
              <h2 className={styles.sectionTitle}>使用技術</h2>
              <div className={styles.technologiesList}>
                {work.technologies.map((tech, index) => {
                  // technologiesが文字列の配列か、オブジェクトの配列かを判定
                  const techName = typeof tech === 'string' 
                    ? tech 
                    : (tech as any)?.name || (tech as any)?.label || String(tech);
                  return (
                    <span key={index} className={styles.techTag}>
                      {techName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.metaSection}>
            {work.period && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>開発期間:</span>
                <span className={styles.metaValue}>{work.period}</span>
              </div>
            )}

            {work.url && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>URL:</span>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                >
                  {work.url}
                </a>
              </div>
            )}

            {work.github && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>GitHub:</span>
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                >
                  {work.github}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {work.content && (
        <div className={styles.detailSection}>
          <h2 className={styles.sectionTitle}>詳細</h2>
          <div
            className={`prose ${styles.contentText}`}
            dangerouslySetInnerHTML={{ __html: work.content }}
          />
        </div>
      )}
    </div>
  );
}

