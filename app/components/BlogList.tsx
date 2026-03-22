"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogSection.module.css";
import type { Blog, BlogCategory } from "@/lib/microcms";

const PER_PAGE = 4;
type Filter = "ALL" | BlogCategory;

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (filter === "ALL") return blogs;
    return blogs.filter((b) => b.category === filter);
  }, [blogs, filter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const showPagination = filtered.length >= 4;
  const paginated = useMemo(() => {
    if (!showPagination) return filtered;
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page, showPagination]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <>
      <div className={styles.tabs}>
        {(["ALL", "TECH", "LIFE"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={filter === tab ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => setFilter(tab)}
          >
            [ {tab} ]
          </button>
        ))}
      </div>
      <ul className={styles.list}>
        {paginated.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.slug}`} className={styles.item}>
              <div className={styles.itemThumbWrap}>
                {blog.thumbnail ? (
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className={styles.itemThumb}
                    sizes="(max-width: 480px) 80px, (max-width: 768px) 96px, 120px"
                  />
                ) : (
                  <div className={styles.itemThumbPlaceholder} aria-hidden />
                )}
              </div>
              <div className={styles.itemBody}>
                <div className={styles.itemMeta}>
                  <span className={styles.itemDate}>{formatDate(blog.publishedAt)}</span>
                  <span className={styles.itemCategory}>[{blog.category}]</span>
                </div>
                <span className={styles.itemTitle}>{blog.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {showPagination && totalPages > 1 && (
        <nav className={styles.pagination} aria-label="ページネーション">
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            前へ
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={page === n ? `${styles.pageNum} ${styles.pageNumActive}` : styles.pageNum}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            次へ
          </button>
        </nav>
      )}
    </>
  );
};

export default BlogList;
