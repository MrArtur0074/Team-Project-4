import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import styles from "./ui/Registration.module.sass";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/profile");
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(formData.email, formData.password);
    };

    return (
        <>
        <Header />
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Registration</h2>
                {error && <p className="text-red-500">{error.message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <button onClick={() => navigate("/login")} className={styles.button}>
                    Already have an account? Login
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default RegisterPage;
