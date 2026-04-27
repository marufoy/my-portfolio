import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getColumnBySlug, getAllColumnSlugs } from '@/lib/microcms';
import {
  injectHeadingIdsAndBuildToc,
  type TocItem,
} from '@/lib/blog-toc';
import { HtmlContentWithImageLightbox } from '@/components/HtmlContentWithImageLightbox';
import styles from './page.module.css';

/** Column 詳細を MicroCMS から定期的に再取得 */
export const revalidate = 60;

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

  let contentHtml = '';
  let toc: TocItem[] = [];
  if (column.content) {
    const parsed = injectHeadingIdsAndBuildToc(column.content, {
      idPrefix: 'column-heading',
    });
    contentHtml = parsed.html;
    toc = parsed.toc;
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
          {toc.length > 0 && (
            <nav className={styles.toc} aria-label="目次">
              <h3 className={styles.tocTitle}>目次</h3>
              <ol className={styles.tocList}>
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.level === 3
                        ? styles.tocItemH3
                        : item.level === 4
                          ? styles.tocItemH4
                          : styles.tocItemH2
                    }
                  >
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <HtmlContentWithImageLightbox
            html={contentHtml}
            className={`prose ${styles.contentText}`}
          />
        </div>
      )}
    </div>
  );
}

