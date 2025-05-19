import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./ui/Profile.module.sass";
import defaultAvatar from "./ui/default-avatar.jpg";

const ProfilePage = () => {
    const [user, loading, error] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [roleLoading, setRoleLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setIsAdmin(data.role === "admin");
                }
                setRoleLoading(false);
            }
        };
        checkAdmin();
    }, [user]);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.profileWrapper}>
                    {loading || roleLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className={styles.error}>{error.message}</p>
                    ) : user && (
                        <div className={styles.userInfo}>
                            {user.photoURL && (
                                <img
                                    src={user.photoURL || defaultAvatar}
                                    alt="Avatar"
                                    className={styles.avatar}
                                />
                            )}
                            <p><strong>Имя профиля:</strong> {user.displayName || "Not set"}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Дата создания:</strong> {user.metadata?.creationTime}</p>
                            <p><strong>Последний вход в систему:</strong> {user.metadata?.lastSignInTime}</p>

                            <div className={styles.buttonGrid}>
                                <button onClick={() => signOut(auth)} className={styles.logoutBtn}>Выйти</button>
                                <button onClick={() => navigate("/edit-profile")} className={styles.editBtn}>Редактировать</button>
                                {isAdmin && (
                                    <>
                                    <button onClick={() => navigate("/admin")} className={styles.adminBtn}>Админ меню</button>
                                    <button onClick={() => navigate("/admin/panel")} className={styles.adminBtn}>Админ панель</button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;