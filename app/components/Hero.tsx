'use client'
import React from 'react'
import styles from './Hero.module.css'
import { useState } from 'react'

export type UserProps = {
    name: string
    age: number
    email: string
    skills: string[]
}



function Hero({name, age, email, skills}: UserProps) {
    
    const [count, setCount] = useState(0)
    const handleclick = () => {
    setCount(count + 1)
    }
    
    return (
        <>
    <section className={styles.hero}>
        <div className={styles.container}>
            <h1 className={styles.title}>User Profile</h1>
            <p className={styles.description}>{name}</p>
            <p className={styles.description}>{age}</p>
            <p className={styles.description}>{email}</p>
            <p className={styles.description}>{skills}</p>
        </div>
        <button className={styles.button} onClick={handleclick}>Click me</button>
        <span>You clicked {count} times</span>
    </section>
    </>
  )
}

export default Hero