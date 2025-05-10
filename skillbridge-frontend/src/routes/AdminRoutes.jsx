import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AdminPanel from "../pages/Admin/AdminPanel";
import RequireAdmin from "./RequireAdmin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
