import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AdminPanel from "../pages/Admin/AdminPanel";
import RequireAdmin from "./RequireAdmin";
import CreateCoursePage from "../pages/Admin/AdminPanel/CreateCoursePage";
import EditCoursePage from "../pages/Admin/AdminPanel/EditCoursePage";
import AdminUsersPage from "../pages/Admin/AdminUsers/AdminUsersPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/admin/panel/course/create" element={<CreateCoursePage />} />
        <Route path="/admin/panel/course/:courseId/edit" element={<EditCoursePage />} />
        <Route path="/admin/panel/adminrole" element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
