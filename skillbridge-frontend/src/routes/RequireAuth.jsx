// src/routes/RequireAuth.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

const RequireAuth = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Загрузка...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

