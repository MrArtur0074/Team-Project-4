// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterPage from "../entities/feature/auth/register/RegisterPage";
import LoginPage from "../entities/feature/auth/login/LoginPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import EditProfilePage from "../entities/feature/auth/edit/EditProfilePage";
import CoursePage from "../pages/Course/CoursePage";
import LessonPage from "../pages/Course/LessonPage";
import CategoryPage from "../pages/Category/CategoryPage";


const AppRoutes = ({ isLoggedIn, username, handleLogin }) => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/course/:courseId/:lessonID" element={<LessonPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
    );
};

export default AppRoutes;
