import React from "react";
import styles from '../assets/Header.module.sass'

const Header = () => {
    return (
        <header className={styles.siteheader}>
            <div className={styles.siteidentity}>
                <h1><a href="#">SkillBrigde</a></h1>
            </div>
            <nav className={styles.sitenavigation}>
                <ul className={styles.nav}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
