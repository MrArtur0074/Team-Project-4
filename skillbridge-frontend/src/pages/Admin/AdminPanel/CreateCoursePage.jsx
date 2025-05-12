import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import styles from "./ui/CreateCoursePage.module.sass";

const CreateCoursePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [path, setPath] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

   const isValidPath = (value) => /^[a-z0-9-]+$/.test(value); // только маленькие буквы, цифры, тире

  const handleCreate = async () => {
    if (!title || !category || !path) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    if (!isValidPath(path)) {
      alert("Путь должен содержать только маленькие латинские буквы, цифры и тире.");
      return;
    }

    setSaving(true);
    try {
      const newCourse = {
        title,
        category,
        path, 
        banner: "",
        lessons: [],
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "courses"), newCourse);
      alert("Курс создан!");
      navigate(`/admin/panel/course/${docRef.id}/edit`);
    } catch (error) {
      alert("Ошибка при создании курса: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        
        <h2>Создание нового курса</h2>

        <label>Название курса</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название курса"
        />

        <label>Путь (slug)</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value.toLowerCase())}
          placeholder="Например: basic-cooking"
        />
        {!isValidPath(path) && path && (
          <p style={{ color: "red" }}>
            Путь должен содержать только латинские буквы, цифры и тире.
          </p>
        )}

        <label>Категория</label>
        <div className={styles.categoryButtons}>
          {["cooking", "community", "household", "jaws"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.categoryButton} ${category === cat ? styles.active : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => navigate("/admin/panel")} className={styles.backButton}>
          ← Назад
        </button>
        <button className={styles.saveButton} onClick={handleCreate} disabled={saving}>
          {saving ? "Сохраняем..." : "Создать курс"}
        </button>
      </div>
    </>
  );
};

export default CreateCoursePage;
