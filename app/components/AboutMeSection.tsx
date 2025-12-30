"use client";

import React from 'react';
import styles from './AboutMeSection.module.css';
import Image from 'next/image';

const AboutMeSection: React.FC = () => {
  return (
    <section className={styles.aboutMeSection}>
      <h2 className={styles.title}>WHO AM I ?</h2>
      
      <div className={styles.section}>
        <div className={styles.contentWrapper}>
          <Image
            src="/images/standingman1x1.png"
            alt="Self-portrait"
            width={300}
            height={300}
            className={styles.image}
          />
          <div className={styles.textContent}>
            <h4 className={styles.subTitle}>エンジニアとしての僕</h4>
            <p className={styles.description}>
            長野県出身のエンジニア<br />
              大学卒業後Web制作会社に就職。現在はバックエンドに移行し、JavaやPythonを使って業務している。<br />
              思えば小さい頃からPSPを分解したり、改造したりするのが好きでメカメカしいものが好きだった。
              初めてPCを触ったのは、4歳か5歳。会社においてあるWindows95のマシンだった。

              そんなこともあり、プログラミングにも興味を持ち始め、この世界に飛び込んだのだった。
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h4 className={styles.subTitle}>プロボクサーを目指して</h4>
            <p className={styles.description}>
              趣味はボクシングで、プロボクサーを目指して毎日練習している。<br/>
              運動不足から通い始めたものの、ボクシングの魅力に取り憑かれてプロを目指す。<br/>
              ボクシングは他人と、自分との両方と向き合うスポーツであり、自分の身体の限界や心の弱さを見つめ直すことになる。<br/>
              その結果、他人と比べたり、負けたりして落ち込むこともある。
              しかし負けじとムキムキのプログラマーを目指して日々鍛えている。
              
            </p>
          </div>
          <Image
            src="/images/boxer.png"
            alt="Boxer character"
            width={300}
            height={300}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
