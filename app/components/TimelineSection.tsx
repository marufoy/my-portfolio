"use client";

import React from "react";
import styles from "./TimelineSection.module.css";
import Image from "next/image";

const TimelineSection: React.FC = () => {
  const timelineData = [
    {
      year: "2005",
      title: "初めてPCを触る",
      description:
        "初めて祖母のPCを触る。当時のOSはWindows95マシンだった。起動するまでに10分くらいかかったのをまだ覚えている。当時はキーボードの配列などがわからなかったのでWindows標準等搭載のペイントアプリでお絵描きをしていた。なぜか今でもPCの背景を深い緑にすると落ちつくのである。",
      image: "/images/character-nomal.png",
      isLeft: true,
      level: "Lv.1 初心者",
    },
    {
      year: "2010",
      title: "ゲーム機を買い与えられる",
      description:
        "HTMLとCSSを学び、初めてのWebサイトを制作。見た目が思い通りにならず何度も挫折しそうになったが、完成した時の達成感は忘れられない。",
      image: "/images/html-dot.png",
      isLeft: false,
      level: "Lv.5 フロントエンド見習い",
    },
    {
      year: "2022",
      title: "JavaScriptの魔法を習得",
      description:
        "JavaScriptを学び、動的なWebサイトを作れるようになる。DOM操作やイベント処理を覚え、Webサイトに命を吹き込む技術を身につける。",
      image: "/images/js-logo-dot.png",
      isLeft: true,
      level: "Lv.10 フロントエンド戦士",
    },
    {
      year: "2023",
      title: "Web制作会社に就職！",
      description:
        "2023年にWeb会社に新卒で入社。ここでWebの基礎などを知る。初めての会社で働くということを経験して社会人が何かを知ることができた。",
      image: "/images/background-1.png",
      isLeft: false,
      level: "Lv.15 社会人デビュー",
    },
    {
      year: "2024",
      title: "ReactとTypeScriptをマスター",
      description:
        "モダンなフロントエンド開発を学ぶ。Reactのコンポーネント思考とTypeScriptの型安全性に感動。より効率的で保守性の高いコードが書けるようになる。",
      image: "/images/react-dot.png",
      isLeft: true,
      level: "Lv.20 モダンフロントエンダー",
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <h2 className={styles.title}>MY TIMELINE</h2>

      <div className={styles.consoleHeader}>
        <div className={styles.consoleTitle}>
          <span className={styles.prompt}>$</span>
          <span className={styles.command}>cat my_timeline.log</span>
        </div>
        <div className={styles.consoleControls}>
          <div className={styles.controlBtn}></div>
          <div className={styles.controlBtn}></div>
          <div className={styles.controlBtn}></div>
        </div>
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineList}>
          {timelineData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={styles.yearBadge}>
                  <span className={styles.prompt}>[</span>
                  <span className={styles.timestamp}>{item.year}</span>
                  <span className={styles.prompt}>]</span>
                </div>
              </div>

              <div className={styles.timelineCenter}>
                <div className={styles.timelineDot}>
                  <div className={styles.dotInner}></div>
                </div>
                {index < timelineData.length - 1 && (
                  <div className={styles.timelineLine}></div>
                )}
              </div>

              <div className={styles.timelineRight}>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>
                    <span className={styles.prompt}>&gt;</span> {item.title}
                  </h3>
                  <p className={styles.timelineDescription}>
                    {item.description}
                  </p>
                </div>
                <div className={styles.timelineImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={90}
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.consoleFooter}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cursor}>_</span>
      </div>
    </section>
  );
};

export default TimelineSection;
