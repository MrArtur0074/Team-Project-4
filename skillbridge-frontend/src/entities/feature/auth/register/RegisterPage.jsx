import React, { useEffect, useState } from "react"; 
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import styles from "./ui/Registration.module.sass";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(""); // локальное сообщение об ошибке
  const [createUserWithEmailAndPassword, user, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  const validateEmail = (email) => {
    // Простая регулярка для проверки email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setFormError("Неверный формат email.");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Пароль должен содержать не менее 6 символов.");
      return;
    }

    setFormError("");
    createUserWithEmailAndPassword(formData.email, formData.password);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Регистрация</h2>

          {/* Показываем ошибки */}
          {formError && <p style={{ color: "red", marginBottom: 8 }}>{formError}</p>}
          {firebaseError && <p style={{ color: "red", marginBottom: 8 }}>{firebaseError.message}</p>}

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
              placeholder="Пароль"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>

          <button onClick={() => navigate("/login")} className={styles.button}>
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;

