"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./BlogSection.module.css";
import type { Blog, BlogCategory } from "@/lib/microcms";

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

  const filtered = useMemo(() => {
    if (filter === "ALL") return blogs;
    return blogs.filter((b) => b.category === filter);
  }, [blogs, filter]);

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
        {filtered.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.slug}`} className={styles.item}>
              <span className={styles.itemDate}>{formatDate(blog.publishedAt)}</span>
              <span className={styles.itemCategory}>[{blog.category}]</span>
              <span className={styles.itemTitle}>{blog.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
