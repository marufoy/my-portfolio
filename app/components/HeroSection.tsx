"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import Stats from "./Stats";
import MessageBoard from "./MessageBoard";
import HiddenMessage from "./HiddenMessage";

const HeroSection = () => {
  const [isPunching, setIsPunching] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [lv, setLv] = useState(1);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [currentHiddenMessage, setCurrentHiddenMessage] = useState(""); // 追加
  const clickCountRef = useRef(0);

  // Lvが3または5になったらメッセージを表示
  useEffect(() => {
    let message = "";
    let shouldShow = false;
    
    if (lv === 3) {
      message = "Lv3達成！趣味はボクシングです！";
      shouldShow = true;
    } else if (lv === 5) {
      message = "Lv5達成！わさびが好き";
      shouldShow = true;
    } else if (lv === 9) {
      message = "Lv9達成！";
      shouldShow = true;
    } else if (lv === 10) {
      message = "体力の限界です・・・";
      shouldShow = true;
    }
    
    if (shouldShow) {
      setTimeout(() => {
        setCurrentHiddenMessage(message);
        setShowHiddenMessage(true);
      }, 0);
    }
  }, [lv]);

  const handleCharacterClick = () => {
    if (isPunching) return;

    setIsPunching(true);

    // Lvのロジック（2回クリックごとにレベルアップ）
    clickCountRef.current += 1;
    if (clickCountRef.current % 2 === 0) {
      setLv((prevLv) => Math.min(prevLv + 1, 10)); // 上限10
    }

    setTimeout(() => {
      setIsEnlarged(true);
    }, 20);

    setTimeout(() => {
      setIsPunching(false);
      setIsEnlarged(false);
    }, 200);
  };

  return (
    <section className={styles.heroContainer}>
      <Stats currentLv={lv} />
      <MessageBoard />
      {showHiddenMessage && (
        <HiddenMessage
          message={currentHiddenMessage}
          onClose={() => setShowHiddenMessage(false)}
        />
      )}
      {/* 背景スライダー */}
      <div className={styles.backgroundContainer}>
        <Image
          src="/images/background-1.png"
          alt="Background 1"
          fill
          style={{ objectFit: "cover" }}
          className={styles.backgroundSliderImage}
        />
        <Image
          src="/images/background-2.png"
          alt="Background 2"
          fill
          style={{ objectFit: "cover" }}
          className={styles.backgroundSliderImage}
        />
      </div>

      {/* サンドバッグ */}
      <div
        className={`${styles.sandbag} ${isPunching ? styles.sandbagHit : ""}`}
      >
        <Image
          src={
            isPunching ? "/images/sandbag-dented.png" : "/images/sandbag-1.png"
          }
          alt="Sandbag"
          width={650}
          height={650}
        />
      </div>

      {/* キャラクター */}
      <div
        className={`${styles.character} ${isEnlarged ? styles.punching : ""}`}
      >
        <Image
          src={
            isPunching
              ? "/images/character-punch.png"
              : "/images/character-nomal.png"
          }
          alt="Character"
          width={350}
          height={350}
          onClick={handleCharacterClick}
        />
      </div>
    </section>
  );
};

export default HeroSection;
