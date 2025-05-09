import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // ✅ добавлено
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./ui/Profile.module.sass";

const ProfilePage = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate(); 

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.profileWrapper}>
                    {loading && <p>Loading...</p>}
                    {error && <p className={styles.error}>{error.message}</p>}

                    {user && (
                        <div className={styles.userInfo}>
                            {user.photoURL && (
                                <img src={user.photoURL} alt="Avatar" className={styles.avatar} />
                            )}
                            <p><strong>Display Name:</strong> {user.displayName || "Not set"}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>User ID:</strong> {user.uid}</p>
                            <p><strong>Created:</strong> {user.metadata?.creationTime}</p>
                            <p><strong>Last Login:</strong> {user.metadata?.lastSignInTime}</p>
                            <button onClick={() => signOut(auth)} className={styles.logoutBtn}>Logout</button>
                            <button onClick={() => navigate("/edit-profile")} className={styles.editBtn}>Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;

