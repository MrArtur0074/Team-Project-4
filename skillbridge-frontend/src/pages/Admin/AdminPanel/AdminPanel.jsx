import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
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

  return (
    <>
      <AdminHeader />
      <div className={styles.panel}>
        <h2>Панель администратора</h2>
        <p>Список всех курсов</p>
        <div className={styles.courseList}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>Категория: {course.category}</p>
              <button onClick={() => navigate(`/admin/panel/course/${course.id}/edit`)}>
                Редактировать
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
