import React, { useState } from "react";
import styles from "../assets/Search.module.sass";

const categories = [
  {
    name: "Хозяйство",
    color: "#d42824",
    image: "/images/household.png",
  },
  {
    name: "Общество",
    color: "#f4c542",
    image: "/images/community.png",
  },
  {
    name: "Кулинария",
    color: "#28a745",
    image: "/images/cooking.png",
  },
  {
    name: "Налоги и Законы",
    color: "#007bff",
    image: "/images/law.png",
  },
];

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Поиск..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>

      <div className={styles.categories}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={styles.categoryCard}
            style={{ borderColor: category.color }}
          >
            <div
              className={styles.imageSection}
              style={{ backgroundImage: `url(${category.image})` }}
            ></div>
            <div className={styles.textSection}>
              <h3 style={{ color: category.color }}>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

