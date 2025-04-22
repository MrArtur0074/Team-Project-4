//LoginPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../redux/userSlice";
import Header from "../../../../components/Header/Header";
import Fotter from "../../../../components/Footer/Footer";
import styles from "./ui/Login.module.sass";
import { useState } from "react";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, token } = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            navigate("/profile");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>Login</h2>
                    {error && <p className="animate-pulse text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                        <button type="submit" disabled={loading} className={styles.button}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <button onClick={() => navigate("/register")} className={styles.button}>
                        I don't register
                    </button>
                </div>
            </div>
            <Fotter />
        </>
    );
};

export default LoginPage;