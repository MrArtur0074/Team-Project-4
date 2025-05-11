import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import styles from "./ui/AdminPage.module.sass";

const AdminPage = () => {
  const navigate = useNavigate();

  const goToPanel = () => {
    navigate("/admin/panel");
  };

  const goToMainSite = () => {
    navigate("/");
  };

  const goToAdminUsers = () => {
    navigate("/admin/panel/adminrole");
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <h2 className={styles.title}>Добро пожаловать в админку</h2>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={goToPanel}>Перейти в панель</button>
          <button className={styles.button} onClick={goToAdminUsers}>Управление администраторами</button>
          <button className={styles.button} onClick={goToMainSite}>Вернуться на сайт</button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

