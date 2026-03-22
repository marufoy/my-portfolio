import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/microcms";
import {
  injectHeadingIdsAndBuildToc,
  type TocItem,
} from "@/lib/blog-toc";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };
  return { title: blog.title, description: `${blog.category} - ${blog.title}` };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  let contentHtml = "";
  let toc: TocItem[] = [];
  if (blog.content) {
    const parsed = injectHeadingIdsAndBuildToc(blog.content, {
      idPrefix: "blog-heading",
    });
    contentHtml = parsed.html;
    toc = parsed.toc;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/#blog" className={styles.backLink}>
          ← Blog一覧に戻る
        </Link>
        <p className={styles.meta}>
          {formatDate(blog.publishedAt)} &nbsp; [ {blog.category} ]
        </p>
        <h1 className={styles.title}>{blog.title}</h1>
      </div>

      {blog.thumbnail && (
        <div className={styles.thumbHero}>
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={800}
            height={450}
            className={styles.thumbHeroImg}
            priority
            sizes="(max-width: 900px) 100vw, 800px"
          />
        </div>
      )}

      {blog.content && (
        <div className={styles.detailSection}>
          {toc.length > 0 && (
            <nav className={styles.toc} aria-label="目次">
              <h2 className={styles.tocTitle}>目次</h2>
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
          <div
            className={`prose ${styles.contentText}`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      )}
    </div>
  );
}
