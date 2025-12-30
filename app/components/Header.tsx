import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styles from './Header.module.css'; // Assuming styles are in Header.module.css

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <div className={styles.logo}>
          <Image src="/images/WASABI_LOGO.png" alt="WASABI MARU Logo" width={100} height={100} className={styles.logoImage} />
        </div>
        <Link href="/">ホーム</Link>
        <Link href="/about">自己紹介</Link>
        {/* 将来的にポートフォリオページへのリンクなどを追加 */}
      </nav>
    </header>
  );
};

export default Header;