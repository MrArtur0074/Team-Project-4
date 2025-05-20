import React from "react";
import styles from "./ui/Footer.module.sass";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const phoneNumber = "+996507154588";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      toast.success("Номер телефона скопирован!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.col} ${styles.colMd6}`}>
            <h6>О SkillBridge</h6>
            <p className={styles.textJustify}>
              SkillBridge — это сайт для людей, которым нужна помощь в важных вопросах жизни. Мы рады помочь!
            </p>
          </div>

          <div className={`${styles.col} ${styles.colMd3}`}>
            <h6>Ссылки</h6>
            <ul className={styles.footerLinks}>
              <li>
                <a href="https://alatoo.edu.kg" target="_blank" rel="noopener noreferrer">
                  О нас
                </a>
              </li>
              <li>
                <button onClick={handleCopyPhone} className={styles.linkButton}>
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          <div className={`${styles.col} ${styles.colMd3}`}>
            <h6>Категории</h6>
            <ul className={styles.footerLinks}>
              <li><a href="/category/household">Хозяйство</a></li>
              <li><a href="/category/community">Общество</a></li>
              <li><a href="/category/cooking">Кулинария</a></li>
              <li><a href="/category/jaws">Налоги и Законы</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.col} ${styles.colMd8}`}>
            <p className={styles.copyrightText}>
              © 2025 <a href="/"><span className={styles.logo}>SkillBridge.</span></a>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </footer>
  );
};

export default Footer;