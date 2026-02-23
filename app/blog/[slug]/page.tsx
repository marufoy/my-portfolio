import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/microcms";
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

      {blog.content && (
        <div
          className={`prose ${styles.contentText}`}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}
    </div>
  );
}
