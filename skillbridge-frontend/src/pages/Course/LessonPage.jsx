// LessonPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ui/CoursePage.module.sass";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { doc } from "firebase/firestore";
import { db } from "../../firebase.js"; 
import { useDocument } from "react-firebase-hooks/firestore";

const LessonPage = () => {
  const { courseId, lessonID } = useParams();
  const navigate = useNavigate();

  const [courseSnap, loading, error] = useDocument(doc(db, "courses", courseId));

  if (loading) return <p className={styles.coursecontainer}>Загрузка...</p>;
  if (error || !courseSnap.exists()) return <h1 className={styles.coursecontainer}>Курс не найден</h1>;

  const course = courseSnap.data();
  const lessons = course.lessons || [];

  const currentIndex = lessons.findIndex((l) => l.path.endsWith(lessonID));
  if (currentIndex === -1) return <h1 className={styles.coursecontainer}>Урок не найден</h1>;

  const lesson = lessons[currentIndex];
  const prevLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];

  return (
    <>
      <Header />
      <div className={styles.coursecontainer}>
        <h1>{lesson.name}</h1>
        {lesson.image && <img src={lesson.image} alt={lesson.name} className={styles.banner} />}
        <p className={styles.lessonText}>{lesson.text}</p>

        <div className={styles.navigationButton}>
          <button
            onClick={() => prevLesson && navigate(prevLesson.path)}
            className={styles.backButton}
            disabled={!prevLesson}
            style={!prevLesson ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            ← Предыдущий
          </button>

          <button
            onClick={() => nextLesson && navigate(nextLesson.path)}
            className={styles.backButton}
            disabled={!nextLesson}
            style={!nextLesson ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            Следующий →
          </button>

          <button onClick={() => navigate(`/course/${courseId}`)} className={styles.backButton}>
            Назад на курс
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LessonPage;

