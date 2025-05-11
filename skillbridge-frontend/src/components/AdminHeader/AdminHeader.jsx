import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import styles from "./ui/AdminHeader.module.sass";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
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
            <nav className={styles.sitenavigation}>
                <ul className={styles.nav}>
                    <li><a href="/admin" >Главная</a></li>
                    <li><a href="/admin/panel">Админ панель</a></li>
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

export default AdminHeader;
