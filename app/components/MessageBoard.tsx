"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './MessageBoard.module.css';

// TypeAnimationを動的インポートで読み込み
const TypeAnimation = dynamic(() => import('react-type-animation').then(mod => ({ default: mod.TypeAnimation })), {
  ssr: false,
  loading: () => <span>Loading...</span>
});

const MessageBoard = () => {
  const messages = [
    "ここはmaruのポートフォリオです",
    "みなさんに私のことを知ってもらうために作りました",
    "ごゆっくり散策ください"
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleComplete = () => {
    // アニメーション完了後、次のメッセージへ
    setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
  };

  return (
    <div className={styles.messageBoardContainer}>
      <h2 className={styles.title}>MESSAGE</h2>
      <div className={styles.statLine}>
        <TypeAnimation
          key={currentMessageIndex} // メッセージが切り替わるたびにコンポーネントを再マウント
          sequence={[
            messages[currentMessageIndex],
            3000, // メッセージ表示後の待機時間
            handleComplete // 完了時に次のメッセージへ
          ]}
          wrapper="span"
          cursor={true}
          repeat={0} // 繰り返しはしない
        />
      </div>
    </div>
  );
};

export default MessageBoard;
