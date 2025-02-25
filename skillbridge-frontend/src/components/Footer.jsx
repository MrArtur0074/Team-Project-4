import React from "react";
import styles from "../assets/Footer.module.sass";

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.col} ${styles.colMd6}`}>
            <h6>About</h6>
            <p className={styles.textJustify}>
              SkillBridge - это сайт для людей которым нуждается помощь по разным важным вопросам жизни и мы рады вам помочь.
            </p>
          </div>
          <div className={`${styles.col} ${styles.colMd3}`}>
            <h6>Categories</h6>
            <ul className={styles.footerLinks}>
              <li><a href="#">Хозяйственно</a></li>
              <li><a href="#">Общественное</a></li>
              <li><a href="#">Кулинария</a></li>
              <li><a href="#">Налоги и Законы</a></li>
            </ul>
          </div>
          <div className={`${styles.col} ${styles.colMd3}`}>
            <h6>Quick Links</h6>
            <ul className={styles.footerLinks}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr className={styles.small} />
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.col} ${styles.colMd8}`}>
            <p className={styles.copyrightText}>
              Copyright © 2025 All Rights Reserved by{" "}
              <a href="#">
                <span className={styles.logo}>SkillBridge.</span>
              </a>
            </p>
          </div>
          <div className={`${styles.col} ${styles.colMd4}`}>
            <ul className={styles.socialIcons}>
              <li>
                <a className={styles.facebook} href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a className={styles.twitter} href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a className={styles.dribbble} href="#">
                  <i className="fab fa-dribbble" />
                </a>
              </li>
              <li>
                <a className={styles.linkedin} href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

