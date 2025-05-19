//LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import styles from "./ui/Login.module.sass";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (user) navigate("/profile");
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(formData.email, formData.password);
    };

    return (
        <>
        <Header />
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Логин</h2>
                {error && <p className="text-red-500">{error.message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.input}
                        autoComplete="username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={styles.input}
                        autoComplete="current-password"
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Вход в систему..." : "Логин"}
                    </button>
                </form>
                <button onClick={() => navigate("/register")} className={styles.button}>
                    Создать аккаунт
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default LoginPage;
