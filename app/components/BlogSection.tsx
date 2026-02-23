import React from "react";
import { getAllBlogs } from "@/lib/microcms";
import BlogList from "./BlogList";
import styles from "./BlogSection.module.css";

const BlogSection: React.FC = async () => {
  const blogs = await getAllBlogs();

  return (
    <section className={styles.blogSection}>
      <h2 className={styles.title}>Blog</h2>
      {blogs.length === 0 ? (
        <p style={{ color: "#888", textAlign: "center" }}>
          ブログがまだ登録されていません
        </p>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </section>
  );
};

export default BlogSection;
