// App.jsx
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setUsername(name);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000); // 1 секунда загрузки
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div id="loading-screen">
                <div className="loader"></div>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <Router>
            <AppRoutes 
                isLoggedIn={isLoggedIn} 
                username={username} 
                handleLogin={handleLogin} 
            />
        </Router>
    );
}

export default App;
