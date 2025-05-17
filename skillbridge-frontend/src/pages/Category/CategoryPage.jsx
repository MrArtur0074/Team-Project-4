import React from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./ui/CategoryPage.module.sass";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CategoryListBlock from "../../components/Search/CategoryListBlock";

const CategoryPage = () => {
  const { categoryId } = useParams(); 
  const navigate = useNavigate();

  const [coursesSnap] = useCollection(collection(db, "courses"));
  const [categorySnap] = useCollection(collection(db, "categoryColors"));

  const courses = coursesSnap?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  const categories = categorySnap?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  const category = categories.find(c => c.id === categoryId);
  const filteredCourses = courses.filter(course => course.category === categoryId);

  // Другие категории (исключая текущую)
  const otherCategories = categories.filter(c => c.id !== categoryId);

  return (
    <>
      <Header />
      <div className={styles.categorycontainer}>
        <h2 className={styles.categoryTitle}>{category?.name || "Категория"}</h2>

        <button onClick={() => navigate("/")} className={styles.backButton}>
          ← Назад на главную
        </button>

        <div className={styles.courseList}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div
                key={course.id}
                className={styles.courseCard}
                style={{ borderColor: category?.color || "#999" }}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <h3 style={{ color: category?.color || "#999" }}>{course.title}</h3>
              </div>
            ))
          ) : (
            <p>Нет курсов в этой категории.</p>
          )}
        </div>

        <h3 className={styles.otherTitle}>Другие категории</h3>
        <CategoryListBlock categories={otherCategories} />
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;

