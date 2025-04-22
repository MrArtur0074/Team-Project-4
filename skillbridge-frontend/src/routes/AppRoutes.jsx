// routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterPage from "../entities/feature/auth/register/RegisterPage";
import LoginPage from "../entities/feature/auth/login/LoginPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import CoursePage from "../pages/Course/CoursePage";
import LessonPage from "../pages/Course/LessonPage";
import { useSelector } from "react-redux";

const AppRoutes = () => {
    const token = useSelector((state) => state.user.token);

    const PrivateRoute = ({ children }) => {
        return token ? children : <Navigate to="/login" />;
    };

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/course/:courseId/:lessonID" element={<LessonPage />} />
        </Routes>
    );
};

export default AppRoutes;