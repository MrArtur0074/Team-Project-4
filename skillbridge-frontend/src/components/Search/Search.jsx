import React, { useState } from "react";
import styles from "./ui/Search.module.sass";
import CourseSearchBlock from "./CourseSearchBlock";
import CategoryListBlock from "./CategoryListBlock";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [coursesSnap] = useCollection(collection(db, "courses"));
  const [categorySnap] = useCollection(collection(db, "categoryColors"));

  const courses = coursesSnap?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  const categories = categorySnap?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  const categoriesMap = {};
  categories.forEach(cat => {
    categoriesMap[cat.id] = cat;
  });

  const filteredCourses = courses.filter(course => {
    const q = query.toLowerCase().trim();
    return course.title.toLowerCase().includes(q);
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className={styles.searchResults}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => {
                const color = categoriesMap[course.category]?.color || "#999";
                return (
                  <div
                    key={course.id}
                    className={styles.searchResultItem}
                    style={{ color }}
                    onClick={() => {
                      navigate(`/course/${course.id}`);
                      setQuery("");
                    }}
                  >
                    {course.title}
                  </div>
                );
              })
            ) : (
              <div className={styles.searchResultItem}>Ничего не найдено.</div>
            )}
          </div>
        )}
      </div>

      <h2 className={styles.title}>Популярные курсы</h2>
      <CourseSearchBlock categories={categories} />

      <h2 className={styles.title}>Категории</h2>
      <CategoryListBlock categories={categories} />
    </div>
  );
};

export default Search;
