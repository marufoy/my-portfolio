"use client";

import React from 'react';
import Image from 'next/image';
import styles from './ContactSection.module.css';

const ContactSection: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.title}>お問い合わせ</h2>
      <p className={styles.description}>
        このサイトや私について少しでも興味を持っていただけたら嬉しいです。お仕事の依頼なども大歓迎です。
      </p>
      
      <div className={styles.contactContainer}>
        <div className={styles.contactBox}>
          <h3 className={styles.contactTitle}>
            <Image src="/images/mail-icon.png" alt="Mail" width={24} height={24} className={styles.mailIcon} />
            CONTACT FORM
          </h3>
          
          {/* The form now submits directly to Formspree */}
          <form 
            action="https://formspree.io/f/meolpgaa" 
            method="POST"
            className={styles.contactForm}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={styles.input}
                placeholder="Enter your name..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={styles.input}
                placeholder="Enter your email..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>MESSAGE</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={styles.textarea} // Using a new 'textarea' style
                placeholder="Your message..."
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;