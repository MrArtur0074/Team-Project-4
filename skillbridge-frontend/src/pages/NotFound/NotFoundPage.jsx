import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ui/NotFoundPage.module.sass";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>УПС, вы походу потерялись</h1>
      <p className={styles.link} onClick={goHome}>
        Перейти на главную
      </p>
    </div>
  );
};

export default NotFoundPage;
