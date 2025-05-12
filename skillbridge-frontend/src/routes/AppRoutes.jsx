// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterPage from "../entities/feature/auth/register/RegisterPage";
import LoginPage from "../entities/feature/auth/login/LoginPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import EditProfilePage from "../entities/feature/auth/edit/EditProfilePage";
import CoursePage from "../pages/Course/CoursePage";
import LessonPage from "../pages/Course/LessonPage";
import CategoryPage from "../pages/Category/CategoryPage";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";
import AdminPage from "../pages/Admin/AdminPage/AdminPage";
import AdminPanel from "../pages/Admin/AdminPanel/AdminPanel";
import EditCoursePage from "../pages/Admin/AdminPanel/EditCoursePage";
import AdminUsersPage from "../pages/Admin/AdminUsers/AdminUsersPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import CreateCoursePage from "../pages/Admin/AdminPanel/CreateCoursePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публичные */}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/course/:courseId" element={<CoursePage />} />
      <Route path="/course/:courseId/:lessonID" element={<LessonPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />

      {/* Только авторизованные */}
      <Route element={<RequireAuth />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Route>

      {/* Только админы */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/admin/panel/course/create" element={<CreateCoursePage />} />
        <Route path="/admin/panel/course/:courseId/edit" element={<EditCoursePage />} />
        <Route path="/admin/panel/adminrole" element={<AdminUsersPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
