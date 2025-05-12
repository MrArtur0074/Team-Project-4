import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ui/CoursePage.module.sass";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { db } from "../../firebase.js";
import { doc, collection } from "firebase/firestore";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseSnap, courseLoading, courseError] = useDocument(doc(db, "courses", courseId));
  const [coursesSnap, coursesLoading] = useCollection(collection(db, "courses"));

  const course = courseSnap?.data();
  const categoryKey = course?.category?.toLowerCase(); // Приведение к нижнему регистру

  const [colorSnap, colorLoading] = useDocument(
    categoryKey ? doc(db, "categoryColors", categoryKey) : null
  );

  if (courseLoading || coursesLoading || colorLoading) return <p>Загрузка...</p>;
  if (courseError || !courseSnap.exists()) return <h1>Курс не найден</h1>;

  const color = colorSnap?.data()?.color || "#362d50";
  const allCourses = coursesSnap?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || [];

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.coursecontainer}>
          <h2 style={{ color }}>{course.title}</h2>
          <img src={course.banner} alt={course.title} className={styles.banner} />
          <h3 style={{ color }}>Уроки</h3>
          <ul>
            {course.lessons?.map((lesson) => (
              <li onClick={() => navigate(lesson.path)} key={lesson.number}>
                {lesson.number}. {lesson.name}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            ← Назад на главную
          </button>
        </div>

        <aside className={styles.sidebar}>
          <h3>Похожие статьи</h3>
          <ul>
            {allCourses
              .filter((item) => item.category === course.category && item.id !== courseId)
              .map((item) => (
                <li key={item.id} onClick={() => navigate(`/course/${item.id}`)} style={{ cursor: "pointer" }}>
                  {item.title}
                </li>
              ))}
          </ul>

          <h3 style={{ marginTop: "20px" }}>Популярные статьи</h3>
          <ul>
            {allCourses
              .filter((item) => item.id !== courseId)
              .map((item) => (
                <li key={item.id} onClick={() => navigate(`/course/${item.id}`)} style={{ cursor: "pointer" }}>
                  {item.title}
                </li>
              ))}
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;