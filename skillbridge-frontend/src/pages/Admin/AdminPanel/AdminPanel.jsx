import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./ui/AdminPanel.module.sass"; 
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

const AdminPanel = () => {
  const [coursesSnap, loading, error] = useCollection(collection(db, "courses"));
  const navigate = useNavigate();

  if (loading) return <p style={{ textAlign: "center" }}>Загрузка курсов...</p>;
  if (error) return <p style={{ textAlign: "center" }}>Ошибка загрузки: {error.message}</p>;

  const courses = coursesSnap?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || [];

  const handleDelete = async (id) => {
  const confirm = window.confirm("Вы уверены, что хотите удалить этот курс?");
  if (!confirm) return;
    try {
      await deleteDoc(doc(db, "courses", id));
      alert("Курс удалён.");
    } catch (err) {
      alert("Ошибка при удалении курса: " + err.message);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.panel}>
        <h2>Панель администратора</h2>
        <button onClick={() => navigate("/admin")} className={styles.backButton}>
         ← Назад
        </button>
        <button className={styles.addButton} onClick={() => navigate(`/admin/panel/course/create`)}>
          ➕ Добавить новый курс
        </button>
        <p className={styles.courseListTitle}>Список всех курсов</p>
        <div className={styles.courseList}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>Категория: {course.category}</p>
              <button onClick={() => navigate(`/admin/panel/course/${course.id}/edit`)}>
                Редактировать
              </button>
              <button style={{ backgroundColor: "#d42824", marginLeft: "10px" }} onClick={() => handleDelete(course.id)} >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
