import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const goToPanel = () => {
    navigate("/admin/panel");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Добро пожаловать в админку</h2>
      <button onClick={goToPanel}>Перейти в панель</button>
    </div>
  );
};

export default AdminPage;
