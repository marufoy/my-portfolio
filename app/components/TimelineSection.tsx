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
        "初めて祖母のPCを触る。当時のOSはWindows95マシンだった。起動するまでに10分くらいかかったのをまだ覚えている。5歳だった私はキーボードの配列などがわからなかったが、深いキーボードを打ち込む感触は楽しい体験であった。Windows標準等搭載のペイントアプリでお絵描きをしていた。なぜか今でもPCの背景を深い緑にすると落ちつくのである。",
      image: "/images/character-nomal.png",
    },
    {
      year: "2010",
      title: "ゲーム機を買い与えられる",
      description:
        "DSやPSPを買い与えられる。当時はポケモンやカービィ、モンスターハンターなど様々なゲームを遊び尽くした。次第にゲーム機の分解をして兄のPSPのボタンを入れ替えてみたりした。本体は赤だが、ボタンを黒にするというオシャレができた。これが初めての実装だったと言える。次第に音楽を入れたり画像を入れたり、PCと繋げての作業をするようになった。ここで初めて拡張子の存在を知るのであった！ここで、私は機械に興味を持ち始めた。",
      image: "/images/game.png",
    },
    {
      year: "2017",
      title: "サイト作りに挑戦",
      description:
        "インターネットで稼いでみたくなった高校生。アフィリエイトブログという存在を知る。WordPressを使ってサイトを使ってみるも、全く稼げなかった。自分の好みのデザインにするにはHTMLとCSSを使うことを知った。ここで初めてそれらを学ぶのであった！しかし、全く稼げなかったので挫折。HTMLとデザインの教本は埃をかぶることとなる。",
      image: "/images/note-pc.png",
    },
    {
      year: "2022",
      title: "大学で再び",
      description:
        "経営学部だったが、プログラミングの授業で再びHTML,CSSを学ぶ。過去の経験が活きて、HTML,CSSを使ってサイトを作成することができた。ここで、私はプログラミングに興味を持ち始めた。コロナの影響で運動不足だったのでボクシングを始めることにしたのも同時期である。",
      image: "/images/desk.png",
    },
    {
      year: "2023",
      title: "Web制作会社に新卒で入社",
      description:
        "大学卒業後、ベンツチャーWeb制作会社に入社することに決定。趣味のボクシングとWeb制作を両立して生活した。家賃があまりに高かったのは人生最大のミス。給料の半分以上を家賃に持っていかれる日々を過ごす。カツカツだったが同僚にも恵まれ最高に楽しい1年目を過ごす。",
      image: "/images/background-1.png",
    },
    {
      year: "2024",
      title: "バックエンドに転向する",
      description:
        "バックエンドを学ぶために転職を決意。JavaやPythonの資格をとり、バックエンドエンジニアを目指す。よりプログラマーらしくコードを書きたいと思ったのである。 ちなみに家賃が高い区域から避難もした。",
      image: "/images/python-dot.png",
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
