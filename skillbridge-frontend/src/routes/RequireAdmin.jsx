// src/routes/RequireAdmin.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const RequireAdmin = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);
        const isUserAdmin = userDoc.exists() && userDoc.data().role === "admin";
        console.log("User role check:", userDoc.data()); // отладка
        setIsAdmin(isUserAdmin);
      }
    };
    checkAdmin();
  }, [user]);

  if (loading || isAdmin === null) return <p>Проверка доступа...</p>;
  return user && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAdmin;
