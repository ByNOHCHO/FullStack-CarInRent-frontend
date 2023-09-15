import React from 'react'
import styles from './Footer.module.css';
import inst from './instagram.svg'
import email from './email.svg'
import tg from './telegram.svg'

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.info}>
          <div className={styles.aboutWe}>
            <h4 className={styles.h4}>О НАС </h4>
            <p className={styles.text}> Наш сайт создан от автолюбителей для автолюбителей и совмещает в себе все самые лучшие возможности для выбора конкретной модели автомобиля. А также вы можете выбрать конкретную модель и арендовать ее. Все для ВАС!</p>
          </div>

          <div className={styles.contacts}>
            <h4 className={styles.h4}>КОНТАКТЫ </h4>
            <p ><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src={inst} className={styles.icon} />Instagramm</a></p>
            <p><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src={email} className={styles.icon} />E-mail</a></p>
            <p><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src={tg} className={styles.icon} />Telegram</a></p>
          </div>
        </div>
        <div className={styles.company}>
          <p>© АО «CarInRent Автомобильная группа» 2023 г.</p>
        </div>
      </div>
    </>
  )
}


export default Footer;