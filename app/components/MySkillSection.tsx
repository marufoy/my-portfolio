"use client";

import React from 'react';
import styles from './MySkillSection.module.css';
import Image from 'next/image';

const MySkillSection: React.FC = () => {
  const skills = [
    {
      name: "HTML",
      image: "/images/html-dot.png", 
      proficiency: 5,
      category: "フロントエンド"
    },
    {
      name: "CSS",
      image: "/images/css-logo-dot.png", 
      proficiency: 5,
      category: "フロントエンド"
    },
    {
      name: "PHP",
      image: "/images/php-dot.png",
      proficiency: 2, // 5段階評価（1-5）
      category: "バックエンド"
    },
    {
      name: "Java",
      image: "/images/java-dot.png", 
      proficiency: 3,
      category: "バックエンド"
    },
    {
      name: "JavaScript",
      image: "/images/js-logo-dot.png", 
      proficiency: 5,
      category: "フロントエンド"
    },
    {
      name: "Python",
      image: "/images/python-dot.png", 
      proficiency: 4,
      category: "バックエンド"
    },
    {
      name: "TypeScript",
      image: "/images/TS-dot.png", 
      proficiency: 3,
      category: "フロントエンド"
    },
    {
      name: "React",
      image: "/images/react-dot.png", 
      proficiency: 3,
      category: "フロントエンド"
    },
    {
      name: "WordPress",
      image: "/images/wp-dot.png", 
      proficiency: 4,
      category: "フロントエンド"
    },
    {
      name: "Git",
      image: "/images/git-dot.png", 
      proficiency: 4,
      category: "ツール"
    }
  ];

  const renderStars = (proficiency: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < proficiency ? styles.filled : styles.empty}`}
      >
        ★
      </span>
    ));
  };

  const getProficiencyText = (proficiency: number) => {
    switch (proficiency) {
      case 1:
        return "初心者";
      case 2:
        return "初級";
      case 3:
        return "中級";
      case 4:
        return "上級";
      case 5:
        return "専門家";
      default:
        return "";
    }
  };

  return (
    <section className={styles.mySkillSection}>
      <h2 className={styles.title}>MY SKILLS</h2>
      
      <div className={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillCard}>
            <span className={styles.category}>{skill.category}</span>
            <div className={styles.cardContent}>
              <div className={styles.imageContainer}>
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={60}
                  height={60}
                  className={styles.skillIcon}
                />
              </div>
              <div className={styles.skillInfo}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <div className={styles.starsContainer}>
                  {renderStars(skill.proficiency)}
                </div>
                <span className={styles.proficiencyText}>
                  {getProficiencyText(skill.proficiency)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySkillSection;
