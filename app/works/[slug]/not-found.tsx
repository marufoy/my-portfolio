import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>このWorkは見つかりませんでした</p>
      <Link href="/#works" className={styles.link}>
        Works一覧に戻る
      </Link>
    </div>
  );
}

