import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ui/Search.module.sass";

const CategoryListBlock = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.categories}>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={styles.categoryCard}
          style={{ borderColor: cat.color }}
          onClick={() => navigate(`/category/${cat.id}`)}
        >
          <div
            className={styles.imageSection}
            style={{ backgroundImage: `url(${cat.image})` }}
          />
          <div className={styles.textSection}>
            <h3 style={{ color: cat.color }}>{cat.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryListBlock;
