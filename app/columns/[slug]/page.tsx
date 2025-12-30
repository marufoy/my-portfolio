import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getColumnBySlug, getAllColumnSlugs } from '@/lib/microcms';
import styles from './page.module.css';

// 静的生成用のパスを生成
export async function generateStaticParams() {
  const slugs = await getAllColumnSlugs();
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
  const column = await getColumnBySlug(slug);
  
  if (!column) {
    return {
      title: 'Column Not Found',
    };
  }

  return {
    title: column.title,
    description: column.description,
  };
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const column = await getColumnBySlug(slug);

  if (!column) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/#columns" className={styles.backLink}>
          ← Column一覧に戻る
        </Link>
        <h1 className={styles.title}>{column.title}</h1>
      </div>

      <div className={styles.topSection}>
        <div className={styles.imageSection}>
          <Image
            src={typeof column.image === 'string' ? column.image : column.image.url}
            alt={column.title}
            width={800}
            height={600}
            className={styles.mainImage}
            priority
          />
        </div>

        <div className={styles.overviewSection}>
          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>概要</h2>
            <p>{column.description}</p>
          </div>
        </div>
      </div>

      {column.content && (
        <div className={styles.detailSection}>
          <h2 className={styles.sectionTitle}>詳細</h2>
          <div
            className={`prose ${styles.contentText}`}
            dangerouslySetInnerHTML={{ __html: column.content }}
          />
        </div>
      )}
    </div>
  );
}

