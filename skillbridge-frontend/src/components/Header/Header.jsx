import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import styles from "./ui/Header.module.sass";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleProfileClick = (e) => {
        e.preventDefault();
        if (user) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };

    return (
        <header className={styles.siteheader}>
            <div className={styles.siteidentity}>
                <h1><a href="/">SkillBridge</a></h1>
            </div>
            <nav className={styles.sitenavigation}>
                <ul className={styles.nav}>
                    <li><a href="/">Главная</a></li>
                    <li>
                        <a href="/#" onClick={handleProfileClick}>
                            {user ? "Профиль" : "Логин"}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;




